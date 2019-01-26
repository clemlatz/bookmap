import React from "react";
import GoogleMapReact from "google-map-react";

import Pin from "./Pin";
import Store from "./Store";
import Header from "./Header";
import UserPin from "./UserPin";

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 48.86543604815719,
      lng: 2.3405013838030584
    },
    zoom: 13
  };

  state = {
    stores: [],
    selectedStoreIndex: null,
    userPosition: null
  };

  async getStores(ean) {
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();
    this.setState({ stores });
  }

  onGeolocate(coords) {
    const userPosition = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    console.log(userPosition);
    this.setState({ userPosition });
  }

  onStoreSelect(selectedStoreIndex) {
    this.setState({ selectedStoreIndex });
  }

  render() {
    const { stores, selectedStoreIndex, userPosition } = this.state;
    let markers = null;

    if (stores) {
      markers = stores.map(({ id, longitude, latitude, ...store }, index) => {
        return (
          <Pin
            key={id}
            lat={latitude}
            lng={longitude}
            selected={index === selectedStoreIndex}
            onClick={() => this.onStoreSelect(index)}
          />
        );
      });
    }

    let selectedStore = null;
    if (selectedStoreIndex) {
      let store = stores[selectedStoreIndex];
      selectedStore = <Store {...store} />;
    }

    return (
      <React.Fragment>
        <Header
          onSearch={ean => this.getStores(ean)}
          onGeolocate={coords => this.onGeolocate(coords)}
        />
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0"
            }}
            options={() => ({ fullscreenControl: false })}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {markers}
            {userPosition && (
              <UserPin lat={userPosition.lat} lng={userPosition.lng} />
            )}
          </GoogleMapReact>
          {selectedStore}
        </div>
      </React.Fragment>
    );
  }
}
