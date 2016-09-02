angular.module('Intellivisit.patient.common.validator')

.directive('validateAnswer', function() {
	return {
		require: [ '^form', 'ngModel' ],
		link: function(scope, elm, attrs, ctrls) {
			var formCtrl = ctrls[0];
			var modelCtrl = ctrls[1];
			modelCtrl.$parsers.unshift(function(answer) {
				var answer1 = modelCtrl;
				var answer2 = formCtrl[attrs.validateAnswer];

				answer1.$setValidity("sameAnswer", answer1.$viewValue != answer2.$viewValue);
				answer2.$setValidity("sameAnswer", answer1.$viewValue != answer2.$viewValue);

				return answer;
			});
		}
	};
})

.directive('validateQuestion', function() {
	return {
		require: [ '^form', 'ngModel' ],
		link: function(scope, elm, attrs, ctrls) {
			var formCtrl = ctrls[0];
			var modelCtrl = ctrls[1];
			modelCtrl.$parsers.unshift(function(question) {
				var question1 = formCtrl["question1"];
				var question2 = formCtrl["question2"];

				var valid = scope.questionSet1[question1.$viewValue] != scope.questionSet2[question2.$viewValue];
				question1.$setValidity("sameQuestion", valid);
				question2.$setValidity("sameQuestion", valid);

				return question;
			});
		}
	};
})

.directive('validateZipCode', function(RegisterService) {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			var _ctrl = ctrl;
			_ctrl.$parsers.unshift(function(zipCode) {
				scope.state = null;
				if (zipCode !== undefined && zipCode.length === 5) {
					RegisterService.geocodeZipCode(zipCode).then(function(response) {
						if (response.data.data && response.data.data.isUSPolitical) {
							scope.state = response.data.data.state.shortName;
							_ctrl.$setValidity("invalidUSZip", true);
						} else {
							_ctrl.$setValidity("invalidUSZip", false);
						}
					});
				}
				return zipCode;
			});
		}
	};
})

.directive('validatePassword', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(password) {
				var pwdValidLengthBoolean = (password.length >= 8) ? true : false;
				var pwdHasUpperCaseBoolean = !!(/^.*[A-Z].*$/.test(password));
				var pwdHasNumberBoolean = !!(/^.*[0-9].*$/.test(password));

				scope.pwdValidLength = (password && pwdValidLengthBoolean) ? PASSWORD_VALID_MESSAGE_STYLE : PASSWORD_INVALID_MESSAGE_STYLE;
				scope.pwdHasUpperCase = (password && pwdHasUpperCaseBoolean) ? PASSWORD_VALID_MESSAGE_STYLE : PASSWORD_INVALID_MESSAGE_STYLE;
				scope.pwdHasNumber = (password && pwdHasNumberBoolean) ? PASSWORD_VALID_MESSAGE_STYLE : PASSWORD_INVALID_MESSAGE_STYLE;

				if (pwdValidLengthBoolean && pwdHasUpperCaseBoolean && pwdHasNumberBoolean) {
					ctrl.$setValidity('password', true);
					return password;
				} else {
					ctrl.$setValidity('password', false);
					return undefined;
				}
			});
		}
	};
})

.directive('validatePhone', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			var _ctrl = ctrl;
			var _last;
			_ctrl.$parsers.unshift(function(viewValue) {
				var replaced;
				
				if (viewValue && _last && viewValue.length === _last.length - 1) {
					// User is deleting characters
					_last = viewValue;
				} else {
					replaced = viewValue.replace(/[^\w\s]/gi, "").replace(/[^0-9]+/g, "");
					if (replaced.length >= 10) {
						replaced = replaced.substr(0, 3) + '-' + replaced.substr(3, 3) + '-' + replaced.substr(6, 4);
					} else if (replaced.length >= 6) {
						replaced = replaced.substr(0, 3) + '-' + replaced.substr(3, 3) + '-' + replaced.substr(6);
					} else if (replaced.length >= 3) {
						replaced = replaced.substr(0, 3) + '-' + replaced.substr(3);
					}
					_last = replaced;
					_ctrl.$setViewValue(replaced);
					_ctrl.$render();
				}

				// Check if current value is valid phone format
				if (!/^\d{3}-\d{3}-\d{4}$/.test(replaced) && replaced !== "") {
					_ctrl.$setValidity("phone", false);
					return undefined;
				} else {
					_ctrl.$setValidity("phone", true);
					return replaced;
				}
			});
		}
	};
}).directive('validateNotification', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			scope.$watch('notification', function(newVal, oldVal) {
				if (newVal.emailNotification || newVal.textNotification) {
					ctrl.$setValidity('notification', true);
				} else {
					ctrl.$setValidity('notification', false);
				}
			}, true);
		}
	};
});
