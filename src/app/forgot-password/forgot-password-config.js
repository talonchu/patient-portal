angular.module('Intellivisit.patient.forgotPassword')

    .config(function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('forgotPassword', {
            abstract: true,
            url: '/forgot-password',
            views: {
                "header": {
                    template: '<div ui-view="header"></div>'
                },
                "content": {
                    template: '<div ui-view="content" ng-class="contentContainer"></div>'
                }
            },
            data: {
                bodyClass: "forgot-password-body",
                requiredBackground: true
            }
        }).state("forgotPassword.step1", {
            url: '/step1',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step1Controller',
                    templateUrl: 'forgot-password/forgot.password.step1.tpl.html'
                }
            },
            data: {
                pageTitle: 'Forgot Password - Step 1'
            }
        }).state("forgotPassword.step2", {
            url: '/step2',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step2Controller',
                    templateUrl: 'forgot-password/forgot.password.step2.tpl.html'
                }
            },
            data: {
                pageTitle: 'Forgot Password - Step 2'
            }
        }).state("forgotPassword.step3", {
            url: '/step3',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step3Controller',
                    templateUrl: 'forgot-password/forgot.password.step3.tpl.html'
                }
            },
            data: {
                pageTitle: 'Forgot Password - Step 3'
            }
        }).state("forgotPassword.step4", {
            url: '/step4',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step4Controller',
                    templateUrl: 'forgot-password/forgot.password.step4.tpl.html'
                }
            },
            data: {
                pageTitle: 'Forgot Password - Step 4'
            }
        }).state("forgotPassword.step5", {
            url: '/step5',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step5Controller',
                    templateUrl: 'forgot-password/forgot.password.step5.tpl.html'
                }
            },
            data: {
                pageTitle: 'Forgot Password - Step 5'
            }
        }).state("forgotPassword.step6", {
            url: '/step6',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step6Controller',
                    templateUrl: 'forgot-password/forgot.password.step6.tpl.html'
                }
            },
            data: {
                pageTitle: 'Enter New Password'
            }
        }).state("forgotPassword.step7", {
            url: '/step7',
            views: {
                'header': {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                content: {
                    controller: 'ForgotPassword.Step7Controller',
                    templateUrl: 'forgot-password/forgot.password.step7.tpl.html'
                }
            },
            data: {
                pageTitle: 'Success'
            }
        });
    });
