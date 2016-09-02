angular.module('Intellivisit.patient.dashboard.profile.contactPreferences').config(function config($stateProvider) {
    $stateProvider.state('dashboard.profile.contactPreferences', {
        url: '/contactPreferences',
        template: '<ui-view></ui-view>'
    }).state('dashboard.profile.contactPreferences.home', {
        url: '/home',
        controller: 'Dashboard.Profile.ContactPreferences.ContactPreferencesCtrl',
        templateUrl: 'dashboard/profile/contact-preferences/contactPreferences.tpl.html',
        data: {
            pageTitle: 'Contact Preferences'
        },
        resolve: {
            contactPreferences: function (ContactPreferencesService, $q) {
                return ContactPreferencesService.getContactPreference();
            }
        },
        params: {
            currentAlert: undefined
        }
    })
        .state('dashboard.profile.contactPreferences.verification', {
            url: '/verification',
            controller: 'PhoneVerificationCtrl',
            templateUrl: 'mobile-verification/phoneDetails.tpl.html',
            data: {
                pageTitle: 'Phone verification'
            },
            params: {
                currentAlert: undefined
            }
        });
});