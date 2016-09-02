angular.module('Intellivisit.patient.register')

    .directive('validateEmail', function ($http, RegisterService) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('blur', function () {
                    var email = scope.regForm.email.$modelValue;

                    if (email === undefined || email === '') {
                        ctrl.$setValidity("alreadyExists", true);
                        scope.$apply();
                        return;
                    }

                    RegisterService.checkEmailExists(email).then(function () {
                        ctrl.$setValidity("alreadyExists", false);
                    }, function () {
                        ctrl.$setValidity("alreadyExists", true);
                    });

                });
            }
        };
    })
    .directive('validateDob', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on("blur", function () {
                    scope.$apply(function () {
                        if (scope.dateOfBirth !== undefined) {
                            var dob = moment(scope.dateOfBirth);
                            var today = moment();

                            ctrl.$setValidity("atLeast13YearsOld", today.subtract(13, "years").isAfter(dob));
                        } else {
                            ctrl.$setValidity("atLeast13YearsOld", true);
                        }

                        if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(ctrl.$viewValue)) {
                            ctrl.$setValidity("pattern", true);
                        }
                        else {
                            ctrl.$setValidity("pattern", false);
                        }
                    });
                });
            }
        };
    })
    .directive('validateGender', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('blur', function () {
                    scope.$apply(function () {
                        var gender = scope.regForm.gender.$modelValue;
                        if (gender === undefined || gender === 'P') {
                            ctrl.$setValidity("genderValidity", false);
                        }
                        else {
                            ctrl.$setValidity("genderValidity", true);
                        }
                    });
                });
            }
        };
    })
;
