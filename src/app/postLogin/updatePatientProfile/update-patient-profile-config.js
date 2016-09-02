angular.module('Intellivisit.patient.postLogin.updatePatientProfile').config(function config($stateProvider) {
    $stateProvider
        .state('updatePatient', {
            url: '/post-login/update-patient',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                "content": {
                    templateUrl: 'postLogin/updatePatientProfile/updatePatientProfile.tpl.html'
                }
            }
        })
        .state('updatePatient.profile', {
            url: '/profile',
            views: {
                "accountProfileSection": {
                    controller: 'Dashboard.Profile.AccountInformationCtrl',
                    templateUrl: 'dashboard/profile/account-information/accountInformation.tpl.html'
                }
            },
            data: {
                requiredBackground: true,
                pageTitle: 'Update Profile'
            },
            params: {
                fromState: 'updatePatient.profile'
            },
            resolve: {
                userInformation: function (ProfileService, $q) {
                    return ProfileService.getUserInformation();
                }
            }
        });
});