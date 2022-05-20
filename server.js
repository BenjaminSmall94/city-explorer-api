'use strict';

//Require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');
// let data = require('./data/weather.json');

// USE
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for does not exist');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

// ERRORS - Copied from starter code
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
