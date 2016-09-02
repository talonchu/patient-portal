angular.module('Intellivisit.patient.register')

    .config(function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('register', {
            url: '/register',
            views: {
                "header": {
                    template: '<div ui-view="header"></div>'
                },
                "content": {
                    template: '<div ui-view="content"></div>'
                }
            },
            data: {
                bodyClass: "register-body",
                requiredBackground: true
            }
        }).state("register.step1", {
            url: '/step1',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                "content": {
                    templateUrl: 'register/register_step1.tpl.html',
                    controller: 'Register.Step1Controller'
                }
            },
            data: {
                pageTitle: 'Register - Step 1'
            }
        }).state("register.step2", {
            url: '/step2',
            views: {
                "header": {
                    templateUrl: 'layout/header-no-function.tpl.html'
                },
                "content": {
                    templateUrl: 'register/register_step2.tpl.html',
                    controller: 'Register.Step2Controller'
                }
            },
            data: {
                pageTitle: 'Register - Step 2'
            },
            resolve: {
                questionSet1: function(RegisterService) {
                    return RegisterService.loadQuestionSet(1);
                },
                questionSet2: function(RegisterService) {
                    return RegisterService.loadQuestionSet(2);
                }
            }
        });
    })

;
