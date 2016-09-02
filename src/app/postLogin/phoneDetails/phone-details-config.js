angular.module('Intellivisit.patient.postLogin.phoneDetails').config(function config($stateProvider) {
    $stateProvider
        .state('phoneDetails', {
            url: '/post-login/phone-details',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                "content": {
                    controller: 'PostLogin.PhoneDetailsCtrl',
                    templateUrl: 'postLogin/phoneDetails/phoneDetails.tpl.html'
                }
            },
            data: {
                requiredBackground: true,
                pageTitle: 'Update Phone Details'
            }
        })
        .state('phoneVerification', {
            url: '/post-login/mobile-verification',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                "content": {
                    controller: 'PostLogin.PhoneVerificationCtrl',
                    templateUrl: 'postLogin/phoneDetails/phoneVerification.tpl.html'
                }
            },
            data: {
                requiredBackground: true,
                pageTitle: 'Update Phone Details'
            }
        });
});