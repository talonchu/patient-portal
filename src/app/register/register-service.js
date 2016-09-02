angular.module('Intellivisit.patient.register')

    .service('RegisterService', ['$http', '$state', '$log', function ($http, $state, $log, $uibModal) {

        this.loadQuestionSet = function (setId) {
            return $http.get(Routes.buildURL(
                Routes.questionSet,
                {"setId": setId}
            ));
        };

        this.checkEmailExists = function (email) {
            return $http.get(Routes.buildURL(
                Routes.checkUserExist,
                {"email": email}
            ));
        };

        this.register = function () {
            var data = {
                'username': sessionStorage.getItem("email"),
                'password': sessionStorage.getItem("password"),
                'email': sessionStorage.getItem("email"),
                'passwordQuestionKey1': sessionStorage.getItem("question1"),
                'passwordAnswer1': sessionStorage.getItem("answer1"),
                'passwordQuestionKey2': sessionStorage.getItem("question2"),
                'passwordAnswer2': sessionStorage.getItem("answer2"),
                'firstName': sessionStorage.getItem("firstName"),
                'lastName': sessionStorage.getItem("lastName"),
                'dob': sessionStorage.getItem("dateOfBirth"),
                'last4Ssn': sessionStorage.getItem("last4Ssn"),
                'accountInformation': {
                    'zipCode': sessionStorage.getItem("zipCode"),
                    'state': sessionStorage.getItem("state")
                },
                'primaryProfile': {
                    'sex': sessionStorage.getItem("gender")
                }
            };

            $log.debug(data);

            $http.post(Routes.buildURL(Routes.register), data)
                .then(function (response) {
                    if (response.data.data.username == data.username) {
                        $state.go("registerSuccess");

                    } else {
                        // alert(SYSTEM_REGISTRATION_ERROR);
                        var modalInstance = $uibModal.open({
                            size: "sm",
                            templateUrl: 'dialog/system_error.tpl.html',
                            controller: function($scope, $uibModalInstance) {
                                $scope.message = SYSTEM_REGISTRATION_ERROR;
                                $scope.ok = function() {
                                    $uibModalInstance.close();
                                };
                            }
                        });
                    }
                }, function (response) {
                    // alert(SYSTEM_REGISTRATION_ERROR);
                    var modalInstance = $uibModal.open({
                        size: "sm",
                        templateUrl: 'dialog/system_error.tpl.html',
                        controller: function($scope, $uibModalInstance) {
                            $scope.message = SYSTEM_REGISTRATION_ERROR;
                            $scope.ok = function() {
                                $uibModalInstance.close();
                            };
                        }
                    });
                    $log.debug(response);
                });
        };

        this.geocodeZipCode = function (zipCode) {
            return $http.get(Routes.buildURL(
                Routes.checkZipCode,
                {"zipCode": zipCode}
            ));
        };
    }]);
