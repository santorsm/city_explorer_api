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
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

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

## Credits and Collaborations

28 Dec 20 

- relied upon code review to get my code working for location & weather
- met with Dario Thornhill to review my code and get the instructions to get the API key

- don't forget the **http://**!