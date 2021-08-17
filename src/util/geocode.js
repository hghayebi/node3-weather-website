const request = require("request");
// const chalk = require("chalk");

const geocode = function (address, callback) {
  if (address === undefined) return;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaG9zc2VpbjI0NjAxIiwiYSI6ImNrcGxlcWZiMzB2N3QydXFyaW4wOHpnNTIifQ.nKRvTgYrAyGZHFGWlIwfPQ&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to geocoding service!`);
    } else if (response.body.message) {
      callback(response.body.message);
    } else if (response.body?.features.length === 0) {
      callback(`Unable to find location!`);
    } else {
      const [long, lat] = response.body.features[0].center;
      const place_name = response.body.features[0].place_name;
      callback(undefined, { lat, long, place_name });
    }
  });
};

module.exports = geocode;
