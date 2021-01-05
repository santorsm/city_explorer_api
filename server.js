'use strict';

// https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/

//bring in modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//set up our application
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Routes
app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', errorHandler);

// Function Handlers
function homeHandler (request, response){
  response.status(200).send('Nosce te ipsum');
}

function errorHandler(request, response){
  response.status(500).send('Sorry, Something is rotten in the state of Denmark');
}

function locationHandler(request, response){
  // const locationInfo = require('./data/location.json');
  const city = request.query.city;
  const key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  console.log(url);

  superagent.get(url)
    .then( data => {
      const locationData  = data.body[0];
      const cityData = new Location(city, locationData);
      console.log(cityData);
      response.status(200).send(cityData);
    });

}

function weatherHandler (request, response){
  // const weatherData = require('./data/weather.json');
  // let lat = request.query.data.latitude;
  // let long = request.query.data.longitude;

  const key = process.env.WEATHER_API_KEY;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.latitude}&lon=${request.query.longitude}&key=${key}&lang=en&units=I&days=8`;

  // const weatherArray = [];

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

//start our server
app.listen(PORT, () => {
  console.log(`Now listening on port, ${PORT}`);
});
