'use strict';

//bring in modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//set up our application
const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/location', locationHandler);


// Function Handlers
function locationHandler(request, response){
  const geoData = require('./data/location.json');
  const city = request.query.city;
  const locationData = new Location(city, geoData);

  // response.send(geoData);

  response.send(locationData);
}

//Constructor
function Location(city, formatted, lat, lon){
  this.search_query = city;
  this.formatted_query = formatted;
  this.latitude = lat;
  this.longitude = lon;
}

//start our server
app.listen(PORT, () => {
  console.log(`Now listening on port, ${PORT}`);
});


// app.use('*',(request, response) => {
//   response.send('404. Sorry!');
// });