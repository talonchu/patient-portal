angular.module('Intellivisit.patient.forgotPassword')

    .controller('ForgotPassword.Step1Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        var redirectStepNumber = checkStep(1);
        $scope.getQuestions = function () {

            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }

            $scope.userFound = true;
            $scope.questionKeyFound = true;
            $scope.questionFound = true;

            var formParams = {};
            formParams.userName = $scope.userName;
            $log.debug(formParams);

            ForgotPasswordService.getAllQuestions($scope.userName).then(function (response) {
                    $scope.questions = response.data.data;
                    formParams.questionKey1 = $scope.questions[0].questionKey;
                    formParams.question1 = $scope.questions[0].question;
                    formParams.questionKey2 = $scope.questions[1].questionKey;
                    formParams.question2 = $scope.questions[1].question;
                    saveToSessionStorage(formParams);
                    sessionStorage.setItem("stepCount", 2);
                    $state.go("forgotPassword.step2");
                },
                function (error) {

                    console.dir(error);
                    console.dir(error.data.messageList[0].content);

                    if (error.status == "404") {
                        console.dir("Error Message : " + error.statusText);

                        if (error.data.messageList[0].content.match("(Resource not found) *")) {
                            $scope.oldUserName = $scope.userName;
                            $scope.userFound = false;
                        }
                        else if (error.data.messageList[0].content.match("(Question key) *")) {
                            $scope.oldUserName = $scope.userName;
                            $scope.questionKeyFound = false;
                        }
                        else if (error.data.messageList[0].content.match("(Question fetch failure) *")) {
                            $scope.oldUserName = $scope.userName;
                            $scope.questionFound = false;
                        }
                    }
                }
            );
        };


    })
    .controller('ForgotPassword.Step2Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;


        var redirectStepNumber = checkStep(2);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.question1 = sessionStorage.getItem("question1");
        $scope.question2 = sessionStorage.getItem("question2");

        $scope.validateAnswer = function () {

            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }

            var formParams = {};
            formParams.answer1 = $scope.passwordAnswer1;
            $log.debug(formParams);

            ForgotPasswordService.validateAnswer($scope.passwordAnswer1).then(function (response) {
                    $scope.validAnswer = response.data.data;
                    formParams.question2 = $scope.question2;
                    saveToSessionStorage(formParams);
                    sessionStorage.setItem("stepCount", 3);
                    console.log(sessionStorage.getItem("question1Valid"));
                    $state.go("forgotPassword.step3");
                },
                function (error) {
                    if (error.status == "409") {
                        $scope.oldPasswordAnswer1 = $scope.passwordAnswer1;
                        console.log("The request failed: " + error);
                        $scope.answer1Valid = false;
                    }
                }
            );
        };


    })
    .controller('ForgotPassword.Step3Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        var redirectStepNumber = checkStep(3);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.question2 = sessionStorage.getItem("question2");
        $scope.validateBothAnswers = function () {

            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }

            var formParams = {};
            formParams.mode = [];
            formParams.answer2 = $scope.answer2;
            $log.debug(formParams);

            $scope.getPasswordResetCode = function () {
                $scope.isModeValid = true;
                if ($scope.communicationMode === undefined) {
                    $scope.isModeValid = false;
                }
                else {
                    ForgotPasswordService.getPasswordResetCode($scope.communicationMode, $scope.communicationValue).then(function (response) {
                            sessionStorage.setItem("stepCount", 5);
                            sessionStorage.setItem("skippedStep4", true);
                            $state.go("forgotPassword.step5");
                        },
                        function (error) {
                            console.log("The request failed: " + error);
                        }
                    );
                }
            };

            ForgotPasswordService.validateBothAnswers($scope.answer2).then(function (response) {
                    $scope.communication = response.data.data;
                    formParams.mode[0] = $scope.communication[0].mode;
                    formParams.noOfEmails = $scope.communication[0].value.length;
                    formParams.emails = [];
                    for (var i = 0; i < formParams.noOfEmails; i++) {
                        formParams.emails[i] = $scope.communication[0].value[i];
                    }

                    formParams.mode[1] = $scope.communication[1].mode;
                    formParams.noOfPhones = $scope.communication[1].value.length;
                    formParams.phoneNumbers = [];
                    formParams.phoneNumber = $scope.communication[1].value[0];


                    formParams.question2 = $scope.question2;
                    saveToSessionStorage(formParams);
                    sessionStorage.setItem("stepCount", 4);
                    if ((formParams.noOfPhones === 0 || !$scope.communication[1].isMobileVerified) && formParams.noOfEmails !== 0) {
                        $scope.communicationMode = "Email";
                        $scope.communicationValue = formParams.emails[0];
                        sessionStorage.setItem('communicationMode', $scope.communicationMode);
                        sessionStorage.setItem('communicationValue', $scope.communicationValue);
                        sessionStorage.setItem('maskedCommunicationValue', emailMask(formParams.emails)[0]);
                        $scope.getPasswordResetCode();
                    }
                    else if (formParams.noOfPhones !== 0 && formParams.noOfEmails === 0) {
                        $scope.communicationMode = "Sms";
                        $scope.communicationValue = formParams.phoneNumber;
                        sessionStorage.setItem('communicationMode', $scope.communicationMode);
                        sessionStorage.setItem('communicationValue', $scope.communicationValue);
                        sessionStorage.setItem('maskedCommunicationValue', phoneMask(formParams.phoneNumber));
                        $scope.getPasswordResetCode();
                    }
                    else {
                        $state.go("forgotPassword.step4");
                    }
                },
                function (error) {
                    if (error.status == "409") {
                        $scope.oldAnswer2 = $scope.answer2;
                        console.log("The request failed: " + error);
                        $scope.answer2Valid = false;
                    }
                }
            );
        };
    })
    .controller('ForgotPassword.Step4Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        var redirectStepNumber = checkStep(4);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.noOfPhones = sessionStorage.getItem("noOfPhones");
        $scope.noOfEmails = sessionStorage.getItem("noOfEmails");

        var retrievedEmails = sessionStorage.getItem("emails");
        var retrievedPhoneNumber = sessionStorage.getItem("phoneNumber");

        $scope.emails = retrievedEmails.split(",");


        $scope.maskedEmails = emailMask($scope.emails);
        $scope.maskedPhoneNumber = phoneMask(retrievedPhoneNumber);

        $scope.setCommunicationDetails = function (mode, index) {
            console.log("Index : " + index);
            $scope.communicationMode = mode;
            if (mode == "Email") {
                $scope.communicationValue = $scope.emails[index];
                sessionStorage.setItem('maskedCommunicationValue', $scope.maskedEmails[index]);
            }
            else if (mode == "Sms") {
                $scope.communicationValue = retrievedPhoneNumber;
                sessionStorage.setItem('maskedCommunicationValue', $scope.maskedPhoneNumber);
            }

            console.log("In the method to set communication value : " + $scope.communicationValue);
            sessionStorage.setItem('communicationMode', $scope.communicationMode);
            sessionStorage.setItem('communicationValue', $scope.communicationValue);
        };

        $scope.getPasswordResetCode = function () {
            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }
            $scope.isModeValid = true;

            if ($scope.communicationMode === undefined) {
                $scope.isModeValid = false;
            }
            else {
                ForgotPasswordService.getPasswordResetCode($scope.communicationMode, $scope.communicationValue).then(function (response) {
                        sessionStorage.setItem("stepCount", 5);
                        $state.go("forgotPassword.step5");
                    },
                    function (error) {
                        console.log("The request failed: " + error);
                    }
                );
            }
        };
    })
    .controller('ForgotPassword.Step5Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.CUSTOMER_SUPPORT_PHONE_NUMBER = CUSTOMER_SUPPORT_PHONE_NUMBER;
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        
        var redirectStepNumber = checkStep(5);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.communicationMode = sessionStorage.getItem('communicationMode');
        $scope.communicationValue = sessionStorage.getItem('communicationValue');
        $scope.maskedCommunicationValue = sessionStorage.getItem('maskedCommunicationValue');
        var formParams = {};

        $scope.getPasswordResetCode = function () {
            $scope.isModeValid = true;
            if ($scope.communicationMode === undefined) {
                $scope.isModeValid = false;
            }
            else {
                ForgotPasswordService.getPasswordResetCode($scope.communicationMode, $scope.communicationValue).then(function (response) {
                        sessionStorage.setItem("stepCount", 5);
                        $state.go("forgotPassword.step5");
                    },
                    function (error) {
                        console.log("The request failed: " + error);
                    }
                );
            }
        };

        $scope.validateIdentificationCode = function () {
            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }
            $scope.identificationCodeValid = true;
            $scope.identificationCodeExpired = true;
            $scope.sessionValid = true;
            $scope.isUserInputValid = true;

            if ($scope.identificationCode === undefined) {
                $scope.isUserInputValid = false;
            }
            else {
                ForgotPasswordService.validateIdentificationCode($scope.identificationCode).then(function (response) {
                        formParams.identificationCode = $scope.identificationCode;
                        saveToSessionStorage(formParams);
                        sessionStorage.setItem("stepCount", 6);
                        $state.go("forgotPassword.step6");
                    },
                    function (error) {
                        if (error.status == "409") {
                            if (error.data.messageList[0].content.match("(Incorrect) *")) {
                                $scope.oldIdentificationCode = $scope.identificationCode;
                                $scope.identificationCodeValid = false;
                            }
                            else if (error.data.messageList[0].content.match("(Expired) *")) {
                                $scope.oldIdentificationCode = $scope.identificationCode;
                                $scope.identificationCodeExpired = false;
                            }

                        }
                    });
            }
        };

        $scope.chooseNewDeliveryOption = function () {
            if (sessionStorage.getItem("skippedStep4") === 'true') {
                $scope.getPasswordResetCode();
                $scope.currentAlert = initAlertMessage("success", IDENTIFICATION_CODE_SENT_SUCCESS);
                $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
            }
            else {
                $state.go("forgotPassword.step4");
            }
        };
    })
    .controller('ForgotPassword.Step6Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        var redirectStepNumber = checkStep(6);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.FORGOT_PASSWORD_ERROR_MESSAGES = FORGOT_PASSWORD_ERROR_MESSAGES;

        // init variable for control css and show/hide.
        $scope.pwdValidLength = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasUpperCase = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasNumber = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.changePassword = function () {
            if ($scope.forgotPasswordForm.$invalid) {
                touchAllFields($scope.forgotPasswordForm);
                return;
            }

            ForgotPasswordService.changePassword($scope.password).then(function (response) {
                    sessionStorage.setItem('stepCount', 7);
                    $state.go("forgotPassword.step7");
                },
                function (error) {
                    console.log("Authorization Failed (Incorrect Identification Code: " + error);
                });
        };

    })
    .controller('ForgotPassword.Step7Controller', function ($scope, $http, ForgotPasswordService, $log, $state, $parse) {
        $scope.PASSWORD_VALIDATION_RULES = PASSWORD_VALIDATION_RULES;
        var redirectStepNumber = checkStep(7);
        if (redirectStepNumber >= 0) {
            $state.go("forgotPassword.step" + redirectStepNumber);
        }

        $scope.goToLoginPage = function () {
            $state.go("login");
        };

    });

var emailMask = function (emails) {

    var maskedEmails = [];
    var maskedEmail = '';

    for (var i = 0; i < emails.length; i++) {
        var tempEmail = emails[i];
        var split = tempEmail.split('@');
        var userIdArray = split[0].split('');
        for (var j = 0; j < userIdArray.length; j++) {
            if (j < 2 || j > (userIdArray.length - 3)) {
                maskedEmail = maskedEmail + userIdArray[j];
            }
            else {
                maskedEmail = maskedEmail + "*";
            }
        }
        maskedEmail = maskedEmail + "@" + split[1];
        maskedEmails[i] = maskedEmail;
        maskedEmail = '';
    }
    return maskedEmails;
};

var phoneMask = function (phoneNumber) {
    var maskedPhoneNumber = '';

    var phoneNumberArray = phoneNumber.split('');
    for (var j = 0; j < phoneNumberArray.length; j++) {
        if (j > (phoneNumberArray.length - 5)) {
            maskedPhoneNumber = maskedPhoneNumber + phoneNumberArray[j];
        }
        else {
            maskedPhoneNumber = maskedPhoneNumber + "*";
        }
    }

    return maskedPhoneNumber;
};

var checkStep = function (stepCount) {

    var sessionStorageStepValue = sessionStorage.getItem('stepCount');

    if (sessionStorageStepValue == null) {
        return 1;
    }
    else if (sessionStorageStepValue > stepCount) {
        sessionStorage.setItem('stepCount', stepCount);
        return stepCount;
    }
    else if (sessionStorageStepValue == null || sessionStorageStepValue < stepCount) {
        return sessionStorageStepValue;
    }
    return -1;
};






