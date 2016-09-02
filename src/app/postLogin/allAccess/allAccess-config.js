angular.module('Intellivisit.patient.postLogin.allAccess').config(function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('allAccess', {
        url: '/post-login/allAccess',
        views: {
            "header": {
                template: '<div ui-view="header"></div>'
            },
            "content": {
                template: '<div ui-view="content"></div>'
            }
        },
        data: {
            requiredBackground: true,
            bodyClass: "all-access-body"
        },
        resolve: {
            customerList: function(AllAccessService) {
                return AllAccessService.getEligibleCustomers(true).then(function (response) {
                    var customerList = response.data.data;
                    angular.forEach(customerList, function (customer) {
                        AllAccessService.getCustomerLogo(customer.customerId).then(function (response) {
                            customer.customerLogoUrl = response.data;
                        });
                    });
                    return customerList;
                });
            }
        }
    }).state('allAccess.step1', {
        url: '/step1',
        views: {
            "header": {
                templateUrl: 'layout/header-no-function.tpl.html'
            },
            "content": {
                controller: 'AllAccess.Step1Controller',
                templateUrl: 'postLogin/allAccess/allAccess_step1.tpl.html'
            }
        },
        data: {
            pageTitle: 'Select Provider Network - Introduction'
        }
    }).state('allAccess.step2', {
        url: '/step2',
        views: {
            "header": {
                templateUrl: 'layout/header-no-function.tpl.html'
            },
            "content": {
                controller: 'AllAccess.Step2Controller',
                templateUrl: 'postLogin/allAccess/allAccess_step2.tpl.html'
            }
        },
        data: {
            pageTitle: 'Select Provider Network - Recommendations'
        }
    }).state('allAccess.stepMore', {
        url: '/stepMore',
        views: {
            "header": {
                templateUrl: 'layout/header-no-function.tpl.html'
            },
            "content": {
                controller: 'AllAccess.StepMoreController',
                templateUrl: 'postLogin/allAccess/allAccess_step_more.tpl.html'
            }
        },
        data: {
            pageTitle: 'Select Provider Network - Your Options'
        }
    }).state('allAccess.stepConfirm', {
        url: '/stepConfirm',
        views: {
            "header": {
                templateUrl: 'layout/header-no-function.tpl.html'
            },
            "content": {
                controller: 'AllAccess.StepConfirmController',
                templateUrl: 'postLogin/allAccess/allAccess_step_confirm.tpl.html'
            }
        },
        data: {
            pageTitle: 'Select Provider Network - Confirmation'
        }
    });
});