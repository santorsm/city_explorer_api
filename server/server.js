'use strict';

//bring in modules/dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//set up our application
const app = express();
const PORT = process.env.PORT;
app.use(cors());


//start our server
app.listen(PORT, () => {
  console.log(`Now listening on port, ${PORT}`);
});
