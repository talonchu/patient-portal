angular.module('Intellivisit.patient.common.utils')

.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^\d]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.unshift(fromUser);
        }
    };
})

.directive('lowercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            var _ctrl = ctrl;
            _ctrl.$parsers.unshift(function (text) {
                if (text) {
                    text = text.toLowerCase();
                    _ctrl.$setViewValue(text);
                    _ctrl.$render();
                    return text;
                }
                return undefined;
            });
        }
    };
});