const request = require("request");

forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/88af1c6e1d82ed6ad009dd144b39dafc/${long},${lat}?units=si`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(`${err} – Unable to connect to weather service`);
    } else if (body.error) {
      callback(body.error);
    } else {
      const { currently, daily } = body;
      const { temperature, precipProbability } = currently;
      const data = {
        temperature,
        precipProbability,
        summary: daily.data[0].summary
      };
      callback(undefined, data);
    }
  });
};
module.exports = forecast;
