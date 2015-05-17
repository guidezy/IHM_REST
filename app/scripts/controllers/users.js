'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    if($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
      .success(function(data) {
        if (data.status == "success") {
          $scope.currentUser = data.data;
        }
      });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
        .success(function(data) {
        if(data.status == "success") {
          $scope.userProjects = data.data;
        }
      });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Roles')
        .success(function(data) {
        if(data.status == "success"){
          $scope.roles = data.data;
          var userRole;
          $scope.tabRoles = [];
          angular.forEach($scope.userProjects,function(proj,key){
            angular.forEach($scope.roles,function(role,key2){
              if(proj.id == role.ProjectId){
                userRole = {"project": proj,"role":role};
                $scope.tabRoles.push(userRole);
              }
            });
          });
          console.log($scope.tabRoles);
        }
      });

      $scope.deleteUser = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
      }
    }
  }]);
