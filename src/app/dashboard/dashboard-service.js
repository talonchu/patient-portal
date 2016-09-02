angular.module('Intellivisit.patient.dashboard')

    .service('DashboardService', ['$http', function ($http) {

        this.logout = function (username, accessToken) {
            var data = {
                'username': username,
                'token': accessToken
            };

            var URL = Routes.buildURL(Routes.logout);
            return $http.post(URL, data);
        };

        this.getAvatar = function (username) {
            var URL = Routes.buildURL(Routes.avatar, {"username": username});
            return $http.get(URL, {
                responseType: 'blob',
                transformResponse: function (data) {
                    return (window.URL || window.webkitURL).createObjectURL(data);
                }
            });
        };
    }]
);