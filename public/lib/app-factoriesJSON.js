app.factory('userFactoryJSON', ['$http', function($http) {
  var that = this;
  var urlBase = '/api/';
  var return_data = { index : "index",      //JSON with all users
                      show:   "show",       //JSON read 1
                      create: "create",     //Load a view to allow creation of a new user
                      edit:   "edit",       //Load a view to allow editing of user info
                      update: "update",     //Updates the user information from the DB
                      delete: "delete",     //Deletes the user information from the DB
                      new:    "new",        //Stores the new user information to the DB
                      errors: "errors"      //JSON with errors if they exist
                    };
  //Callbacks//
  //Process Data Callback; [param] = key of return_data as a string
  var processData = function (response, param){return_data[param] = response.data; console.log(response.data)}
  //Error Callback
  var errorCallback = function(response){return_data.errors = response}
  console.log("here");
  return{

   index: function () {
     $http.get(urlBase).then(function(response){processData(response,'index')}, errorCallback);
   },

   new: function() {
     $http.get(urlBase + "new").then(function(response){processData(response,'new')}, errorCallback);
   },

   show: function (id) {
     $http.get(urlBase + id).then(function(response){processData(response,'show')}, errorCallback);
   },

   create: function (user) {
     $http.post(urlBase, user).then(function(response){processData(response,'create')}, errorCallback);
   },

   update: function (user) {
     $http.put(urlBase + user.id, user).then(function(response){processData(response,'update')}, errorCallback);
   },

   delete: function (id) {
     $http.delete(urlBase + id).then(function(response){processData(response,'delete')}, errorCallback);
   },

   edit: function (id) {
     $http.get(urlBase + id + '/edit').then(function(response){processData(response,'edit')}, errorCallback);
   },

   set_path: function(controller_name){
      urlBase = '/api/json/'+controller_name+'/';
   },

   return_dataJSON: return_data
  }
 }]);
