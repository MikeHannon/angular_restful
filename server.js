var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
// connect to the database
mongoose.connect('mongodb://localhost/Angular_RESTFUL_TEST');

//SIMPLE MODEL
var userSchema = new mongoose.Schema({
  name:'string'
});

var user = mongoose.model('User', userSchema);
// EOM
//SIMPLE CONTROLLER
var User = mongoose.model('User');
var app = express();
var Users_Controller = {};

Users_Controller.index = function(req, res) {
  User.find({}, function(err, data){
    if (err){}
    else {
      console.log(data);
      res.sendFile(path.join(__dirname, './public/users/index.html'));
    }
  })
};

Users_Controller.create = function(req,res){
  console.log(req.body);
  user = new User({name:'mike'});
  user.save();
  res.sendFile(path.join(__dirname, './public/users/create.html'));
};

Users_Controller.show = function(req,res){
  User.findOne({_id:req.params.id}, function (err, user){
    if (err){console.log(err);}
    else {
      console.log(user);
      res.sendFile(path.join(__dirname, './public/users/show.html'));
    }
  })
};

Users_Controller.edit = function(req,res){
  res.sendFile(path.join(__dirname, './public/users/edit.html'));
}

Users_Controller.new = function(req,res){
  res.sendFile(path.join(__dirname, './public/users/new.html'));
};

Users_Controller.update = function(req,res){ //you can't use User.update as the name of this function and then call User.update... it will overwrite the mongooseSchema.update!
  User.update({_id:req.params.id}, { $set: { name: req.body.name }}, {upsert: true}, function (err, previous_user) {
  if (err) {return handleError(err);}
  console.log(previous_user); // will require a show method or index to update dynamically
  res.sendFile(path.join(__dirname, './public/users/update.html'));
  });
}

Users_Controller.delete = function(req,res){
  res.sendFile(path.join(__dirname, './public/users/delete.html'));
}

//EOC

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.listen(8000, function(){});

// TESTING routing

app.get('/api/users', Users_Controller.index);
app.get('/api/users/new', Users_Controller.new);
app.get('/api/users/:id/edit', Users_Controller.edit);
app.get('/api/users/:id', Users_Controller.show);
app.post('/api/users', Users_Controller.create);
app.put('/api/users/:id', Users_Controller.update);
app.delete('/api/users/:id', Users_Controller.delete);
