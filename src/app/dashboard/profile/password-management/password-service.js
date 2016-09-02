angular.module('Intellivisit.patient.dashboard.profile.passwordManagement')
	.service('PasswordManagementService', function ($http, $q) {
		"use strict";
		this.updatePassword = function (passwordObj, successHandler, failedHandler) {
			var username = sessionStorage.getItem("username");
			return $http.patch(Routes.buildURL(Routes.changePassword, { username: username }), passwordObj);
		};
	});