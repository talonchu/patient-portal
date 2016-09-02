angular.module('Intellivisit.patient.login')

    .service('LoginService', ['$http', function ($http) {

        this.login = function (username, password) {
            var data = {
                'username': username,
                'password': password,
                'applicationScope': 'patient-portal_' + navigator.userAgent
            };

            var URL = Routes.buildURL(Routes.login);
            return $http.post(URL, data);

            // return $http.post(rootPrefix + "user-api/login", data);
        };

        this.getCustomer = function (username) {
            var URL = Routes.buildURL(Routes.customer, {username: username});
            return $http.get(URL);

            // return $http.get(rootPrefix + "patient-api/patient/" + username + "/customer");
        };

        this.getUser = function (username) {
            var URL = Routes.buildURL(Routes.user, {username: username});
            return $http.get(URL);

            // return $http.get(rootPrefix + "user-api/user/" + username);
        };

        this.getPatientInfo = function (username) {
            var URL = Routes.buildURL(Routes.patientInformation, {username: username});
            return $http.get(URL);
        };

        this.setCustomer = function (username, customerId) {
            // /patient-api/{userId}/customer/{customerId}

            var URL = Routes.buildURL(Routes.setCustomer, {username: username, customerId: customerId});
            return $http.put(URL);

            // return $http.put(rootPrefix + "patient-api/patient/" + username + "/customer/" + customerId);
        };

        this.getPostLoginSteps = function (username) {
            return $http.get(Routes.buildURL(
                Routes.getPostLoginSteps,
                {"username": username}
            ));
        };
    }]);