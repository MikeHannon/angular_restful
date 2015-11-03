app.controller('MasterController', ['$scope', function ($scope) {
  $scope.current_time = Date.now();
 }]);
app.controller('UsersController', ['$scope','userFactory', function ($scope, userFactory) {
  userFactory.set_path('users');
  $scope.y = {name: "mike"};
  $scope.data_set = userFactory.return_data;
  $scope.index_button = function(){userFactory.index();}
  $scope.create_button = function(user){userFactory.create(user);}
  $scope.new_button = function(){userFactory.new();}
  $scope.update_button = function(user){userFactory.update(user);}
  $scope.edit_button = function(id){userFactory.edit(id);}
  $scope.delete_button = function(id){userFactory.delete(id);}
  $scope.show_button = function(id){userFactory.show(id);}
 }]);
