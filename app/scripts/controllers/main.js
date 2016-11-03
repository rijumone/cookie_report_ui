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
	var input = { "startDate" : "Oct 28 2016 00:00:00 GMT+0530 (India Standard Time)" , "endDate" :"Oct 28 2016 23:59:59 GMT+0530 (India Standard Time)" };
	ReportsService.FetchReport(input, function(err, response){
		if(response){
			console.log("response", response);
			
			$scope.reports = response;
		}else{
			console.log("errr", response);
		}
	})

	$scope.getData = function(){

		// console.log($scope.startDate);
		if(typeof $scope.startDate == "undefined"){$scope.startDate = "Oct 28 2016 00:00:00 GMT+0530 (India Standard Time)";}
		if(typeof $scope.endDate == "undefined"){$scope.endDate = "Oct 28 2016 23:59:59 GMT+0530 (India Standard Time)";}
		/* fetch report */
		var input = { "startDate" : $scope.startDate , "endDate" :$scope.endDate };
		console.log("input");
		console.log(input);
		ReportsService.FetchReport(input, function(err, response){
			if(response){
				// console.log("response: ", response);

				$scope.reports = response;
			}else{
				console.log("error: ", response);
			}
		})
	};

}).directive('exportToCsv',function(){
  	return {
    	restrict: 'A',
    	link: function (scope, element, attrs) {
    		var el = element[0];
	        element.bind('click', function(e){
	        	var table = e.target.nextElementSibling;
	        	var csvString = '';
	        	for(var i=0; i<table.rows.length;i++){
	        		var rowData = table.rows[i].cells;
	        		for(var j=0; j<rowData.length;j++){
	        			csvString = csvString + rowData[j].innerHTML + ",";
	        		}
	        		csvString = csvString.substring(0,csvString.length - 1);
	        		csvString = csvString + "\n";
			    }
	         	csvString = csvString.substring(0, csvString.length - 1);
	         	var a = $('<a/>', {
		            style:'display:none',
		            href:'data:application/octet-stream;base64,'+btoa(csvString),
		            download:'report.csv'
		        }).appendTo('body')
		        a[0].click()
		        a.remove();
	        });
    	}
  	}
	});
