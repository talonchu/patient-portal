angular.module('Intellivisit.patient.dashboard.profile.primaryProfile')

.service('PrimaryProfile', [ '$http', '$state', '$log', function($http, $state, $log) {
	"use strict";

	this.setPrimaryProfile = function(successHandler, failedHandler) {
		var username = sessionStorage.getItem("username");
		var data = {
			'maritalStatus': sessionStorage.getItem("maritalStatus"),
			'heightFt': Number(sessionStorage.getItem("heightFt")),
			'heightIn': Number(sessionStorage.getItem("heightIn")),
			'weight': Number(sessionStorage.getItem("weight")),
			'sex': sessionStorage.getItem("sex"),
			'ethnicity1': sessionStorage.getItem("ethnicity1"),
			'ethnicity2': sessionStorage.getItem("ethnicity2"),
			'primaryCareProvider': sessionStorage.getItem("primaryCareProvider")
		};

		$log.debug(data);

		$http.patch(Routes.buildURL(Routes.setPrimaryProfile, {
			"username": username
		}), data).then(successHandler, failedHandler);
	};

} ]);
