angular.module('Intellivisit.patient.dashboard.profile.primaryProfile')

.controller('Dashboard.Profile.PrimaryProfileCtrl', function DashboardCtrl($scope, $http, ProfileService, userInfomation, PrimaryProfile) {
	$scope.PRIMARY_PROFILE_ERROR_MESSAGES = PRIMARY_PROFILE_ERROR_MESSAGES;
	$scope.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPrimaryProfile');

	// init dropdown set
	$scope.martialStatusSet = MARTIAL_STATUS_SET;
	$scope.feetSet = FEET_SET;
	$scope.inchesSet = INCHE_SET;
	$scope.genderSet = GENDER_SET;
	$scope.primaryEthnicitySet = ETHNICITY_SET;
	$scope.secondaryEthnicitySet = ETHNICITY_SET;

	// populate form data
	if (userInfomation) {
		var primaryProfile = userInfomation.data.data;
		$scope.fullName = primaryProfile.firstName + " " + primaryProfile.lastName;
		$scope.martialStatus = primaryProfile.primaryProfile.maritalStatus;
		$scope.feet = primaryProfile.primaryProfile.heightFt.toString();
		if ($scope.feet !== "0") {
			$scope.inches = primaryProfile.primaryProfile.heightIn.toString();
		} else {
			$scope.feet = undefined;
			$scope.inches = undefined;
		}
		$scope.weightInLbs = primaryProfile.primaryProfile.weight;
		$scope.gender = primaryProfile.primaryProfile.sex;
		$scope.primaryEthnicity = primaryProfile.primaryProfile.ethnicity1;
		$scope.secondaryEthnicity = primaryProfile.primaryProfile.ethnicity2;
		$scope.primaryCareProvider = primaryProfile.primaryProfile.primaryCareProvider;
	}

	$scope.save = function() {
		$scope.currentAlert = undefined;

		if ($scope.primaryProfileForm.$invalid) {
			touchAllFields($scope.primaryProfileForm);
			return;
		}

		$scope.isSaving = true;

		var formParams = {};

		formParams.username = sessionStorage.getItem("username");
		formParams.maritalStatus = $scope.martialStatus;
		formParams.heightFt = $scope.feet;
		formParams.heightIn = $scope.inches;
		formParams.weight = $scope.weightInLbs;
		formParams.sex = $scope.gender;
		formParams.ethnicity1 = $scope.primaryEthnicity;
		formParams.ethnicity2 = $scope.secondaryEthnicity;
		formParams.primaryCareProvider = $scope.primaryCareProvider;
		

		saveToSessionStorage(formParams);

		PrimaryProfile.setPrimaryProfile(function() {
			$scope.currentAlert = initAlertMessage("success", PRIMARY_PROFILE_UPDATE_SUCCESSFUL);
			$scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
			$scope.isSaving = false;
		}, function(response) {
			$scope.currentAlert = initAlertMessage("danger", SYSTEM_SAVE_ERROR);
			$scope.currentAlert.style = ALERT_ICONS[$scope.currentAlert.type];
			$scope.isSaving = false;
		});
	};

});
