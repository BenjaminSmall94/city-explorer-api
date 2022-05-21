'use strict';

const axios = require('axios');

let cache = require('./cache.js');

let getMovies = async function(request, response, next) {
  const key = request.query.title;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${key}`;
  console.log(key, 'thinking');
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log(key, 'movie hit');
  } else {
    try {
      console.log(key, 'movie miss');
      let movieData =  await axios.get(url);
      movieData = movieData.data.results;
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movieData.map(movie => {
        return new Movie(movie.title, movie.overview);
      });
    } catch (error) {
      console.log('there is an error in ', key);
      next(error);
    }
  }
  console.log(cache[key].data[0]);
  response.status(200).send(cache[key].data);
};

class Movie {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

module.exports = getMovies;
