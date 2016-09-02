angular.module('Intellivisit.patient.dashboard.profile.accountInformation')

    .controller('Dashboard.Profile.AccountInformationCtrl', function ($scope, $uibModal, $log, $stateParams, ProfileService, WhereToService, userInformation, AccountInformationService) {
        $scope.STATES_IN_USA = STATES_IN_USA;
        $scope.ALERT_ICONS = ALERT_ICONS;
        $scope.ACCOUNT_INFORMATION_ERROR_MESSAGES = ACCOUNT_INFORMATION_ERROR_MESSAGES;

        $scope.fromState = $stateParams.fromState;

        $scope.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavAccountInformation');
        if (userInformation) {
            var data = userInformation.data.data;
            $scope.userId = data.userId;
            $scope.username = data.username;
            $scope.email = data.email;
            $scope.name = data.firstName + " " + data.lastName;
            $scope.firstName = data.firstName;
            $scope.lastName = data.lastName;
            $scope.dob = data.dob;
            $scope.homePhone = data.accountInformation.homePhone;
            $scope.mobilePhone = data.accountInformation.mobilePhone;
            $scope.isMobileVerified = data.accountInformation.isMobileVerified;
            $scope.businessPhone = data.accountInformation.businessPhone;
            $scope.address1 = data.accountInformation.address1;
            $scope.address2 = data.accountInformation.address2;
            $scope.zipCode = data.accountInformation.zipCode;
            $scope.city = data.accountInformation.city;
            $scope.state = data.accountInformation.state;
            $scope.last4Ssn = data.last4Ssn;

            $scope.currentMobilePhone = $scope.mobilePhone;
        } else {
            $log.error("userInformation load fails.");
        }

        $scope.open = function () {

            AccountInformationService.getVerificationCode($scope.mobilePhone, "Mobile Phone").then(function (response) {
                    var formParams = {};
                    formParams.mobilePhone = $scope.mobilePhone;

                    if ($scope.fromState === 'updatePatient.profile') {
                        sessionStorage.setItem("fromState", "updatePatient.profile");
                    } else {
                        sessionStorage.setItem("fromState", "dashboard.profile.accountInformation");
                    }

                    saveToSessionStorage(formParams);
                    var modalInstance = $uibModal.open({
                        templateUrl: 'mobileVerificationModal/mobileVerificationModalTemplate.tpl.html',
                        controller: 'MobileVerificationModalCtrl'
                    });
                },
                function () {
                    $scope.currentAlert = initAlertMessage("error", $scope.CONTACT_ERROR_MESSAGES.PIN_GENERATION_FAILURE);
                });


        };

        $scope.save = function () {
            $scope.currentAlert = undefined;

            if ($scope.accountInformationForm.$invalid) {
                touchAllFields($scope.accountInformationForm);
                return;
            }

            $scope.isMobileVerified = $scope.mobilePhone === $scope.currentMobilePhone ? $scope.isMobileVerified : false;

            var data = {
                "homePhone": $scope.homePhone,
                "mobilePhone": $scope.mobilePhone,
                "businessPhone": $scope.businessPhone,
                "address1": $scope.address1,
                "address2": $scope.address2,
                "city": $scope.city,
                "state": $scope.state,
                "zipCode": $scope.zipCode
            };

            $scope.isSaving = true;

            AccountInformationService.saveAccountInformation($scope.username, data).then(function (response) {

                if ($scope.fromState === 'updatePatient.profile') {
                    WhereToService.whereTo();
                }
                else {
                    $scope.currentAlert = initAlertMessage("success", GENERAL_UPDATE_SUCCESS);
                    $scope.currentMobilePhone = $scope.mobilePhone;
                    $scope.isSaving = false;
                }

            }, function (response) {
                $scope.currentAlert = initAlertMessage("danger", SYSTEM_UPDATE_ERROR);
                $scope.isSaving = false;
            });
        };
    });