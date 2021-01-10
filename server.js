'use strict';

// https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/
// run nodemon locally  npx nodemon

//Load Environment Variables from .env file
require('dotenv').config();

//application dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//application set up
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const locations = {};

// Routes
app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);
app.use('*', errorHandler);

// Function Handlers
function homeHandler (request, response){
  response.status(200).send('Nosce te ipsum');
}

function errorHandler(request, response){
  response.status(500).send('Sorry, Something is rotten in the state of Denmark');
}

function locationHandler(request, response){
  const city = request.query.city;
  const key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
  const queryParams = {
    key: process.env.GEOCODE_API_KEY,
    q: city,
    format: 'json',
  };
  console.log(url);

  //if data for city exists, do not get again api

  if (locations[city]) {
    response.send(locations[city]);
  }
  else {

    const queryParams = {
      key: process.env.GEOCODE_API_KEY,
      q: city,
      format: 'json',
    };
  }
  superagent.get(url)
    .query(queryParams)
    .then( data => {
      const locationData  = data.body[0]; //first one ..
      const cityData = new Location(city, locationData);
      locations[city] = cityData; //save for next time
      console.log(cityData);
      response.status(200).send(cityData);
    })
    .catch(() => {
      console.log('ERROR');
      response.status(500).send(`Something's not quite right.`);
    });

}

function weatherHandler (request, response){

  const key = process.env.WEATHER_API_KEY;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.latitude}&lon=${request.query.longitude}&key=${key}&lang=en&units=I&days=8`;

  let weatherData;

  superagent.get(weatherUrl)
    .then( data => {
      // data.weather.description;
      weatherData = data.body.data.map(dailyForecast => {
        return new Weather (dailyForecast);
      });
      console.log(weatherData);
      response.status(200).send(weatherData);

    });

}

function movieHandler (request, response){
  const key = process.env.MOVIE_API_KEY;
  const moviePosterUrl = 'https://image.tmdb.org/t/p/w500';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;
  const queryParams = {
    language: 'en-US',
    query: request.query.search_query,
    page: 1,
    include_adult: false
  };

  superagent.get(url)
    .query(queryParams)
    .then(data => {
      let movies = data.body.results.map(movie => new Movie(movie, moviePosterUrl));
      response.status(200).send(movies);
      console.log(movies);
    })
    .catch(error => errorHandler(request, response, error));
}

function yelpHandler (request, response){
  const url = 'https://api.yelp.com/v3/businesses/search';
  const queryParams = {
    term: 'restaurants',
    latitude: request.query.latitude,
    longitude: request.query.longitude,
  };

  superagent.get(url)
    .auth(process.env.YELP_API_KEY, { type: 'bearer' })
    .query(queryParams)
    .then(data => {
      let restaurants = data.body.businesses.map(yelpInfo => new Restaurant(yelpInfo));
      response.status(200).send(restaurants);
    })
    .catch(error => errorHandler(request, response, error));
}


//Constructors
function Location(city, locationInfo){
  this.search_query = city;
  this.formatted_query = locationInfo.display_name;
  this.latitude = locationInfo.lat;
  this.longitude = locationInfo.lon;
}

function Weather (data) {
  this.forecast = data.weather.description;
  let date = Date.parse(data.datetime);
  this.time = new Date(date).toDateString();
}

function Movie(movie,moviePosterUrl) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = (movie.poster_path) ? `${moviePosterUrl}${movie.poster_path}` : undefined;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

function Restaurant(yelpInfo) {
  this.name = yelpInfo.name;
  this.image_url = yelpInfo.image_url;
  this.price = yelpInfo.price;
  this.rating = yelpInfo.rating;
  this.url = yelpInfo.url;
}

//start our server
app.listen(PORT, () => {
  console.log(`Now listening on port, ${PORT}`);
});

