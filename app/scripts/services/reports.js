angular.module('reportsApp')
.service('ReportsService', function ($q, $http, $rootScope) {

    this.FetchReport = function (input, cb) {
		$http.post('http://192.168.0.8:1337/user/path', input)
		.success(function(response){
			// console.log("response", response);
			return cb(null, response);
		})
		.error(function(err){
			return cb(err);
		});
    }

	this.FetchJourney = function (input, cb) {
		$http.post('http://192.168.0.8:1337/user/uniquecookie', input)
		.success(function(response){
			return cb(null, response);
		})
		.error(function(err){
			return cb(err);
		});
    }
	this.FetchPayment = function (input, cb) {
		$http.post('http://192.168.0.8:1337/user/uniquepayment', input)
		.success(function(response){
			return cb(null, response);
		})
		.error(function(err){
			return cb(err);
		});
    }



});

