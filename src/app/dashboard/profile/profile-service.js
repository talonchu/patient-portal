angular.module('Intellivisit.patient.dashboard.profile')

.service('ProfileService', [ '$http', '$state', '$log', function($http, $state, $log) {
	"use strict";

	this.getUserInformation = function() {
		var username = sessionStorage.getItem("username");
		return $http.get(Routes.buildURL(
			Routes.patientInformation,
			{"username": username}
		));
	};

} ]);
