angular.module('Intellivisit.patient.dashboard.profile.paymentMethods')

    .controller('Dashboard.Profile.PaymentMethods.AddCtrl', function ($scope, $state, PaymentMethodsService, userInformation) {
        $scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPaymentMethods');
        $scope.ALERT_ICONS = ALERT_ICONS;
        $scope.PAYMENT_METHODS_ERROR_MESSAGES = PAYMENT_METHODS_ERROR_MESSAGES;
        $scope.STATES_IN_USA = STATES_IN_USA;
        $scope.months = generateMonths();
        $scope.YEARS = generateYearsFromNow();

        $scope.userInformation = userInformation.data.data;

        $scope.save = function () {
            if ($scope.paymentMethodsForm.$invalid) {
                touchAllFields($scope.paymentMethodsForm);
                return;
            }

            var data = {
                "cardPriority": $scope.makeDefault ? 1 : 2,
                "cardNickName": $scope.nameOnCard,
                "cardName": "VISA",
                "cardType": "C",
                "cardNumber": $scope.cardNumber,
                "cvvCode": $scope.cvv,
                "expMonth": $scope.expireMonth,
                "expYear": $scope.expireYear,
                "billingFirstName": $scope.userInformation.firstName,
                "billingLastName": $scope.userInformation.lastName,
                "billingAddress1": $scope.address1,
                "billingAddress2": $scope.address2,
                "billingCity": $scope.city,
                "billingState": $scope.state,
                "billingZipCode": $scope.zipCode,
                "billingAddressSameAsHomeAddress": $scope.useHomeAddress,
                "ellihealthUserId": sessionStorage.getItem("username"),
                "customerId": null
            };

            $scope.isSaving = true;
            PaymentMethodsService.createCard(data).then(function (response) {
                $scope.isSaving = false;
                $state.go("dashboard.profile.paymentMethods.list", {
                    currentAlert: initAlertMessage("success", PAYMENT_METHODS_ADD_SUCCESS)
                });

            }, function (response) {
                $scope.isSaving = false;
                console.error(response);
                if (response.data && response.data.messageList && response.data.messageList.length !== 0) {
                    $scope.currentAlert = initAlertMessage("danger", response.data.messageList[0].content);
                } else {
                    $scope.currentAlert = initAlertMessage("danger", SYSTEM_ADD_ERROR);
                }
            });

        };

        $scope.toggleAddress = function () {
            if ($scope.useHomeAddress) {
                $scope.address1 = $scope.userInformation.accountInformation.address1;
                $scope.address2 = $scope.userInformation.accountInformation.address2;
                $scope.city = $scope.userInformation.accountInformation.city;
                $scope.state = $scope.userInformation.accountInformation.state;
                $scope.zipCode = $scope.userInformation.accountInformation.zipCode;
                recoverErrors($scope.paymentMethodsForm.zipCode);
            } else {
                $scope.address1 = "";
                $scope.address2 = "";
                $scope.city = "";
                $scope.state = "";
                $scope.zipCode = "";
            }
        };

        $scope.adjustMonthSelect = function () {
            var date = moment();
            if (parseInt($scope.expireYear, 10) === date.year()) {
                // it is not allowed to use current month
                $scope.months = generateMonths(date.month() + 1 + 1);
                $scope.expireMonth = (parseInt($scope.expireMonth, 10) > date.month() + 1) ? $scope.expireMonth : "";
            } else {
                $scope.months = generateMonths();
            }
        };
    }).controller('Dashboard.Profile.PaymentMethods.EditCtrl', function ($scope, $stateParams, $state, userInformation, PaymentMethodsService) {
    $scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPaymentMethods');
    $scope.ALERT_ICONS = ALERT_ICONS;
    $scope.STATES_IN_USA = STATES_IN_USA;
    $scope.PAYMENT_METHODS_ERROR_MESSAGES = PAYMENT_METHODS_ERROR_MESSAGES;
    $scope.months = generateMonths();
    $scope.YEARS = generateYearsFromNow();

    $scope.userInformation = userInformation.data.data;

    var card = $stateParams.card;
    if (!card) {
        // No proper data, go to the list page ...
        $state.go("dashboard.profile.paymentMethods.list");
        return;
    }
    $scope.cardNumber = getMaskedCardNumber(card.partialCardNumber);
    $scope.nameOnCard = card.cardNickName;
    $scope.expireYear = card.expYear;
    $scope.expireMonth = card.expMonth;
    $scope.makeDefault = card.cardPriority === 1;
    $scope.cvv = card.cvvCode;
    $scope.useHomeAddress = card.billingAddressSameAsHomeAddress;
    $scope.address1 = card.billingAddress1;
    $scope.address2 = card.billingAddress2;
    $scope.city = card.billingCity;
    $scope.state = card.billingState;
    $scope.zipCode = card.billingZipCode;

    $scope.save = function () {
        if ($scope.paymentMethodsForm.$invalid) {
            touchAllFields($scope.paymentMethodsForm);
            return;
        }

        var data = {
            "cardId": card.cardId,
            "cardPriority": $scope.makeDefault ? 1 : 2,
            "cardNickName": $scope.nameOnCard,
            "expMonth": $scope.expireMonth,
            "expYear": $scope.expireYear,
            "billingFirstName": $scope.userInformation.firstName,
            "billingLastName": $scope.userInformation.lastName,
            "billingAddress1": $scope.address1,
            "billingAddress2": $scope.address2,
            "billingCity": $scope.city,
            "billingState": $scope.state,
            "billingZipCode": $scope.zipCode,
            "billingAddressSameAsHomeAddress": $scope.useHomeAddress,
            "ellihealthUserId": sessionStorage.getItem("username"),
            "customerId": null
        };

        $scope.isSaving = true;

        PaymentMethodsService.editCard(data, card.cardId).then(function (response) {
            $scope.isSaving = false;
            $state.go("dashboard.profile.paymentMethods.list", {
                currentAlert: initAlertMessage("success", PAYMENT_METHODS_UPDATE_SUCCESS)
            });
        }, function (response) {
            $scope.isSaving = false;
            console.error(response);
            if (response.data && response.data.messageList && response.data.messageList.length !== 0) {
                $scope.currentAlert = initAlertMessage("danger", response.data.messageList[0].content);
            } else {
                $scope.currentAlert = initAlertMessage("danger", SYSTEM_ADD_ERROR);
            }
        });

    };

    $scope.toggleAddress = function () {
        if ($scope.useHomeAddress) {
            $scope.address1 = $scope.userInformation.accountInformation.address1;
            $scope.address2 = $scope.userInformation.accountInformation.address2;
            $scope.city = $scope.userInformation.accountInformation.city;
            $scope.state = $scope.userInformation.accountInformation.state;
            $scope.zipCode = $scope.userInformation.accountInformation.zipCode;
            recoverErrors($scope.paymentMethodsForm.zipCode);
        } else {
            $scope.address1 = "";
            $scope.address2 = "";
            $scope.city = "";
            $scope.state = "";
            $scope.zipCode = "";
        }
    };

    $scope.adjustMonthSelect = function () {
        var date = moment();
        if (parseInt($scope.expireYear, 10) === date.year()) {
            $scope.months = generateMonths(date.month() + 1);
            $scope.expireMonth = (parseInt($scope.expireMonth, 10) > date.month() + 1) ? $scope.expireMonth : "";
        } else {
            $scope.months = generateMonths();
        }
    };
}).controller('Dashboard.Profile.PaymentMethods.ListCtrl', function ($scope, $uibModal, $log, $state, cards, $stateParams) {
    $scope.ALERT_ICONS = ALERT_ICONS;
    $scope.PAYMENT_CARD_ICONS_CLASS = PAYMENT_CARD_ICONS_CLASS;

    // Check if there's alert to be shown
    if ($stateParams.currentAlert !== undefined) {
        $scope.currentAlert = $stateParams.currentAlert;
    }

    $scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPaymentMethods');

    $scope.cards = cards.data.data ? cards.data.data : [];
    $scope.cards.sort(function (a, b) {
        return a.cardPriority - b.cardPriority;
    });

    $scope.isDefault = function (card) {
        return card.cardPriority === 1;
    };

    $scope.openDelModal = function (size, card) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'dashboard/profile/payment-methods/payment-delete-modal.tpl.html',
            controller: 'Dashboard.Profile.PaymentMethods.ListCtrl.DeleteModalCtrl',
            size: size,
            resolve: {
                card: card
            }
        });

        modalInstance.result.then(function (result) {
            // $log.debug(result);
            $state.go("dashboard.profile.paymentMethods.list", {
                currentAlert: initAlertMessage("success", PAYMENT_METHODS_DELETE_SUCCESS)
            }, {
                reload: true
            });

        }, function (result) {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}).controller('Dashboard.Profile.PaymentMethods.ListCtrl.DeleteModalCtrl', function ($scope, $state, $uibModalInstance, card, PaymentMethodsService) {
    $scope.card = card;

    $scope.yes = function () {
        PaymentMethodsService.deleteCard(card.cardId).then(function () {
            $uibModalInstance.close("delete successful");

        }, function (message) {
            $console.error("delete failed");
        });
    };

    $scope.no = function () {
        $uibModalInstance.close("user cancel");
    };
});
