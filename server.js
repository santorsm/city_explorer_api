'use strict';

// https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/

//bring in modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

//set up our application
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());


client.on('error', err => {
  throw err;
});

// app.get('/',(request, response) => {
//   response.status(200).send('Hello World');
// });

app.get('/add', (request, response) => {
  let city = request.query.city;
  let lat = request.query.latitude;
  let lon = request.query.longitude;
  let display = request.formatted_query;

  let SQL = 'INSERT INTO location (city, lat, lon, display) VALUES ($1, $2, $3, $4) RETURNING *';

  let safeValues = [city, lat, lon, display];

  console.log(safeValues);

  client.query(SQL, safeValues)
    .then( results => {
      response.status(200).json(results);
    })
    .catch(error => {
      console.log(error);
    });

});


// // Routes
app.get('/', homeHandler);
app.get('/location', locationHandler);
// app.get('/weather', weatherHandler);
app.use('*', errorHandler);

// // Function Handlers
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

// function weatherHandler (request, response){
//   // const weatherData = require('./data/weather.json');
//   // let lat = request.query.data.latitude;
//   // let long = request.query.data.longitude;

//   const key = process.env.WEATHER_API_KEY;
//   const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.latitude}&lon=${request.query.longitude}&key=${key}&lang=en&units=I&days=8`;

//   // const weatherArray = [];

//   let weatherData;

//   superagent.get(weatherUrl)
//     .then( data => {
//       // data.weather.description;
//       weatherData = data.body.data.map(dailyForecast => {
//         return new Weather (dailyForecast);
//       });
//       console.log(weatherData);
//       response.status(200).send(weatherData);

//     });

// }



//Constructors
function Location(city, locationData){
  this.search_query = city;
  this.formatted_query = locationData.display_name;
  this.latitude = locationData.lat;
  this.longitude = locationData.lon;
}

// function Weather (data) {
//   this.forecast = data.weather.description;
//   let date = Date.parse(data.datetime);
//   this.time = new Date(date).toDateString();
// }

// //start our server
// app.listen(PORT, () => {
//   console.log(`Now listening on port, ${PORT}`);
// });

//start database
client.connect()
  .then( () =>{
    app.listen(PORT, () => {
      console.log(`Now listening on port, ${PORT}`);
      console.log(`Connected to database, ${client.connectionParameters.database}`);
    });
  });
