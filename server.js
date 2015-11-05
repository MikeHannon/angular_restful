//Basic Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
//end
//Custom Dependencies
var BuildController= require("./server/lib/controller_template.js");
var BuildControllerJSON= require("./server/lib/controller_template_json.js");
var routesTemplate = require("./server/lib/routes_template.js")
var app = express();
// End

// connect to the database
mongoose.connect('mongodb://localhost/Angular_RESTFUL_TEST');
// End

//Example MODEL
var userSchema = new mongoose.Schema({
  name:'string'
});

var user = mongoose.model('User', userSchema);
/* Load Model */
var User = mongoose.model('User');
// Controller

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.listen(8000, function(){});

//CREATE CONTROLLLER and routes (example)
var Users_Controller = new BuildController(User, "users", ['name']);
var Users_Controller_JSON = new BuildControllerJSON(User, "users", ['name']);

//routes for controller
routesTemplate(app, Users_Controller, "users");
routesTemplate(app, Users_Controller_JSON, "users", "json");
//end


// 


// End of Routing
