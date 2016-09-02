angular.module('Intellivisit.patient.postLogin.phoneDetails')

    .directive('validatePhoneType', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('blur', function () {
                    var phoneType = scope.phoneDetailsForm.$modelValue;

                    if (phoneType === undefined) {
                        ctrl.$setValidity("phoneTypeValidity", true);
                        scope.$apply();
                    }
                    else {
                        ctrl.$setValidity("phoneTypeValidity", false);
                        scope.$apply();
                    }
                });
            }
        };
    });
