angular.module('Intellivisit.patient.dashboard.profile.accountInformation')

    .service('AccountInformationService', ['$http', '$state', '$log', function ($http, $state, $log) {
        "use strict";

        this.saveAccountInformation = function (username, data) {
            return $http.patch(Routes.buildURL(Routes.saveAccountInformation, {
                "username": username
                }) + '?fromProfile=true', data);
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
    }]);
