# city_explorer_api

**Author**: Matthew Santorsola
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

This project requires building a stand-alone back end which will interact with a static front end.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

// Creating a server

- server.js .eslintrc.json .gitignore
- data files
- install the packages `npm install <PACKAGENAME>`
in the js file - load the packages/dependencies
tell the server to listen on the port
start writing routes to handle requests from the client

## Architecture

Node.js
dependencies used:
    `cors`: 2.8.5
    `dotenv`: 8.2.0
    `express`: 4.17.1
    `nodemon`: 2.0.6
    `superagent`: 6.1.0

## Change Log

### Lab-06

__Feature 01 - Repository__:
created data directory - containing `location.json` and `weather.json`
`.env`, `.gitignore`, `README.md`, `.gitignore`, `.eslintrc.json`, `package.json`
Dependencies: `express`, `dotenv`, and `cors`  
Deployed basic express server to Heroku

__Feature 02 - Locations__: User to enter the name of a location then can see data about the area of interest to me

23 Dec 20 - Start: 2000 End: 21000
Application now has a fully-functional express server, with a GET route for the location resource.

24 Dec 20 - Start: 1300 End: 1530
Created location and location constructor function -inop

__Feature 03 & 04 - Weather & Error__: User to enter the name of a location then can see data about the area of interest to me

26 Dec 20 - Start: 1800 End: 1900
Gave creating the Weather and waehter constructor function a go -inop

26 Dec 20 - Start: 1900 End: 1930
Created Error handling

### Lab-07

__Feature 01 - Location__:

30 Dec 20 - Start: 2000 End: 2030
Refactored `weatherHandler` to use `.map` in lieu of `forEach`

30 Dec 20 - Start: 2100 End: 2300
updated Location route to use data from the LocationIQ API

__Feature 02 - Weather__:

02 Jan 21 - Start: 1300 End: 1530
updated Weather route to use data from the Weather Bit API

04 Jan 21 - Start: 2030 End: 2130
completed the update to Weather route, data from the Weather Bit API rendering

### Lab-08

__Feature 01 - Movie__:

09 Jan 21 - Start: 1300 End: 1430
completed the Movies route, data from the Movie API rendering

__Feature 02 - Yelp__:

09 Jan 21 - Start: 1500 End: 1700
completed the Yelp route, data from the Yelp API rendering

__Feature 03 - Pagination__:

10 Jan 21 - Start: 1400 End: 1600
completed the pagination update to Yelp route

## Credits and Collaborations

28 Dec 20

- relied upon code review to get my code working for location & weather
- met with Dario Thornhill to review my code and get the instructions to get the API key

- don't forget the **http://**!

04 Jan 21

- benefitted from code review to get my `weatherData` variable to work and render the selected location's weather

09 & 10 Jan 21

- Able to complete after following code reviews from class 08 and 09
