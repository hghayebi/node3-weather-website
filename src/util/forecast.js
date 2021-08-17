const request = require("request");
// const chalk = require("chalk");

const forecast = function (lat, long, callback) {
  const url = `http://api.weatherstack.com/current?access_key=b264767ae14598bb9fa66ce63f3f3779&query=${lat},${long}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to weather service!`);
    } else if (response.body.error) {
      callback(`Unable to find location`);
    } else {
      const data = response.body;

      const { name, country, region } = data.location;
      const { temperature, feelslike, weather_descriptions, observation_time } =
        data.current;
      console.log(
        name,
        country,
        region,
        `\nobservation time: ` + observation_time
      );
      callback(
        undefined,
        // {
        //   country,
        //   region,
        //   name,
        //   observation_time,
        //   temperature,
        //   feelslike,
        //   weather_descriptions,
        // }
        `${country + ", " + region + ", " + name}
        
        ${
          weather_descriptions[0]
        }. It's currently ${temperature} degree's out. It is feels like ${feelslike}.`
      );
    }
  });
};

module.exports = forecast;
