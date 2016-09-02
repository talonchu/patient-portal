angular.module('Intellivisit.patient.dashboard.profile.contactPreferences')

    .controller('Dashboard.Profile.ContactPreferences.ContactPreferencesCtrl', function DashboardCtrl($scope, $http, $state, ContactPreferencesService, contactPreferences, $uibModal, $log, $stateParams) {
        $scope.CONTACT_ERROR_MESSAGES = CONTACT_ERROR_MESSAGES;

        sessionStorage.removeItem("fromState");

        $scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavContactPreferences');

        // Check if there's alert to be shown
        if ($stateParams.currentAlert !== undefined) {
            $scope.currentAlert = $stateParams.currentAlert;
        }

        $scope.notification = {
            emailNotification: true,
            textNotification: false
        };

        $scope.commPreferenceEmail = sessionStorage.getItem("username");

        if (contactPreferences) {
            var commPreference = contactPreferences.data.data;
            $scope.commPreferencePhoneNumber = commPreference.phoneNumber === null ? "" : commPreference.phoneNumber;
            sessionStorage.setItem("landline", commPreference.landline);
            $scope.isMobileVerified = commPreference.isMobileVerified === null ? false : commPreference.isMobileVerified;

            if (commPreference.mode === "Email") {
                $scope.notification.emailNotification = true;
                $scope.notification.textNotification = false;
            } else if (commPreference.mode === "Sms") {
                $scope.notification.emailNotification = false;
                $scope.notification.textNotification = true;
            } else if (commPreference.mode === "Both") {
                $scope.notification.emailNotification = true;
                if (commPreference.isMobileVerified !== false && commPreference.phoneNumber !== null && commPreference.phoneNumber !== "") {
                    $scope.notification.textNotification = true;
                }
            }
            if (commPreference.phoneNumber !== null && commPreference.phoneNumber !== "") {
                sessionStorage.setItem("mobilePhone", commPreference.phoneNumber);
            }
        }

        var formParams = {};

        $scope.savePreferences = function () {
            $scope.currentAlert = undefined;

            $scope.isSaving = true;

            formParams.username = sessionStorage.getItem("username");
            if ($scope.notification.emailNotification === true && $scope.notification.textNotification === true) {
                formParams.mode = "Both";
            } else if ($scope.notification.emailNotification === true && $scope.notification.textNotification === false) {
                formParams.mode = "Email";
            } else if ($scope.notification.emailNotification === false && $scope.notification.textNotification === true) {
                formParams.mode = "Sms";
            }
            else {
                $scope.currentAlert = initAlertMessage("danger", $scope.CONTACT_ERROR_MESSAGES.REQUIRED_CONTACT_METHOD);
                $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
                return;
            }
            formParams.email = sessionStorage.getItem("username");

            formParams.phoneNumber = $scope.commPreferencePhoneNumber;

            saveToSessionStorage(formParams);

            ContactPreferencesService.setContactPreference(function () {
                $scope.currentAlert = initAlertMessage("success", CONTACT_UPDATE_SUCCESSFUL);
                $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
            }, function (response) {
                $scope.currentAlert = initAlertMessage("danger", SYSTEM_UPDATE_ERROR);
                $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
            });
        };


        $scope.open = function () {

            ContactPreferencesService.getVerificationCode($scope.commPreferencePhoneNumber, "Mobile Phone").then(function (response) {
                    var formParams = {};
                    formParams.mobilePhone = $scope.commPreferencePhoneNumber;
                    sessionStorage.setItem("fromState", "dashboard.profile.contactPreferences.home");
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


    });

