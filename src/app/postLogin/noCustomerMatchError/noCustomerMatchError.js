angular.module('Intellivisit.patient.postLogin.noCustomerMatch').config(function config($stateProvider) {
    $stateProvider.state('ErrorsNoCustomerMatchError', {
        url: '/postLogin/no-customer-match-error',
        views: {
            "header": {
                templateUrl: 'layout/header-no-function.tpl.html'
            },
            "content": {
                controller: 'PostLogin.NoCustomerMatchErrorCtrl',
                templateUrl: 'postLogin/noCustomerMatchError/noCustomerMatchError.tpl.html'
            }
        },
        data: {
            requiredBackground: true,
            pageTitle: 'No Providers Available'
        }
    });
}).controller('PostLogin.NoCustomerMatchErrorCtrl', function NoCustomerMatchErrorCtrl($scope) {
    $scope.phoneNumber = CUSTOMER_SUPPORT_PHONE_NUMBER;
});