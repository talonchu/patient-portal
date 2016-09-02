(function () {
    var cookies, state;

    angular.module('Intellivisit.patient.postLogin.allAccess')
        .controller('AllAccess.Step1Controller', function ($scope, $state, $http, $parse, $log, AllAccessService, customerList) {
            state = $state;
            $scope.countPreRegistered = 0;
            $scope.countNotPreRegistered = 0;
            $scope.goNext = function () {
                angular.forEach(customerList, function (customer) {
                    if (customer.preRegistered) {
                        $scope.countPreRegistered++;
                    } else {
                        $scope.countNotPreRegistered++;
                    }
                });
                sessionStorage.setItem("countPreRegistered", $scope.countPreRegistered);
                sessionStorage.setItem("countNotPreRegistered", $scope.countNotPreRegistered);

                if ($scope.countPreRegistered === 0) {
                    $state.go("allAccess.stepMore");
                } else {
                    $state.go("allAccess.step2");
                }
            };
        })

        .controller('AllAccess.Step2Controller', function ($scope, $state, $cookies, $http, $parse, $log, AllAccessService, customerList) {
            state = $state;
            cookies = $cookies;

            // $scope.customerSelected = false;
            $scope.ALLACCESS_ERROR_MESSAGES = ALLACCESS_ERROR_MESSAGES;
            $scope.ALERT_ICONS = ALERT_ICONS;
            $scope.username = sessionStorage.getItem("username");
            $scope.countPreRegistered = sessionStorage.getItem("countPreRegistered");
            $scope.countNotPreRegistered = sessionStorage.getItem("countNotPreRegistered");

            $scope.customerList = customerList;

            // when user select one customer
            $scope.setSelectedCustomer = selectProvider;
            $scope.goNext = goNext;
        })

        .controller('AllAccess.StepMoreController', function ($scope, $state, $cookies, $http, $parse, $log, AllAccessService, customerList) {
            state = $state;
            cookies = $cookies;

            // $scope.customerSelected = false;
            $scope.ALLACCESS_ERROR_MESSAGES = ALLACCESS_ERROR_MESSAGES;
            $scope.ALERT_ICONS = ALERT_ICONS;
            $scope.username = sessionStorage.getItem("username");
            $scope.countPreRegistered = sessionStorage.getItem("countPreRegistered");
            $scope.countNotPreRegistered = sessionStorage.getItem("countNotPreRegistered");

            $scope.customerList = customerList;

            // when user select one customer
            $scope.setSelectedCustomer = selectProvider;
            $scope.goNext = goNext;
        })

        .controller('AllAccess.StepConfirmController', function ($scope, $state, $cookies, $http, $parse, $log, AllAccessService, WhereToService) {
            state = $state;
            cookies = $cookies;

            $scope.selectedCustomer = JSON.parse(sessionStorage.getItem("selectedCustomer"));
            $scope.selectedCustomerId = $scope.selectedCustomer.customerId;
            $scope.selectedCustomerName = $scope.selectedCustomer.customerName;
            $scope.selectedCustomerCity = $scope.selectedCustomer.customerCity;
            $scope.selectedCustomerState = $scope.selectedCustomer.customerState;
            $scope.selectedCustomerUrl = $scope.selectedCustomer.customerUrl;
            $scope.selectedCustomerLogoUrl = $scope.selectedCustomer.customerLogoUrl;
            $scope.selectedCustomerTermsAndConditions = $scope.selectedCustomer.termsAndConditions;
            $scope.currentAlert = undefined;
            $scope.ALLACCESS_ERROR_MESSAGES = ALLACCESS_ERROR_MESSAGES;
            $scope.ALERT_ICONS = ALERT_ICONS;

            $scope.goNext = function () {
                // error message for required select customer
                if ($scope.allAccessForm.$invalid) {
                    $scope.currentAlert = initAlertMessage("danger", $scope.ALLACCESS_ERROR_MESSAGES.REQUIRED_TERMS_AND_CONDITIONS);
                } else {
                    AllAccessService.setCustomer($scope.selectedCustomerId).then(function (response) {
                        WhereToService.whereTo();
                    });
                    $cookies.remove("return_allAccess_path");
                }
            };

            $scope.goBack = function () {
                var return_path = sessionStorage.getItem("return_allAccess_path");
                $state.go(return_path);
            };
        });

    var selectProvider = function ($event, customer) {
        var $scope = this.$parent;
        $scope.customerSelected = true;
        $scope.currentAlert = undefined;
        var selectedCss = "selected-div";
        // Clear selection.
        angular.element(document.querySelector("." + selectedCss)).removeClass(selectedCss);
        // Highlight current selection.
        var currentSelected = $event.target;
        while (!(currentSelected.tagName.toLowerCase() === "div" && currentSelected.id.search("customerSelect") >= 0)) {
            currentSelected = currentSelected.parentElement;
        }
        angular.element(currentSelected).addClass(selectedCss);

        sessionStorage.setItem("selectedCustomer", JSON.stringify(customer));
    };

    var goNext = function () {
        var $scope = this;
        // error message for required select customer
        if (!$scope.customerSelected) {
            $scope.currentAlert = initAlertMessage("danger", $scope.ALLACCESS_ERROR_MESSAGES.REQUIRED_CUSTOMER);
        } else {
            sessionStorage.setItem("return_allAccess_path", state.current.name);
            state.go("allAccess.stepConfirm");
        }
    };
})();
