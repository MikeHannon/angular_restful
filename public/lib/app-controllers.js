app.controller('MasterController', ['$scope', function ($scope) {
  $scope.current_time = Date.now();
 }]);
app.controller('UsersController', ['$scope','userFactory','userFactoryJSON', function ($scope, userFactory, userFactoryJSON) {
  userFactory.set_path('users');
  userFactoryJSON.set_path('users');
  $scope.y = {name: "mike"};
  $scope.data_set = userFactory.return_data;
  $scope.data_setJSON = userFactoryJSON.return_dataJSON;

  $scope.index_button = function(){userFactory.index();}
  $scope.create_button = function(user){userFactory.create(user);}
  $scope.new_button = function(){userFactory.new();}
  $scope.update_button = function(user){userFactory.update(user);}
  $scope.edit_button = function(id){userFactory.edit(id);}
  $scope.delete_button = function(id){userFactory.delete(id);}
  $scope.show_button = function(id){userFactory.show(id);}

  $scope.index_buttonJSON = function(){userFactoryJSON.index();}
  $scope.create_buttonJSON = function(user){userFactoryJSON.create(user);}
  $scope.new_buttonJSON = function(){userFactoryJSON.new();}
  $scope.update_buttonJSON = function(user){userFactoryJSON.update(user);}
  $scope.edit_buttonJSON = function(id){userFactoryJSON.edit(id);}
  $scope.delete_buttonJSON = function(id){userFactoryJSON.delete(id);}
  $scope.show_buttonJSON = function(id){userFactoryJSON.show(id);}

 }]);

//
