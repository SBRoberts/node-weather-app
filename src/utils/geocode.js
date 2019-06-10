const request = require("request");
const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoic2Jyb2JlcnRzIiwiYSI6ImNqd21iZWhyZTAyMnA0OXBoNXFlZmEwZXIifQ.6TLsTktciay8cm-Dhd91jQ&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(err);
    } else if (body.message) {
      callback(`Error from location services: ${body.message}`);
    } else if (!body.features.length) {
      callback("No location found");
    } else {
      const [features] = body.features;
      const { center, place_name: location } = features;
      const long = center[0];
      const lat = center[1];
      // console.log(`Longitude: ${long} – Latitude: ${lat}`);
      const data = {
        long,
        lat,
        location
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
