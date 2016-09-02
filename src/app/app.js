var global_dependencies = [
    'templates-app',
    'templates-common',
    'ui.router',
    'angular-google-analytics',
    'ngSanitize',
    'validation.match',
    'ui.bootstrap',
    'ngCookies'
];

var intellivisit_modules = [
    'Intellivisit.patient.common.mobileVerification',
    'Intellivisit.patient.common.validator',
    'Intellivisit.patient.common.utils',
    'Intellivisit.patient.login',
    'Intellivisit.patient.dashboard',
    'Intellivisit.patient.dashboard.profile',
    'Intellivisit.patient.dashboard.profile.paymentMethods',
    'Intellivisit.patient.dashboard.profile.primaryProfile',
    'Intellivisit.patient.dashboard.profile.pharmacies',
    'Intellivisit.patient.dashboard.profile.contactPreferences',
    'Intellivisit.patient.dashboard.profile.passwordManagement',
    'Intellivisit.patient.dashboard.profile.accountInformation',
    'Intellivisit.patient.dashboard.profile.security',
    'Intellivisit.patient.register',
    'Intellivisit.patient.forgotPassword',
    'Intellivisit.patient.postLogin.noCustomerMatch',
    'Intellivisit.patient.postLogin.phoneDetails',
    'Intellivisit.patient.success',
    'Intellivisit.patient.config',
    'Intellivisit.patient.postLogin.allAccess',
    'Intellivisit.patient.postLogin.updatePatientProfile'
];

// Define intellivisit modules
for (var i in intellivisit_modules) {
    angular.module(intellivisit_modules[i], []);
}

angular.module('Intellivisit.patient', global_dependencies.concat(intellivisit_modules))
    .config(function myAppConfig($stateProvider, $urlRouterProvider, $httpProvider, AnalyticsProvider) {
        $urlRouterProvider.otherwise('login');
        $httpProvider.interceptors.push('httpInterceptor');

        /* Disable request cache to avoid IE compatibility issue */
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        /* End of Disable request cache to avoid IE compatibility issue */

        /* Google Analytics configurations */

        AnalyticsProvider.setAccount(GOOGLE_ANALYTICS_CODE);

        /* End of Google Analytics configurations */
    })
    .run(function run() {

    })
    .controller('AppCtrl', function AppCtrl($scope, $location, $state, $cookies, $rootScope, Analytics, $uibModal) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }
            if (angular.isDefined(toState.data.bodyClass)) {
                $scope.bodyClass = toState.data.bodyClass;
            }
            if (angular.isDefined(toState.data.requiredBackground) && toState.data.requiredBackground === true) {
                $scope.backgroundImage = randomImage();
            } else {
                $scope.backgroundImage = null;
            }

            Analytics.trackPage(Analytics.getUrl(), $scope.pageTitle);
        });

        $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (WHITE_STATE_LIST[toState.name.split(".")[0]]) {
                return;
            }

            var accessToken = sessionStorage.getItem("access_token");
            if (accessToken == null) {
                event.preventDefault();
                $state.go("login");
            }
            else {
                $cookies.put("Authorization", sessionStorage.getItem("access_token"), {path: "/"});
            }
        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams) {
            // alert("System Error. Please contact " + CUSTOMER_SUPPORT_PHONE_NUMBER + ".");
            var modalInstance = $uibModal.open({
                size: "sm",
                templateUrl: 'dialog/system_error.tpl.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.message = "System Error. Please contact " + CUSTOMER_SUPPORT_PHONE_NUMBER + ".";
                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };
                }
            });
        });
    })

    .factory("httpInterceptor", ['$q', '$injector', function ($q, $injector) {
        return {
            'request': function (config) {
                // console.log(config);
                var accessToken = sessionStorage.getItem("access_token");
                if (accessToken != null) {
                    config.headers["Authorization"] = "Bearer " + accessToken;
                }

                return config;
            },
            'response': function (response) {
                return response;
            },
            responseError: function (response) {
                console.log(response);
                if (response.status === 401) {
                    $injector.get('$state').go('login');
                }
                return $q.reject(response);
            }

        };
    }])

    .directive('backgroundImage', function () {
        return {
            link: function (scope, element, attrs) {
                attrs.$observe('backgroundImage', function (value) {
                    element.css({
                        'background-image': 'url(' + value + ')'
                    });
                });
            }
        };
    })

    .service('WhereToService', function ($http, $state, $cookies) {

        this.whereTo = function () {
            if (sessionStorage.getItem("viewList") === null) {
                getPostLoginSteps(sessionStorage.getItem("username")).then(function (response) {
                    var viewList = response.data.data.viewList;
                    saveToSessionStorage(viewList);
                    goToNextView(viewList);
                });
            }
            else {
                goToNextView(sessionStorage.getItem("viewList"));
            }
        };

        var getPostLoginSteps = function (username) {
            return $http.get(Routes.buildURL(
                Routes.getPostLoginSteps,
                {"username": username}
            ));
        };


        var goToNextView = function (viewList) {

            var stateToNavigateTo = "";

            switch (viewList[0]) {
                case 'SELECT_CUSTOMER':
                    stateToNavigateTo = "allAccess.step1";
                    break;
                case 'NO_ELIGIBLE_CUSTOMER':
                    stateToNavigateTo = "ErrorsNoCustomerMatchError";
                    break;
                case 'GET_PATIENT_MOBILE_PHONE':
                    stateToNavigateTo = "phoneDetails";
                    break;
                case 'UPDATE_PATIENT_PROFILE':
                    stateToNavigateTo = "updatePatient.profile";
                    break;
                case 'PATIENT_HOME':
                    return navigateToLegacyAppHomePage();
                case 'WHERE_TO_SERVICE':
                    getPostLoginSteps();
                    whereTo();
                    break;
                default:
                    sessionStorage.removeItem("viewList");
                    break;
            }

            if (viewList.length != 1) {
                viewList = viewList.slice(1);
                saveToSessionStorage(viewList);
            }

            $state.go(stateToNavigateTo);

        };

        var navigateToLegacyAppHomePage = function () {
            var url_base_path = location.origin + location.pathname;
            var url_hash = "#/dashboard/profile/accountInformation";
            if (sessionStorage.getItem("access_token") !== null) {
                $cookies.put("Authorization", sessionStorage.getItem("access_token"), {
                    path: "/"
                });
            } else {
                $state.go("login");
            }

            $cookies.put("return_base_path", url_base_path, {
                path: "/"
            });
            $cookies.put("return_hash", url_hash, {
                path: "/"
            });

            window.location.href = Routes.buildURL(Routes.elliHealthPatientDashboard, {
                username: sessionStorage.getItem("username")
            });
        };

    });
