angular.module('Intellivisit.patient.dashboard.profile.contactPreferences').service('ContactPreferencesService', function($http, $q, $log) {
	"use strict";
	this.getContactPreference = function() {
		var username = sessionStorage.getItem("username");
		return $http.get(Routes.buildURL(Routes.contactPreference, {
			"username": username
		}));
	};

	this.setContactPreference = function(successHandler, failedHandler) {
		var data = {
			'username': sessionStorage.getItem("username"),
			'mode': sessionStorage.getItem("mode"),
			'email': sessionStorage.getItem("email"),
			'phoneNumber': sessionStorage.getItem("phoneNumber"),
			'landline': sessionStorage.getItem("landline")
		};

		$log.debug(data);

		$http.patch(Routes.buildURL(Routes.contactPreference, {username: sessionStorage.getItem('username')}), data).then(successHandler, failedHandler);
	};

	this.getVerificationCode = function (communicationValue, phoneType) {
      
        var data = {
            "mode": "SMS",
			"phoneType": phoneType,
            "value": [communicationValue],
            "preferred": "true"
        };


        var URL = Routes.buildURL(Routes.userGetVerificationCode, {username: sessionStorage.getItem('username')});
        return $http.post(URL, data);

    };
    
});