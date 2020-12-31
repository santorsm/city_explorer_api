'use strict';

// https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/

//bring in modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//set up our application
const app = express();
app.use(cors());

const PORT = process.env.PORT;

// Routes
app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', errorHandler);

// Function Handlers
function homeHandler (request, response){
  response.send('Nosce te ipsum');
}

function errorHandler(request, response){
  response.status(500).send('Sorry, Something is rotten in the state of Denmark');
}

function locationHandler(request, response){
  const locationInfo = require('./data/location.json');
  const city = request.query.city;
  const cityData = new Location(city, locationInfo);

  response.send(cityData);
}

function weatherHandler (request, response){
  const weatherData = require('./data/weather.json');
  const weatherArray = [];

  // code refactored to replace forEach with .map

  weatherData.data.map(dailyForecast => {
    weatherArray.push(new Weather (dailyForecast));
  });
  console.log(weatherArray);
  response.send(weatherArray);
}

//Constructors
function Location(city, locationInfo){
  this.search_query = city;
  this.formatted_query = locationInfo[0].display_name;
  this.latitude = locationInfo[0].lat;
  this.longitude = locationInfo[0].lon;
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
