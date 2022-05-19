'use strict';


//Require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { application } = require('express');
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
// let data = require('./data/weather.json');

// USE
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('/weather', async (request, response, next) => {
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
});

app.get('/movies', async (request, response, next) => {
  try {
    let movieData =  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.title}`);
    movieData = movieData.data.results;
    let myResponse = movieData.map(movie => {
      return new Movie(movie.title, movie.overview);
    });
    response.send(myResponse);
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

class Movie {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
