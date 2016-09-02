/**
 * Created by chakri.vadde on 5/2/2016.
 */
angular.module('Intellivisit.patient.postLogin.phoneDetails')
    .controller('PostLogin.PhoneDetailsCtrl', function phoneDetails($scope, $location, $state, WhereToService, $cookies, PhoneDetailsService) {
        $scope.PHONE_DETAILS_ERROR_MESSAGES = PHONE_DETAILS_ERROR_MESSAGES;

        $scope.savePhoneDetails = function () {
            if ($scope.phoneDetailsForm.$invalid || $scope.phoneType === undefined) {
                touchAllFields($scope.phoneDetailsForm);
                $scope.phoneDetailsForm.phoneType.$setTouched();
                return;
            }
            PhoneDetailsService.getVerificationCode($scope.mobilePhone, $scope.phoneType).then(function (response) {
                    sessionStorage.setItem("mobilePhone", $scope.mobilePhone);
                    if ($scope.phoneType === "Home Phone") {
                        WhereToService.whereTo();
                    } else {
                        $state.go("phoneVerification");
                    }
                },
                function (response) {
                    $scope.getValidationCodeFailed = true;
                });
        };
    })
    .controller('PostLogin.PhoneVerificationCtrl', function phoneDetails($scope, $state, WhereToService, PhoneDetailsService) {
        $scope.PHONE_DETAILS_ERROR_MESSAGES = PHONE_DETAILS_ERROR_MESSAGES;
        $scope.mobilePhone = sessionStorage.getItem("mobilePhone");

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
    });



