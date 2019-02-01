import PDLParser from "./PDLParser";

describe("PDLParser", () => {
  describe("filterStores", () => {
    it("filter stores to remove invalid ones", () => {
      const stores = [
        {
          name: "valid store",
          stockAvailablility: true,
          latitude: "1",
          longitude: "2"
        },
        {
          name: "store without availability",
          stockAvailablility: false,
          latitude: "4.5",
          longitude: "5.4"
        },
        {
          name: "store with invalid longitude",
          stockAvailablility: true,
          latitude: "1.23",
          longitude: "01 45 73 48 29"
        }
      ];
      expect(PDLParser.filterStores(stores)).toMatchInlineSnapshot(`
Array [
  Object {
    "latitude": "1",
    "longitude": "2",
    "name": "valid store",
    "stockAvailablility": true,
  },
]
`);
    });
  });

  describe("isStoreValid", () => {
    it("returns true for a valid store", () => {
      const store = {
        id: "2671",
        name: "Montbarbon",
        address: "14 Place Carriat",
        postalCode: "01000",
        city: "Bourg en bresse",
        phone: "0474234568",
        logo: "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
        longitude: "5.227266",
        latitude: "46.207446",
        stockAvailablility: true,
        precommande: false,
        vacances: false
      };
      expect(PDLParser.isStoreValid(store)).toBe(true);
    });

    it("returns false for a store with invalid longitude", () => {
      const store = {
        longitude: "01 45 69 59 59"
      };
      expect(PDLParser.isStoreValid(store)).toBe(false);
    });
  });

  describe("parseStore", () => {
    it("parse a store", () => {
      const store = {
        id: "2671",
        name: "Montbarbon",
        address: "14 Place Carriat",
        postalCode: "01000",
        city: "Bourg en bresse",
        phone: "0474234568",
        logo: "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
        longitude: "5.227266",
        latitude: "46.207446",
        stockAvailablility: true,
        precommande: false,
        vacances: false
      };
      expect(PDLParser.parseStore(store)).toMatchInlineSnapshot(`
Object {
  "address": "14 Place Carriat",
  "city": "Bourg en bresse",
  "id": "2671",
  "latitude": 46.207446,
  "logo": "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
  "longitude": 5.227266,
  "name": "Montbarbon",
  "phone": "0474234568",
  "postalCode": "01000",
}
`);
    });
  });
});
