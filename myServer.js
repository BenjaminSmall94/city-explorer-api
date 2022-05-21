'use strict';

//Require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./myModules/weather');
const getMovies = require('./myModules/movies');

// USE
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(400).send('The thing you are looking for does not exist');
});

// ERRORS - Copied from starter code
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
