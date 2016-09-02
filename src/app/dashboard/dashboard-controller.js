angular.module('Intellivisit.patient.dashboard')
    .controller('Dashboard.HeaderCtrl', function ($scope, $state, DashboardService) {
        $scope.HEADER_NAV_ITEMS = HEADER_NAV_ITEMS;

        $scope.navigate = function (item) {
            if (item.link) {
                window.location.href = item.link;
            }

            if (item.func) {
                item.func();
            }
        };

        $scope.logout = function () {
            DashboardService.logout(sessionStorage.getItem("username"), sessionStorage.getItem("access_token"))["finally"](function (respose) {
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("access_token");
            });
            $state.go("login");
        };
    })

    .controller('Dashboard.DashboardCtrl', function DashboardCtrl($scope, $cookies, $http, $state, DashboardService) {
        // init left navigation
        $scope.leftNavItems = LEFT_NAV_ITEMS;

        $scope.accountProfileCollapsed = false;
        $scope.healthProfileCollapsed = true;

        $scope.expandProfile = function (item) {
            if (item === "accountProfile") {
                  if(!$scope.accountProfileCollapsed) {
                      $scope.accountProfileCollapsed = true;
                  } else {
                      $scope.accountProfileCollapsed = false;
                      $scope.healthProfileCollapsed = true;
                  }
            } else if (item === "healthProfile") {
                if($scope.healthProfileCollapsed) {
                    $scope.accountProfileCollapsed = true;
                    $scope.healthProfileCollapsed = false;
                } else {
                    $scope.healthProfileCollapsed = true;
                }
            }
        };

        $scope.currentSelecteItem = markSelectedInLeftNav('leftNavAccountInformation');

        $scope.leftNavSelected = function (item) {
            if(item.mode === "accountProfile") {
                $scope.currentSelecteItem = markSelectedInLeftNav(item.id);
            }
            if (item.mode === "healthProfile") {
                var url_base_path = location.origin + location.pathname;
                var url_hash = item.link;
                $cookies.put("return_base_path", url_base_path, { path: "/" });
                $cookies.put("return_hash", url_hash, { path: "/" });
                window.location.href = Routes.buildURL(item.link, { "username": $scope.username });
            }
        };

        $scope.username = sessionStorage.getItem("username");

        DashboardService.getAvatar($scope.username).then(function (response) {
            $scope.avatarUrl = response.data;
        });

    }
)
;
