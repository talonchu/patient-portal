angular.module('Intellivisit.patient.register')

    .controller('Register.Step1Controller', function ($scope, $state, $http, $parse, $log, RegisterService) {
        $scope.REGISTER_ERROR_MESSAGES = REGISTER_ERROR_MESSAGES;
        $log.debug("register_step1");
        sessionStorage.clear();
        $scope.genderSet = GENDER_SET;
        
        $scope.ALLOWED_DATE_FORMATS = ALLOWED_DATE_FORMATS;
        $scope.dateOptions = {
            showWeeks: false,
            maxDate: new Date()
        };

        $scope.passwordVisible = false;
        $scope.dobPopOpen = false;

        // init variable for control css and show/hide.
        $scope.pwdValidLength = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasUpperCase = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.pwdHasNumber = PASSWORD_INVALID_MESSAGE_STYLE;
        $scope.goNext = function () {

            if ($scope.regForm.$invalid || $scope.gender === undefined) {
                touchAllFields($scope.regForm);
                $scope.regForm.gender.$setTouched();
                return;
            }

            var formParams = {};
            formParams.step = 1;
            formParams.firstName = $scope.firstName;
            formParams.lastName = $scope.lastName;
            formParams.email = $scope.email;
            formParams.currentState = $scope.currentState;
            formParams.password = $scope.password;
            formParams.dateOfBirth = moment($scope.dateOfBirth).format("YYYY-MM-DD");
            formParams.zipCode = $scope.zipCode;
            formParams.state = $scope.state;
            formParams.gender = $scope.gender;
            $log.debug(formParams);

            saveToSessionStorage(formParams);

            $state.go("register.step2");
        };

        $scope.togglePasswordVisibility = function () {
            $scope.passwordVisible = !$scope.passwordVisible;
        };
})

    .controller('Register.Step2Controller', function ($scope, RegisterService, questionSet1, questionSet2, $log) {
        $scope.REGISTER_ERROR_MESSAGES = REGISTER_ERROR_MESSAGES;
        $log.debug("register_step2");

        $scope.questionSet1 = questionSet1.data.data;
        $scope.questionSet2 = questionSet2.data.data;

        $scope.submit = function () {
            if ($scope.regForm.$invalid) {
                touchAllFields($scope.regForm);
                return;
            }

            var formParams = {};
            formParams.step = 2;
            formParams.question1 = $scope.question1;
            formParams.answer1 = $scope.answer1;
            formParams.question2 = $scope.question2;
            formParams.answer2 = $scope.answer2;
            formParams.last4Ssn = $scope.last4Ssn;

            $log.debug(formParams);

            saveToSessionStorage(formParams);

            RegisterService.register();
        };
});
