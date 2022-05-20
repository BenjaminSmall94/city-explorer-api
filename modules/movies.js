'use strict';

const axios = require('axios');

let getMovies = async function(request, response, next) {
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
};

class Movie {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

module.exports = getMovies;
