var app = angular.module("app", [])
.controller('MyController', ['$scope','dataFactory', function ($scope, dataFactory) {
  dataFactory.set_path('users');
  $scope.y = {name: "mike"};
  $scope.data_set = dataFactory.return_data;
  $scope.index_button = function(){dataFactory.index();}
  $scope.create_button = function(user){dataFactory.create(user);}
  $scope.new_button = function(){dataFactory.new();}
  $scope.update_button = function(user){dataFactory.update(user);}
  $scope.edit_button = function(id){dataFactory.edit(id);}
  $scope.delete_button = function(id){dataFactory.delete(id);}
  $scope.show_button = function(id){dataFactory.show(id);}
}])//
.factory('dataFactory', ['$http', function($http) {
  var that = this;
  var urlBase = '/api/';
  var return_data = { index : "index", //JSON with all users
                      show:   "show", //JSON read 1
                      create: "create",
                      edit:   "edit", // load a view
                      update: "update", // does the db stuff
                      delete: "delete",
                      new:    "new", //
                      errors: "errors"
                    };

  return{

   index: function () {
     $http.get(urlBase).then(function(data){
                          return_data.index = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });
   },

   new: function() {
     $http.get(urlBase + "/new").then(function(response){
                          return_data.new = response.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });;
   },

   show: function (id) {
     $http.get(urlBase + '/' + id).then(function(data){
                          return_data.show = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });;
   },

   create: function (cust) {
     $http.post(urlBase, cust).then(function(data){
                          return_data.create = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });;
   },

   update: function (cust) {
     $http.put(urlBase + '/' + cust.id, cust).then(function(data){
                          return_data.update = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });
   },

   delete: function (id) {
     $http.delete(urlBase + '/' + id).then(function(data){
                          return_data.delete = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });;
   },

   edit: function (id) {
     $http.get(urlBase + '/' + id + '/edit').then(function(data){
                          return_data.edit = data.data
                        }, function errorCallback(response) {
                          return_data.errors = response
                        });;
   },

   set_path: function(controller_name){
     urlBase = '/api/'+controller_name;
   },
   return_data: return_data
  }
 }]).directive('ngHtmlCompile', ["$compile", function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngHtmlCompile, function (newValue, oldValue) {
                element.html(newValue);
                $compile(element.contents())(scope);
            });
        }
    }
}]);
 ;
