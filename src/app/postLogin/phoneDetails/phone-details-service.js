angular.module('Intellivisit.patient.postLogin.phoneDetails')

    .service('PhoneDetailsService', ['$http', function ($http) {
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