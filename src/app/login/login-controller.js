angular.module('Intellivisit.patient.login').controller('Login.LoginCtrl', function LoginCtrl($uibModal, WhereToService, $stateParams, $location, $scope, $log, $http, $cookies, $state, LoginService, $q, ENV) {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("viewList");

    $scope.ENV = ENV;

    $scope.device = IS_MOBILE ? "Mobile" : "Desktop";
    $scope.ALERT_ICONS = ALERT_ICONS;

    $scope.selectProvider = false;
    $scope.disableNext = true;

    GoogleMapsLoader.KEY = GOOGLE_MAP_KEY;

    $scope.loadMap = function (customerList) {
        GoogleMapsLoader.load(function (google) {
            $scope.google = google;

            // init google map
            var center = new google.maps.LatLng(38, -90);
            $scope.googleMap = initGoogleMap(google, center, 8, google.maps.MapTypeId.ROADMAP, true, $scope.googleMap, "providerMap");

            angular.forEach(customerList, function (customer) {
                var address = customer.corporateAddress1 + "," + customer.corporateCity + "," + customer.corporateState;
                new google.maps.Geocoder().geocode({
                    'address': address
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var marker = setGoogleMapMarker($scope.google, $scope.googleMap, 'assets/image/green-dot.png', results[0].geometry.location, 12, customer.customerName);
                        sessionStorage.setItem(customer.customerId, JSON.stringify(results[0].geometry.location));
                    } else {
                        // alert(GENERAL_SYSTEM_ERROR);
                        var modalInstance = $uibModal.open({
                            size: "sm",
                            templateUrl: 'dialog/system_error.tpl.html',
                            controller: function($scope, $uibModalInstance) {
                                $scope.message = GENERAL_SYSTEM_ERROR;
                                $scope.ok = function() {
                                    $uibModalInstance.close();
                                };
                            }
                        });
                    }
                });
            });
        });
    };

    $scope.getInfoWindow = function (content) {
        var infoWindow;
        // close window if not undefined
        if (infoWindow !== void 0) {
            infoWindow.close();
        }
        // create new window
        var infoWindowOptions = {
            content: content
        };
        infoWindow = new $scope.google.maps.InfoWindow(infoWindowOptions);
        return infoWindow;
    };

    // select specified customer in select provider page.
    $scope.selectedDiv = function ($event, customer) {
        // enable next button
        $scope.disableNext = false;

        var currentDivId = '#customer' + customer.customerId;
        var previousDivId = '#customer' + sessionStorage.getItem("customerId");
        var previousSelectedDiv = angular.element(document.querySelector(previousDivId));
        previousSelectedDiv.removeClass('selected-div');

        var myEl = angular.element(document.querySelector(currentDivId));
        myEl.addClass('selected-div');
        sessionStorage.setItem("customerId", customer.customerId);

        // close previous infoWindow
        if ($scope.infoWindow !== void 0) {
            $scope.infoWindow.close();
        }

        // open current infoWindow
        var location = JSON.parse(sessionStorage.getItem(customer.customerId));
        var marker = setGoogleMapMarker($scope.google, $scope.googleMap, 'assets/image/green-dot.png', location, 12, customer.customerName);
        var content = $scope.getContent(customer);
        $scope.infoWindow = $scope.getInfoWindow(content);
        $scope.infoWindow.open($scope.googleMap, marker);

    };

    $scope.getContent = function (customer) {
        return "<div class='infoWin'><div class='infoWinHeader'>" + customer.customerName + "</div><div>" + customer.corporateAddress1 + "</div><div>" + customer.corporateCity + "," + customer.corporateState + " " + customer.corporateZipCode + "</div></div>";
    };

    // click next button in select provider page.
    $scope.selectProviderNext = function () {
        var customerId = sessionStorage.getItem("customerId");
        LoginService.setCustomer($scope.username.toLowerCase(), customerId);
        $log.debug("login successfully.");
        $scope.currentAlert = undefined;
        $scope.checkForPhoneNumbers(true);
    };

    // Check if there's alert to be shown
    if ($stateParams.currentAlert !== undefined) {
        $scope.currentAlert = $stateParams.currentAlert;
    }

    // Load remembered Username
    var loginUsername = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (loginUsername !== null) {
        $scope.username = loginUsername.toLowerCase();
        $log.debug($scope.username);
        $scope.remember = true;
    } else {
        $scope.remember = false;
    }

    $scope.tryRememberUsername = function () {
        // $log.debug($scope.remember);
        if ($scope.remember && $scope.username !== undefined) {
            localStorage.setItem(LOGIN_STORAGE_KEY, $scope.username);
            $log.debug("Username set");
        } else {
            localStorage.removeItem(LOGIN_STORAGE_KEY);
            $log.debug("Username unset");
        }
    };

    var setCouponCookie = function () {
        var couponCode = $location.search()['couponCode'];
        var dateObj = new Date();
        var newDateObj = new Date(dateObj.getTime() + 60000);
        if (couponCode !== undefined) {
            $cookies.put("coupon_code", couponCode, {
                path: "/", expires: newDateObj
            });
        }
    };


    $scope.login = function () {
        $scope.currentAlert = undefined;
        // $scope.selectProvider = true;
        if ($scope.loginForm.$invalid) {
            touchAllFields($scope.loginForm);
            return;
        }

        setCouponCookie();


        LoginService.login($scope.username.toLowerCase(), $scope.password).then(function (response) {
            $log.debug(response);
            
            sessionStorage.setItem("access_token", response.data.data.access_token);
            sessionStorage.setItem("username", $scope.username.toLowerCase());

            console.log(sessionStorage.getItem('access_token'));

            $scope.tryRememberUsername();

            return LoginService.getUser($scope.username.toLowerCase());
        }, function (response) {
            $log.debug(response);
            if (response != null && response.status === 401) {
                $scope.currentAlert = initAlertMessage("danger", LOGIN_ERROR_MESSAGES.INVALID_USERNAME_PASSWORD);
            }
            return $q.reject();
        }).then(function (response) {
            if (response.data.data.role.roleId === 2) {
                return LoginService.getPatientInfo($scope.username.toLowerCase());
            } else if (response.data.data.role.roleId !== 2) {
                $log.debug("user found but role type is not patient.");
                $scope.currentAlert = initAlertMessage("danger", LOGIN_ERROR_MESSAGES.INVALID_ROLE_OF_PATIENT.format(Routes.buildURL(Routes.elliHealthLogin)));
                return $q.reject();
            }
        }).then(function (response) {
            WhereToService.whereTo();
        });


    };

});
