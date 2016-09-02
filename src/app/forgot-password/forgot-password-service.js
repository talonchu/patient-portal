angular.module('Intellivisit.patient.forgotPassword')

    .service('ForgotPasswordService', ['$http', function ($http) {


        this.getAllQuestions = function (username) {

            var URL = Routes.buildURL(Routes.forgotPassword, {username: username});
            return $http.get(URL);

        };

        this.validateAnswer = function (passwordAnswer1) {

            var data = [
                {
                    "questionKey": sessionStorage.getItem("questionKey1"),
                    "question": sessionStorage.getItem("question1"),
                    "answer": passwordAnswer1
                }
            ];

            var URL = Routes.buildURL(Routes.forgotPasswordValidateQuestion, {username: sessionStorage.getItem('userName')});

            return $http.post(URL, data);
        };

        this.validateBothAnswers = function (answer2) {

            var data = [
                {
                    "questionKey": sessionStorage.getItem("questionKey1"),
                    "question": sessionStorage.getItem("question1"),
                    "answer": sessionStorage.getItem("answer1")
                },
                {
                    "questionKey": sessionStorage.getItem("questionKey2"),
                    "question": sessionStorage.getItem("question2"),
                    "answer": answer2
                }
            ];

            var URL = Routes.buildURL(Routes.forgotPasswordCommunicationPreferences, {username: sessionStorage.getItem('userName')});
            return $http.post(URL, data);
        };

        this.getPasswordResetCode = function (communicationMode, communicationValue) {

            console.log(" In FPService : " + communicationMode + " ----- Mail : " + communicationValue);

            // var caseCommunicationMode = communicationMode.toUpperCase();

            var data = {
                "userQADtoList": [{
                    "questionKey": sessionStorage.getItem("questionKey1"),
                    "question": sessionStorage.getItem("question1"),
                    "answer": sessionStorage.getItem("answer1")
                }, {
                    "questionKey": sessionStorage.getItem("questionKey2"),
                    "question": sessionStorage.getItem("question2"),
                    "answer": sessionStorage.getItem("answer2")
                }],
                "communicationModeDto": {
                    "mode": communicationMode.toUpperCase(),
                    "value": [communicationValue],
                    "preferred": "true"
                }
            };


            var URL = Routes.buildURL(Routes.forgotPassword, {username: sessionStorage.getItem('userName')});
            return $http.post(URL, data);

        };

        this.validateIdentificationCode = function (identificationCode) {
            var data = {
                "mode": sessionStorage.getItem('communicationMode').toUpperCase(),
                "value": [sessionStorage.getItem('communicationValue')],
                "preferred": "true"
            };

            var URL = Routes.buildURL(Routes.forgotPasswordValidateIdentificationCode, {
                username: sessionStorage.getItem('userName'),
                identificationCode: identificationCode
            });
            return $http.post(URL, data);
        };

        this.changePassword = function (password) {

            var URL = Routes.buildURL(Routes.forgotPasswordChangePassword, {
                username: sessionStorage.getItem('userName'),
                identificationCode: sessionStorage.getItem("identificationCode")
            });
            return $http.post(URL, password);
        };
    }]);