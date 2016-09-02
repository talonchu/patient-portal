angular.module('Intellivisit.patient.dashboard.profile.paymentMethods')
	.directive('validateCardNumber', function () {
		return {
			require: ['ngModel', '^form'],
			restrict: 'A',
			link: function (scope, ele, attrs, ctrls) {
				var ctrl = ctrls[0];
				var form = ctrls[1];
				/* Mimic the logic in PaymentGatewayService.getCCType() in Ellihealth app */
				var getCCType = function (ccNumber) {
					if (!ccNumber) {
						return undefined;
					}

					var visaRegex = "^4[0-9]{12}(?:[0-9]{3})?$";
					var masterRegex = "^5[1-5][0-9]{14}$";
					var amexRegex = "^3[47][0-9]{13}$";
					var dinersClubrRegex = "^3(?:0[0-5]|[68][0-9])[0-9]{11}$";
					var discoverRegex = "^6(?:011|5[0-9]{2})[0-9]{12}$";

					ccNumber = ccNumber.replace(/\D/g, '');

					if (ccNumber.match(visaRegex)) { return "VISA"; }
					else if (ccNumber.match(masterRegex)) { return "MASTERCARD"; }
					else if (ccNumber.match(amexRegex)) { return "AMEX"; }
					else if (ccNumber.match(dinersClubrRegex)) { return "DINERS"; }
					else if (ccNumber.match(discoverRegex)) { return "DISCOVER"; }
				};

				/* Luhn algorithm in Javascript. Check valid credit card numbers 
				 * Copy from https://gist.github.com/DiegoSalazar/4075533 */
				// takes the form field value and returns true on valid number
				var validCreditCard = function (value) {
					// accept only digits, dashes or spaces
					if (/[^0-9-\s]+/.test(value)) { return false; }
					// The Luhn Algorithm. It's so pretty.
					var nCheck = 0, bEven = false;
					value = value.replace(/\D/g, "");

					for (var n = value.length - 1; n >= 0; n--) {
						var cDigit = value.charAt(n),
							nDigit = parseInt(cDigit, 10);

						if (bEven && (nDigit *= 2) > 9) {
							nDigit -= 9;
						}

						nCheck += nDigit;
						bEven = !bEven;
					}

					return (nCheck % 10) === 0;
				};

				ele.on("blur", function () {
					scope.$apply(function () {
						var ccType = getCCType(scope.cardNumber);
						if (ccType) {
							scope.cardName = ccType;
							ctrl.$setValidity("ccType", true);
						}
						else {
							ctrl.$setValidity("ccType", false);
						}

						var valid = validCreditCard(scope.cardNumber);
						ctrl.$setValidity("luhnCheck", valid);

						if (ctrl.$invalid) {
							scope.cvv = undefined;
							recoverErrors(form.cvv);
							form.cvv.$setUntouched();
						}
					});
				});
			}
		};
	})

	.directive('validateCvv', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, ele, attrs, ctrl) {
				var isValidCVVCode = function (type, cvvCode) {
					var cardType = type.toUpperCase();
					var pattern = null;

					switch (cardType) {
					case "MASTERCARD":
					case "VISA":
					case "DISCOVER":
					case "DINERS":
						pattern = /^[0-9]{3}$/;
						break;
					case "AMEX":
					case "AMERICANEXPRESS":
						pattern = /^[0-9]{4}$/;
						break;
					}

					return pattern.test(cvvCode);

				};

				ele.on("blur", function() {
					scope.$apply(function() {
						ctrl.$setValidity("cvvCode", isValidCVVCode(scope.cardName, scope.cvv));
					});
				});
			}
		};
	})

	;