'use strict';

/**
 * @ngdoc overview
 * @name reportsApp
 * @description
 * # reportsApp
 *
 * Main module of the application.
 */
angular
  .module('reportsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial', 
    'ngMessages',
    'daterangepicker',
    // 'bootstrap',
    // 'ui.bootstrap.datetimepicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/journey/:journey', {
        templateUrl: 'views/journey.html',
        controller: 'JourneyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
