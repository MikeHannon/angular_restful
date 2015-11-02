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
var genericController = function(model_name, model_string_name, update_array) {

  return {
    index : function(req, res) {
      model_name.find({}, function(err, data){
        if (err){}
        else {
          console.log(data);
          res.sendFile(path.join(__dirname, './public/'+model_string_name+'/index.html'));
        }
      })
    }, //end of index

    create : function(req,res){
      console.log(req.body);
      user = new model_name({name:'mike'}); // TEST CODE
      user.save();
      res.sendFile(path.join(__dirname, './public/'+model_string_name+'/create.html'));
    }, // end of create

    show : function(req,res){
      model_name.findOne({_id:req.params.id}, function (err, user){
        if (err){console.log(err);}
        else {
          console.log(user);
          res.sendFile(path.join(__dirname, './public/'+model_string_name+'/show.html'));
        }
      })
    }, //end of show

    edit : function(req,res){
      res.sendFile(path.join(__dirname, './public/'+model_string_name+'/edit.html'));
    }, // end of edit

    new : function(req,res){
      res.sendFile(path.join(__dirname, './public/'+model_string_name+'/new.html'));
    }, // end of new

    update : function(req,res){
      //define key value pairs that should be updated with this controller
      var update_object = {};
      for (var i = 0; i < update_array.length; i ++){
        update_object[update_array[i]] = req.body[update_array[i]];
      }
      //end of define
      model_name.update({_id:req.params.id}, { $set: update_object}, {upsert: true}, function (err, previous_user) {
      if (err) {return handleError(err);}
      console.log(previous_user); // will require a show method or index to update dynamically
      res.sendFile(path.join(__dirname, './public/'+model_string_name+'/update.html'));
      });
    }, //end of update

    delete : function(req,res){
      res.sendFile(path.join(__dirname, './public/'+model_string_name+'/delete.html'));
    } //end of delete
  } // end of return
};


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
var Users_Controller = new genericController(User, "users", ['name']);
buildRoutes(app, Users_Controller);
//end





// End of Routing
