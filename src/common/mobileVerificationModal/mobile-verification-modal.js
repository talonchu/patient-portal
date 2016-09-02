/**
 * Created by chakri.vadde on 6/1/2016.
 */

angular.module('Intellivisit.patient.common.mobileVerification')
    .controller('MobileVerificationModalCtrl', function ($uibModalInstance, $scope) {

        $scope.close = function () {
            $uibModalInstance.close();
        };

    })
    .controller('MobileVerificationCtrl', function MobileVerificationCtrl($scope, $state, WhereToService, MobileVerificationService) {
        $scope.PHONE_DETAILS_ERROR_MESSAGES = PHONE_DETAILS_ERROR_MESSAGES;
        $scope.mobilePhone = sessionStorage.getItem("mobilePhone");

        $scope.CONTACT_ERROR_MESSAGES = CONTACT_ERROR_MESSAGES;

        $scope.fromState = sessionStorage.getItem("fromState");
        sessionStorage.removeItem("fromState");
        $scope.isModal = $scope.fromState !== null;

        $scope.verifyPhone = function () {
            if ($scope.phoneDetailsForm.$invalid) {
                touchAllFields($scope.phoneDetailsForm);
                return;
            }

            $scope.isVerificationCodeValid = true;
            $scope.sessionValid = true;
            $scope.isUserInputValid = true;

            if ($scope.verificationCode === undefined) {
                $scope.isUserInputValid = false;
            }
            else {
                MobileVerificationService.validateVerificationCode($scope.mobilePhone, $scope.verificationCode, "Mobile Phone").then(function (response) {
                        if ($scope.fromState !== null) {
                            window.location.reload();
                        } else {
                            WhereToService.whereTo();
                        }
                    },
                    function (error) {
                        if (error.data.messageList[0].content.match("(Incorrect) *")) {
                            $scope.oldVerificationCode = $scope.verificationCode;
                            $scope.isVerificationCodeValid = false;
                        }
                    });
            }
        };


        $scope.requestNewCode = function () {
            MobileVerificationService.getVerificationCode($scope.mobilePhone, "Mobile Phone").then(function (response) {
                    $scope.currentAlert = initAlertMessage("success", IDENTIFICATION_CODE_SENT_SUCCESS);
                },
                function () {
                    $scope.currentAlert = initAlertMessage("danger", $scope.CONTACT_ERROR_MESSAGES.PIN_GENERATION_FAILURE);
                });
        };
        
        $scope.whereTo = function () {
            WhereToService.whereTo();
        };

        $scope.goBack = function () {
            if (sessionStorage.getItem("fromState") != null) {
                $state.go(sessionStorage.getItem("fromState"));
            }
            else {
                $state.go('phoneDetails');
            }
        };
    })
    .service('MobileVerificationService', function ($http, $q, $log) {
        "use strict";
        this.validateVerificationCode = function (communicationValue, identificationCode, phoneType) {
            var data = {
                "mode": "SMS",
                "value": [communicationValue],
                "phoneType": phoneType,
                "preferred": "true"
            };

            var URL = Routes.buildURL(Routes.userValidateVerificationCode, {
                username: sessionStorage.getItem('username'),
                identificationCode: identificationCode
            });
            return $http.post(URL, data);
        };

        this.getVerificationCode = function (communicationValue, phoneType) {

            var data = {
                "mode": "SMS",
                "phoneType": phoneType,
                "value": [communicationValue],
                "preferred": "true"
            };


            var URL = Routes.buildURL(Routes.userGetVerificationCode, {username: sessionStorage.getItem('username')});
            return $http.post(URL, data);

        };
    })
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function (inputValue) {

                    var transformedInput = inputValue.toLowerCase().replace(/[^0-9] /g, '');

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });
