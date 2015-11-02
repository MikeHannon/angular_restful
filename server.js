//Basic Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
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
// End

//Example CONTROLLER
/* Load Model */
var User = mongoose.model('User');
// Controller
var build_controller = require("./server/lib/controller_template.js");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.listen(8000, function(){});

//restful route builder
var buildRoutes = function(app, controller){
  app.get('/api/users', controller.index);
  app.get('/api/users/new', controller.new);
  app.get('/api/users/:id/edit', controller.edit);
  app.get('/api/users/:id', controller.show);
  app.post('/api/users', controller.create);
  app.put('/api/users/:id', controller.update);
  app.delete('/api/users/:id', controller.delete);
}
//end of route builder
//CREATE CONTROLLLER and routes (example)
var Users_Controller = new build_controller(User, "users", ['name']);
buildRoutes(app, Users_Controller);
//end





// End of Routing
