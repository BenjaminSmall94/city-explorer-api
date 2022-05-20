'use strict';

const axios = require('axios');
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily';

let getWeather = async function(request, response, next) {
  try {
    // let requestedCity = request.query.cityName;
    // let cityWeatherData = data.find(city => city.city_name.toLowerCase() === requestedCity.toLowerCase());
    let cityWeatherData = await axios.get(`${weatherURL}?key=${process.env.WEATHER_API_KEY}&lat=${request.query.latitude}&lon=${request.query.longitude}`);
    cityWeatherData = cityWeatherData.data;
    let responseToSend = [];
    cityWeatherData.data.map(dailyWeather => {
      let description = `Low of ${dailyWeather.low_temp}, high of ${dailyWeather.high_temp} with ${dailyWeather.weather.description}`;
      responseToSend.push(new Forecast(description, dailyWeather.datetime));
    });
    response.send(responseToSend);
  } catch (error) {
    next(error);
  }
};

class Forecast {
  constructor(description, dateTime) {
    this.description = description;
    this.date = dateTime;
  }
}

module.exports = getWeather;
