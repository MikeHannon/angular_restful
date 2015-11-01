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
  User.find({},  function(err, data){
    if (err){}
    else {console.log(data);}
  })
};
Users_Controller.create = function(req,res){
  console.log(req.body);
  user = new User({name:'mike'});
  user.save();
};
Users_Controller.show = function(req,res){
  User.findOne({_id:req.params.id}, function (err, user){
    if (err){console.log(err);}
    else {console.log(user);}
  })
};
Users_Controller.update = function(req,res){ //you can't use User.update as the name of this function and then call User.update... it will overwrite the mongooseSchema.update!
  User.update({_id:req.params.id}, { $set: { name: req.body.name }}, {upsert: true}, function (err, previous_user) {
  if (err) return handleError(err);
  console.log(previous_user); // will require a show method or index to update dynamically
});

}

//EOC

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.listen(8000, function(){});

app.get('/api/users', function(req,res){
  Users_Controller.index();
  res.sendFile(path.join(__dirname, './public/users/index.html'));
});

app.get('/api/users/:id/edit', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/edit.html'));
});

app.get('/api/users/new', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/new.html'));
});

app.get('/api/users/:id', function(req,res){
  Users_Controller.show(req,res);
  res.sendFile(path.join(__dirname, './public/users/show.html'));
});

app.post('/api/users', function(req,res){
  Users_Controller.create(req,res);
  res.sendFile(path.join(__dirname, './public/users/create.html'));
});

app.put('/api/users/:id', function(req,res){
  Users_Controller.update(req,res);
  res.sendFile(path.join(__dirname, './public/users/update.html'));
});

app.delete('/api/users/:id', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/delete.html'));
});
