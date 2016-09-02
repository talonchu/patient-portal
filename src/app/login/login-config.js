angular.module('Intellivisit.patient.login')
    .config(function config($stateProvider) {
        $stateProvider.state('login', {
            url: "/login",
            views: {
                'header': {
                    templateUrl: 'login/login.header.tpl.html'
                },
                'content': {
                    controller: 'Login.LoginCtrl',
                    templateUrl: 'login/login.content.tpl.html'
                },
                'footer': {
                    controller: 'Login.LoginCtrl',
                    templateUrl: 'login/login.footer.tpl.html'
                }
            },
            data: {
                pageTitle: 'Intellivisit',
                requiredBackground: true
            },
            params: {
                currentAlert: undefined
            }
        });
    });