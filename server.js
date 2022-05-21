'use strict';

//Require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

//Use
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from my server');
});

app.get('/weather', weatherHandler);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(400).send('Page does not exist');
});

function weatherHandler(request, response) {
  const {lat, lon} = request.query;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
