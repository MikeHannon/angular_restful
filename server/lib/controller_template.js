// returns what is most appropriate
var path = require('path');

module.exports = (function(model_name, model_string_name, update_array) {
    console.log(__dirname);
// 
  return {
    index : function(req, res) {
      model_name.find({}, function(err, data){
        if (err){}
        else {
          res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/index.html'));
        }
      })
    }, //end of index

    create : function(req,res){
      console.log(req.body);
      user = new model_name({name:'mike'}); // TEST CODE
      user.save();
      res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/create.html'));
    }, // end of create

    show : function(req,res){
      model_name.findOne({_id:req.params.id}, function (err, user){
        if (err){console.log(err);}
        else {
          console.log(user);
          res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/show.html'));
        }
      })
    }, //end of show

    edit : function(req,res){
      res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/edit.html'));
    }, // end of edit

    new : function(req,res){
      res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/new.html'));
    }, // end of new

    update : function(req,res){
      //define key value pairs that should be passed to and updated with calls to this method
      var update_object = {};
      for (var i = 0; i < update_array.length; i ++){
        update_object[update_array[i]] = req.body[update_array[i]];
      }
      //end of define
      model_name.update({_id:req.params.id}, { $set: update_object}, {upsert: true}, function (err, previous_user) {
      if (err) {return handleError(err);}
      console.log(previous_user); // will require a show method or index to update dynamically
      res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/update.html'));
      });
    }, //end of update

    delete : function(req,res){
      res.sendFile(path.join(__dirname, './../../public/'+model_string_name+'/delete.html'));
    } //end of delete
  } // end of return
});
