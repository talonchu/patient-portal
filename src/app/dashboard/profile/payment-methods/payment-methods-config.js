angular.module('Intellivisit.patient.dashboard.profile.paymentMethods')
    .config(function config($stateProvider) {
        $stateProvider
            .state('dashboard.profile.paymentMethods', {
                url: '/paymentMethods',
                template: '<ui-view></ui-view>'
            }).state('dashboard.profile.paymentMethods.list', {
            url: '/list',
            controller: 'Dashboard.Profile.PaymentMethods.ListCtrl',
            templateUrl: 'dashboard/profile/payment-methods/paymentMethods-list.tpl.html',
            data: {
                pageTitle: 'Payment Methods'
            },
            resolve: {
                cards: function (PaymentMethodsService, $q) {
                    return PaymentMethodsService.getCardsForCurrentUser().then(
                        function (response) {
                            return response;
                        },
                        function (response) {
                            return $q.resolve(response);
                        });
                }
            },
            params: {
                currentAlert: undefined
            }
        }).state('dashboard.profile.paymentMethods.add', {
            url: '/add',
            controller: 'Dashboard.Profile.PaymentMethods.AddCtrl',
            templateUrl: 'dashboard/profile/payment-methods/paymentMethods-add.tpl.html',
            data: {
                pageTitle: 'Add a Payment Method'
            },
            resolve: {
                userInformation: function (ProfileService) {
                    return ProfileService.getUserInformation();
                }
            }
        }).state('dashboard.profile.paymentMethods.edit', {
            url: '/edit',
            controller: 'Dashboard.Profile.PaymentMethods.EditCtrl',
            templateUrl: 'dashboard/profile/payment-methods/paymentMethods-edit.tpl.html',
            data: {
                pageTitle: 'Edit Payment Method'
            },
            resolve: {
                userInformation: function (ProfileService) {
                    return ProfileService.getUserInformation();
                }
            },
            params: {
                card: undefined
            }
        });
    });