angular.module('Intellivisit.patient.dashboard.profile').config(function config($stateProvider) {
    $stateProvider.state('dashboard.profile', {
        url: '/profile',
        template: '<ui-view></ui-view>',
        data: {
            requiredBackground: true,
            pageTitle: 'Profile'
        }
    }).state('dashboard.profile.accountInformation', {
        url: '/accountInformation',
        controller: 'Dashboard.Profile.AccountInformationCtrl',
        templateUrl: 'dashboard/profile/account-information/accountInformation.tpl.html',
        data: {
            pageTitle: 'Account Information'
        },
        resolve: {
            userInformation: function (ProfileService, $q) {
                return ProfileService.getUserInformation();
            }
        }
    }).state('dashboard.profile.primaryProfile', {
        url: '/primaryProfile',
        controller: 'Dashboard.Profile.PrimaryProfileCtrl',
        templateUrl: 'dashboard/profile/primary-profile/primaryProfile.tpl.html',
        data: {
            pageTitle: 'About Me'
        },
        resolve: {
            userInfomation: function (ProfileService, $q) {
                return ProfileService.getUserInformation();
            }
        }
    }).state('dashboard.profile.security', {
        url: '/security',
        controller: 'Dashboard.Profile.SecurityCtrl',
        templateUrl: 'dashboard/profile/security/security.tpl.html',
        data: {
            pageTitle: 'Security'
        },
        resolve: {
            userInfomation: function (ProfileService, $q) {
                return ProfileService.getUserInformation();
            },
            questionSet1: function (RegisterService) {
                return RegisterService.loadQuestionSet(1);
            },
            questionSet2: function (RegisterService) {
                return RegisterService.loadQuestionSet(2);
            }
        }
    }).state('dashboard.profile.passwordManagement', {
        url: '/passwordManagement',
        controller: 'Dashboard.Profile.PasswordManagementCtrl',
        templateUrl: 'dashboard/profile/password-management/passwordManagement.tpl.html',
        data: {
            pageTitle: 'Password Management'
        }
    });
});
