angular.module('Intellivisit.patient.login')
    .directive('selectProvider', function () {
        var directive = {
            scope: {},
            restrict: 'A',
            replace: true,
            controller: ['$scope', '$element', '$transclude', '$log', function ($scope, $element, $transclude, $log) {

            }],
            link: function (scope, elem, attrs, ctrl) {

            }

        };
        return directive;
    });
