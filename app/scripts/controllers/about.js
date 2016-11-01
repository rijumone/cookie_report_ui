'use strict';

/**
 * @ngdoc function
 * @name reportsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reportsApp
 */
angular.module('reportsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
