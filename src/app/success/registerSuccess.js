angular.module('Intellivisit.patient.success')

    .config(function config($stateProvider) {
        $stateProvider.state('registerSuccess', {
            url: '/success/registerSuccess',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html' 
                },
                "content": {
                    controller: 'Success.registerSuccessCtrl',
                    templateUrl: 'success/registerSuccess.tpl.html' 
                }
            },
            data: {
                pageTitle: 'Account Created',
                requiredBackground: true
            }
        });
    })

    .controller('Success.registerSuccessCtrl', function registerSuccessCtrl($scope, $state) {
        $scope.goToLogin = function () {
            $state.go("login");
        };
    });
