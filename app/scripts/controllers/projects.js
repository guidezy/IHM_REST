'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    if($routeParams.projectId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentProject = data.data;
          }
        });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Users')
        .success(function(data) {
          if(data.status == "success") {
            $scope.projectUsers = data.data;
          }
        });
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId + '/Roles')
        .success(function(data) {
          if(data.status == "success"){
            $scope.roles = data.data;
            var userRole;
            $scope.tabRoles = [];
            angular.forEach($scope.projectUsers,function(use,key){
              angular.forEach($scope.roles,function(role,key2){
                if(use.id == role.UserId){
                  userRole = {"user": use,"role":role};
                  $scope.tabRoles.push(userRole);
                }
              });
            });
            console.log($scope.tabRoles);
          }
        });

      $scope.addUser = function(){
        var userName = $scope.userName.trim();
        var userSurname = $scope.userSurname.trim();
        if(!userName.length || !userSurname.length){
          return;
        }
        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/')
          .success(function(data) {
            if(data.status == "success") {
              $scope.allUsers = data.data;
            }
          });
        angular.forEach($scope.allUsers,function(value,key){
          if(value.name == userName && value.surname == userSurname){
            $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+$scope.currentProject.id+"/Users/"+value.id);
            console.log("trouvé");
            console.log("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+$scope.currentProject.id+"/Users/"+value.id);
          }
        })
      }

      $scope.deleteUser = function(){
        var userNameDel = $scope.userNameDel.trim();
        var userSurnameDel = $scope.userSurnameDel.trim();
        if(!userNameDel.length || !userSurnameDel.length){
          return;
        }
        angular.forEach($scope.projectUsers,function(value,key){
          if(value.name == userNameDel && value.surname == userSurnameDel){
            $http.delete("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+$scope.currentProject.id+"/Users/"+value.id);
            console.log("trouvé");
            console.log("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+$scope.currentProject.id+"/Users/"+value.id);
          }
        })
      }

      $scope.deleteProject = function(){
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
      }
    }
  }]);
