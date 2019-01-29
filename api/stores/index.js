import filterStores from '../../src/utils/filterStores';

const { parse } = require('url');
const fetch = require('node-fetch');
const fs = require('fs');

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { ean } = query;

  const date = Date.now();
  const cacheFile = `/tmp/${ean}.json`;
  let result;

  if (fs.existsSync(cacheFile)) {
    result = require(cacheFile);
    process.stdout.write(`Using cached response for EAN ${ean}\n`);
  }

  if (typeof result === 'undefined') {
    process.stdout.write(`Getting fresh data for EAN ${ean}\n`);

    // Get shop list for this EAN
    const res = await fetch(
      `https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`
    );
    const json = await res.json();
    const stores = filterStores(json.shop);

    result = { ean, date, stores };

    fs.writeFile(cacheFile, JSON.stringify(result), error => {
      if (error) throw error;
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
};
