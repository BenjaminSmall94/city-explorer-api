'use strict';

//Require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
let data = require('./data/weather.json');

// USE
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('/weather', (request, response, next) => {
  try {
    let requestedCity = request.query.cityName;
    let cityWeatherData = data.find(city => city.city_name.toLowerCase() === requestedCity.toLowerCase());
    if(cityWeatherData === undefined) {
      response.send('No Weather');
    } else {
      let responseToSend = [];
      cityWeatherData.data.map(dailyWeather => {
        let description = `Low of ${dailyWeather.low_temp}, high of ${dailyWeather.high_temp} with ${dailyWeather.description}`;
        responseToSend.push(new Forecast(description, dailyWeather.datetime));
      });
      response.send(responseToSend);
    }
  } catch (error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for does not exist');
});

// ERRORS - Copied from starter code
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

// Classes
class Forecast {
  constructor(description, dateTime) {
    this.description = description;
    this.date = dateTime;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
