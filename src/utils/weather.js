const request = require("request");

const weather = (city, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=01ade58e53ba48d59c3114645221901&q=${city}&aqi=no`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        location: `${body.location.name},${body.location.region},${body.location.country}`,
        forecast: `It is currently ${body.current.temp_c} degrees out. There is a ${body.current.humidity} % humidity.`,
      });
    }
  });
};

module.exports = weather;
