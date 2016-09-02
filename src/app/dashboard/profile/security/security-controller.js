angular.module('Intellivisit.patient.dashboard.profile.security')

.controller('Dashboard.Profile.SecurityCtrl', function DashboardCtrl($scope, $http, RegisterService, ProfileService, userInfomation, questionSet1, questionSet2, SecurityService) {
	$scope.ALERT_ICONS = ALERT_ICONS;
	$scope.SECURITY_ERROR_MESSAGES = SECURITY_ERROR_MESSAGES;

	$scope.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavSecurity');

	// Resolved dependencies
	$scope.questionSet1 = questionSet1.data.data;
	$scope.questionSet2 = questionSet2.data.data;
	var data = userInfomation.data.data;

	var passwordQuestionKey1 = data.passwordQuestionKey1;
	var passwordQuestionKey2 = data.passwordQuestionKey2;
	var passwordAnswer1 = data.passwordAnswer1;
	var passwordAnswer2 = data.passwordAnswer2;

	var question1Enabled = $scope.questionSet1[passwordQuestionKey1];
	var question2Enabled = $scope.questionSet2[passwordQuestionKey2];

	$scope.question1 = question1Enabled ? passwordQuestionKey1 : "";
	$scope.question2 = question2Enabled ? passwordQuestionKey2 : "";

	$scope.save = function() {
		if ($scope.securityForm.$invalid) {
			touchAllFields($scope.securityForm);
			return;
		}

		var username = sessionStorage.getItem("username");
		var data = {
			"passwordQuestionKey1": $scope.question1,
			"passwordAnswer1": $scope.answer1,
			"passwordQuestionKey2": $scope.question2,
			"passwordAnswer2": $scope.answer2
		};

		$scope.currentAlert = undefined;
		$scope.isSaving = true;

		SecurityService.saveSecurity(username, data).then(function(response) {
			$scope.currentAlert = initAlertMessage("success", GENERAL_UPDATE_SUCCESS);
			$scope.isSaving = false;
		}, function(response) {
			$scope.currentAlert = initAlertMessage("danger", SYSTEM_UPDATE_ERROR);
			$scope.isSaving = false;
		});
	};
});
