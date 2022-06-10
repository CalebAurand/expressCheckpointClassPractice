const express = require('express');

const bodyParser = require('body-parser');


let dotenv = require('dotenv');
//setup to use the dotenv file
//these are the default ways to use dotenv
//documentation is at docs.dotenv.org
dotenv.config();

//get the API's server port from env, fallback on port 8001 if not configured
const PORT = process.env.PORT || 8001;

let app = express();

app.use(bodyParser.json());

//use this for serving up the static resources index.html, css, etc
app.use(express.static("./static"));


//get the route definitions
const todoRoutes = require("./routes/todosRts");
//tell the express app to use the routes
app.use(todoRoutes);

app.listen(PORT, function(){
  console.log("API SERVER Started on port ", PORT);
});