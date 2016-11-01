'use strict';

/**
 * @ngdoc function
 * @name reportsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reportsApp
 */
angular.module('reportsApp')
.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, $window, $timeout, ReportsService ){

	console.log($scope.startDate);
	
	/* fetch report */
	var input = { "startDate" : "Oct 28 2016 00:00:00 GMT+0530 (India Standard Time)" , "endDate" :"Oct 30 2016 23:59:59 GMT+0530 (India Standard Time)" };
	ReportsService.FetchReport(input, function(err, response){
		if(response){
			console.log("response", response);
			$scope.reports = response;
		}else{
			console.log("errr", response);
		}
	})

	$scope.getData = function(){

		console.log($scope.startDate);
		
		/* fetch report */
		var input = { "startDate" : $scope.startDate , "endDate" :$scope.endDate };
		ReportsService.FetchReport(input, function(err, response){
			if(response){
				console.log("response", response);
				$scope.reports = response;
			}else{
				console.log("errr", response);
			}
		})
	};

});