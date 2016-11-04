'use strict';

/**
 * @ngdoc function
 * @name reportsApp.controller:JourneyCtrl
 * @description
 * # JourneyCtrl
 * Controller of the reportsApp
 */
angular.module('reportsApp')
.controller('JourneyCtrl', function ($scope, $rootScope, $routeParams, $location, $window, $timeout, ReportsService ){

	console.log($routeParams.journey);	
	/* fetch report */
	var input = { "cookieID" : $routeParams.journey};
	ReportsService.FetchJourney(input, function(err, response){
		if(response){
			console.log("response: ", response);			
			$scope.journey = response;
		}else{
			console.log("errr", response);
		}
	})
	ReportsService.FetchPayment(input, function(err, response){
		if(response){
			console.log("payment: ", response);			
			$scope.payment = response;
		}else{
			console.log("errr", response);
		}
	})

});
