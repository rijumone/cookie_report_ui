angular.module('reportsApp')
.service('ReportsService', function ($q, $http, $rootScope) {

    this.FetchReport = function (input, cb) {
		$http.post('http://analytics.religarehealthinsurance.com/user/path', input)
		.success(function(response){
			console.log("response", response);
			return cb(null, response);
		})
		.error(function(err){
			return cb(err);
		});
    }

});