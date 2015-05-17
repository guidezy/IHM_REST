'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('AddCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.addUser = function() {
      var newUserName = $scope.userName.trim();
      if (!newUserName.length) {
        return;
      }
      var newUserSurname = $scope.userSurname.trim();
      if (!newUserSurname.length) {
        return;
      }
      var userFinal = {"name":newUserName,"surname": newUserSurname};
      console.log(userFinal);
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/',userFinal);
    }

    $scope.addProj = function() {
      var newProjectTitle = $scope.projectTitle.trim();
      if (!newProjectTitle.length) {
        return;
      }
      var newProjectYear = $scope.projectYear.trim();
      if (!newProjectYear.length) {
        return;
      }
      var projectFinal = {"title":newProjectTitle,"year": newProjectYear};
      console.log(projectFinal);
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/',projectFinal);
    }
  }]);
