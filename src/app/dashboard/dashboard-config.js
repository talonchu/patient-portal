angular.module('Intellivisit.patient.dashboard').config(function config($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        views: {
            "header": {
                controller: 'Dashboard.HeaderCtrl',
                templateUrl: 'dashboard/header.dashboard.tpl.html'
            },
            "content": {
                controller: 'Dashboard.DashboardCtrl',
                templateUrl: 'dashboard/dashboard.tpl.html'
            }
        },

        data: {
            requiredBackground: true,
            pageTitle: 'Dashboard'
        }
    });
});
