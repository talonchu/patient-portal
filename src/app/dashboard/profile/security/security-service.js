angular.module('Intellivisit.patient.dashboard.profile.security')

.service('SecurityService', [ '$http', '$state', '$log', function($http, $state, $log) {
	"use strict";

	this.saveSecurity = function(username, data) {
		return $http.patch(Routes.buildURL(Routes.saveSecurity, {
			"username": username
		}), data);
	};

} ]);
