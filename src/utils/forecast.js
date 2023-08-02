const request = require("request");

const forcast = (city, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f3fed7aba7ff1455937f3e6628f0c6d5&query='+city;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect to Weather Services', undefined);
    } else if (response.body.error) {
      callback('Unable to find the Location', undefined);
    } else {
      callback(
        undefined,
        `Weather Situation is ${response.body.current.weather_descriptions}. It is Currently ${response.body.current.temperature} degrees out. There is a humidity of ${response.body.current.humidity}.`
      );
    }
  });
};

module.exports = forcast;
