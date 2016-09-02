angular.module('Intellivisit.patient.dashboard.profile.passwordManagement')

    .controller('Dashboard.Profile.PasswordManagementCtrl', function DashboardCtrl($scope, $http, $log, PasswordManagementService) {
        $scope.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPasswordManagement');

        $scope.PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES;
        $scope.pwdValidLength = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasUpperCase = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasNumber = PASSWORD_INVALID_MESSAGE_STYLE;

        $scope.updatePassword = function () {
            if ($scope.passwordManagementForm.$invalid) {
                touchAllFields($scope.passwordManagementForm);
                return;
            }

            $scope.currentAlert = undefined;
            $scope.isSaving = true;

            var passwordObj = {
                "currentPassword": $scope.currentPassword,
                "newPassword": $scope.password
            };

            PasswordManagementService.updatePassword(passwordObj).then(
                function () {
                    $scope.currentAlert = initAlertMessage("success", PASSWORD_UPDATE_SUCCESSFUL);
                    $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
                    $scope.isSaving = false;
                }, function (response) {
                    if (response.status === 417) {
                        $scope.currentAlert = initAlertMessage("danger", PASSWORD_ERROR_MESSAGES.UPDATE_FAILED);
                    } else {
                        $scope.currentAlert = initAlertMessage("danger", SYSTEM_UPDATE_ERROR);
                    }
                    $scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
                    $scope.isSaving = false;
                });
        };
    });