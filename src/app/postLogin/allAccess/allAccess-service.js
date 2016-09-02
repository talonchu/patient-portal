angular.module('Intellivisit.patient.postLogin.allAccess')
    .service('AllAccessService', ['$http', '$state', '$log', function ($http, $state, $log, $uibModal) {
        this.getEligibleCustomers = function (showAllEligible) {
            var username = sessionStorage.getItem("username");
            return $http.get(Routes.buildURL(
                Routes.customer,
                {
                    "username": username,
                    "showAllEligible": showAllEligible
                }
            ));
        };

        this.getCustomerLogo = function (customerId) {
            var URL = Routes.buildURL(Routes.getCustomerLogo, {"customerId": customerId});
            return $http.get(URL, {
                responseType: 'blob',
                transformResponse: function (data) {
                    return (window.URL || window.webkitURL).createObjectURL(data);
                }
            });
        };

        this.setCustomer = function (customerId) {
            var username = sessionStorage.getItem("username");
            var URL = Routes.buildURL(Routes.setCustomer, {username: username, customerId: customerId});
            return $http.put(URL);
        };
    }]);
