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

$scope.datePicker = {};
	$scope.datePicker.date = {startDate: moment().subtract(4,'d'), endDate: moment()};

$scope.earlierDate = $scope.datePicker.date;
	// console.log("load");
	
	
	getDataFromService($scope,ReportsService);

	$scope.getData = function(){ //console.log('getData called');
		getDataFromService($scope,ReportsService);
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
	        			if(i==1){
	        			// console.log('a');console.log(rowData[j].nextElementSibling);
	        			// console.log('b');console.log(rowData[j].children[0].innerHTML);
	        		}
		        		if(rowData[j].children.length) {
		        			csvString = csvString + rowData[j].children[0].innerHTML + ",";
		        		}else{
		        			csvString = csvString + rowData[j].innerHTML + ",";
		        		}
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


function getDataFromService($scope,ReportsService){


var dateSplit = {startDate : String($scope.datePicker.date.startDate._d).split(" ") , endDate : String($scope.datePicker.date.endDate._d).split(" ")};

console.log(dateSplit);
		var cookieIDArr = [];
	/* fetch report */
	var input = { "startDate" : dateSplit.startDate[1] + " " + dateSplit.startDate[2] + " " + dateSplit.startDate[3] + " 00:00:00 GMT+0530 (India Standard Time)" , "endDate" : dateSplit.endDate[1] + " " + dateSplit.endDate[2] + " " + dateSplit.endDate[3] + " 23:59:59 GMT+0530 (India Standard Time)" , "firstOnly" :"true" };
	console.log(input);
	ReportsService.FetchReport(input, function(err, response){
		if(response){
			var firstCookies = response.data;
			$scope.reports = firstCookies;

			for(var i=0; i < firstCookies.length ; i++){
				cookieIDArr.push(response.data[i]._id);
				firstCookies[i].flow.visitedURL = firstCookies[i].flow.createdAt =  "Loading...";

			}
			
			
			var groupedCookiesArr = [];
			var groupedCookiesPaymentArr = [];
			// for(var j = 0 ; j < cookieIDArr.length ; j = j+5) {
			
			// }


			// var iterations = 1;

		        for(var j = 0 ; j < cookieIDArr.length ; j = j+50) {
		             
		            	// console.log('j');
		            	// console.log(j);
		               	var cookieIDArrInput = cookieIDArr.slice(j,j+50);
						var inputJ = {"cookieIDs":cookieIDArrInput};
						// console.log("cookieIDArr");
						// console.log(cookieIDArr);
						ReportsService.FetchJourney(inputJ, function(err, response){

							for(var i = 0; i < response.data.length ; i++){
								if(typeof groupedCookiesArr[response.data[i].cookieID] === "undefined"){
									groupedCookiesArr[response.data[i].cookieID] = [];
								}
								groupedCookiesArr[response.data[i].cookieID].push(response.data[i]);
							}


							for(var i= 0 ; i < firstCookies.length ; i++){
								if(typeof groupedCookiesArr[firstCookies[i]._id] !== "undefined" && typeof groupedCookiesArr[firstCookies[i]._id][0] !== "undefined"){
										firstCookies[i].flow = groupedCookiesArr[firstCookies[i]._id][0];		
								}
							}

						});               
		            
		        } 
		    

			
			var input = {"cookieIDs":cookieIDArr};

				ReportsService.FetchPayment(input, function(err, response){
					if(response){
					
						for(var i = 0; i < response.data.length ; i++){
							if(typeof groupedCookiesPaymentArr[response.data[i].cookieID] === "undefined"){
								groupedCookiesPaymentArr[response.data[i].cookieID] = [];
							}
							groupedCookiesPaymentArr[response.data[i].cookieID].push(response.data[i]);
						}

						// console.log("groupedCookiesPaymentArr");
						// console.log(groupedCookiesPaymentArr);

						for(var i= 0 ; i < firstCookies.length ; i++){
							if(typeof groupedCookiesPaymentArr[firstCookies[i]._id] !== "undefined"){
								firstCookies[i].payment = groupedCookiesPaymentArr[firstCookies[i]._id][0];
							}else{
								//firstCookies[i].payment.policyId = firstCookies[i].payment.transactionRefNum = firstCookies[i].payment.uwDicision = firstCookies[i].payment.policyNum = "none";
							}	
						}
						$scope.reports = firstCookies;

					}else{
		
					}
				});
		
		}else{
			console.log("errr", response);
		}
	})
}