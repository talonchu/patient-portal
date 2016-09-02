angular.module('Intellivisit.patient.dashboard.profile.pharmacies')

.controller('Dashboard.Profile.Pharmacies.ListCtrl', function DashboardCtrl($scope, $http, $state, $uibModal, $log, PharmaciesService, currentPharmaciesList, $stateParams) {
	$scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPharmacies');

	// Check if there's alert to be shown
	if ($stateParams.currentAlert !== undefined) {
		$scope.currentAlert = $stateParams.currentAlert;
	}

	$scope.sortDeault = function() {
		$scope.currentPharmaciesList = $scope.currentPharmaciesList.sort(function(a, b) {
			return b.isDefault - a.isDefault;
		});
	};

	if (currentPharmaciesList) {
		$scope.currentPharmaciesList = currentPharmaciesList.data.data;
		if ($scope.currentPharmaciesList) {
			$scope.sortDeault();
		}
	}

	$scope.getCurrentPharmaciesList = function() {
		PharmaciesService.getPharmaciesListForUser().then(function(response) {
			$scope.currentPharmaciesList = response.data.data;
			if ($scope.currentPharmaciesList) {
				$scope.sortDeault();
			}
		});
	};

	$scope.makeDefault = function(makeDefaultPharmacy) {
		PharmaciesService.makeDefaultPharmacyForUser(makeDefaultPharmacy).then(function(response) {
			if (response.status === 200) {
				$scope.getCurrentPharmaciesList();
			}
		});
	};

	$scope.deletePharmacy = function(pharmacy) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'dashboard/profile/pharmacies/pharmacy-delete-modal.tpl.html',
			controller: 'Dashboard.Profile.Pharmacies.ListCtrl.DeleteModalCtrl',
			size: 'sm',
			resolve: {
				deletedPharmacy: function() {
					return pharmacy;
				}
			}
		});

		modalInstance.result.then(function(result) {
			$log.debug(result);
			if (result === "yes") {
				PharmaciesService.deletePharmacyForUser(pharmacy).then(function(response) {
					if (response.status === 200) {
						$scope.getCurrentPharmaciesList();
						$scope.currentAlert = initAlertMessage("success", PHARMACIES_DELETE_SUCCESS);
					}
				});
			}
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});

	};

	$scope.pharmacyAdd = function() {
		$state.go("dashboard.profile.pharmacies.add");
	};

}).controller('Dashboard.Profile.Pharmacies.AddCtrl', function DashboardCtrl($scope, $http, $filter, $log, $state, PharmaciesService) {
	$scope.$parent.$parent.$parent.currentSelecteItem = markSelectedInLeftNav('leftNavPharmacies');

	$scope.PHARMACIES_ERROR_MESSAGES = PHARMACIES_ERROR_MESSAGES;
	$scope.ALERT_ICONS = ALERT_ICONS;
	$scope.initGoogleMap = function(google) {
		$scope.google = google;
		var center = new $scope.google.maps.LatLng(38.8762105, -97.6400175);
		$scope.googleMap = initGoogleMap(google, center, 3, google.maps.MapTypeId.ROADMAP, true, $scope.googleMap, "pharmacyMap");
	};

	$scope.markersArray = [];

	GoogleMapsLoader.KEY = GOOGLE_MAP_KEY;
	GoogleMapsLoader.load($scope.initGoogleMap);

	$scope.searchAllPharmacies = function(searchText, currentPage, pageSize) {
		$scope.selectPharmacy = false;
		$scope.markersArray = removeAllGoogleMarkers($scope.markersArray);
		PharmaciesService.searchAllPharmacies(searchText, currentPage, pageSize).then(function(response) {
			$scope.showNoResult = false;
			$scope.pharmaciesList = response.data.dataList;
			$scope.currentPage = currentPage;
			$scope.pageSize = pageSize;
			$scope.totalPage = response.data.pagination.totalPages;

			// set marker for pharmacies in current page.
			if ($scope.pharmaciesList) {
				for (var i = $scope.pharmaciesList.length - 1; i >= 0; i--) {
					var address = $scope.pharmaciesList[i].address1 + "," + $scope.pharmaciesList[i].state + "," + $scope.pharmaciesList[i].zipCode;
					$scope.addressMarker(address, $scope.pharmaciesList[i], i + 1, 20);
				}
			}
		}, function(error) {
			$log.error(error.statusText);
			if (error.status === 404) {
				$scope.pharmaciesList = undefined;
				$scope.showNoResult = true;
			}
		});
	};

	$scope.getCurrentPageList = function(pageNumber) {
		var searchText = sessionStorage.getItem("searchText");
		$scope.searchAllPharmacies(searchText, pageNumber, PHARMACIES_LIST_PAGE_SIZE);
	};

	// set page number range
	$scope.range = function(currentPage) {
		var start, end;
		if (currentPage < 0) {
			$scope.currentPage = 0;
		}

		if (currentPage > $scope.totalPage - 1) {
			$scope.currentPage = $scope.totalPage - 1;
		}

		if (currentPage >= 0) {
			start = Math.floor((currentPage) / PHARMACIES_LIST_PAGE_NAVIGATION_SIZE) * PHARMACIES_LIST_PAGE_NAVIGATION_SIZE + 1;

			end = (Math.floor((currentPage) / PHARMACIES_LIST_PAGE_NAVIGATION_SIZE) + 1) * PHARMACIES_LIST_PAGE_NAVIGATION_SIZE;
			if (end > $scope.totalPage) {
				end = $scope.totalPage;
			}
		}
		var ret = [];
		for (var i = start; i <= end; i++) {
			ret.push(i);
		}
		return ret;
	};

	// according to address, call GeoCoder and set marker in map
	$scope.addressMarker = function(address, pharmacy, index, zoom) {
		if (!$scope.google) {
			GoogleMapsLoader.load($scope.initGoogleMap);
		}
		new $scope.google.maps.Geocoder().geocode({
			'address': address
		}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var iconPath = PREFIX_URL + index + SUFFIX_URL;
				var marker = setGoogleMapMarker($scope.google, $scope.googleMap, iconPath, results[0].geometry.location, zoom, pharmacy.name);
				$scope.markersArray.push(marker);
			} else {
				$log.error("Google marker error:" + status);
			}
		});
	};

	// when user select one pharmacy
	$scope.selectedDiv = function($event, pharmacy, index) {
		$scope.selectPharmacy = true;
		$scope.currentAlert = undefined;
		var currentDivId = '#pharmacyAdd' + pharmacy.pharmacyId;
		var previousDivId = '#pharmacyAdd' + sessionStorage.getItem("pharmacyAddId");
		var previousSelectedDiv = angular.element(document.querySelector(previousDivId));
		previousSelectedDiv.removeClass('selected-div');

		var myEl = angular.element(document.querySelector(currentDivId));
		myEl.addClass('selected-div');
		sessionStorage.setItem("pharmacyAddId", pharmacy.pharmacyId);
		sessionStorage.setItem("selectedPharmacy", JSON.stringify(pharmacy));

		// set center
		var address = pharmacy.address1 + "," + pharmacy.state + "," + pharmacy.zipCode;
		$scope.addressMarker(address, pharmacy, index + 1, 20);
	};

	// when user click cancel button
	$scope.cancel = function() {
		$state.go("dashboard.profile.pharmacies.list");
	};

	// when user click save button
	$scope.save = function() {
		// error message for required select pharmacy
		if ($scope.selectPharmacy !== true) {
			$scope.currentAlert = initAlertMessage("danger", $scope.PHARMACIES_ERROR_MESSAGES.REQUIRED_PHARMACY);
		} else {
			var pharmacy = JSON.parse(sessionStorage.getItem("selectedPharmacy"));
			PharmaciesService.addPharmacyForUser(pharmacy).then(function(response) {
				$state.go("dashboard.profile.pharmacies.list", {
					currentAlert: initAlertMessage("success", PHARMACIES_ADD_SUCCESS)
				});
			}, function(error) {
				$log.error();
				if (error.status === 409) {
					$scope.currentAlert = initAlertMessage("danger", $scope.PHARMACIES_ERROR_MESSAGES.CONFLICT_ADD_PHARMACY);
				} else {
					$scope.currentAlert = initAlertMessage("danger", SYSTEM_ADD_ERROR);
				}
			});
		}
	};

	$scope.searchPharmaciesGo = function() {
		if ($scope.pharmaciesAddForm.$invalid || $scope.searchText === undefined) {
			touchAllFields($scope.pharmaciesAddForm);
			$scope.pharmaciesAddForm.searchText.$setTouched();
			return;
		}
		if ($scope.searchText) {
			sessionStorage.setItem("searchText", $scope.searchText);
			$scope.searchAllPharmacies($scope.searchText, 0, PHARMACIES_LIST_PAGE_SIZE);
		}
	};
}).controller('Dashboard.Profile.Pharmacies.ListCtrl.DeleteModalCtrl', function($scope, $uibModalInstance, deletedPharmacy, PharmaciesService) {
	$scope.deletedPharmacy = deletedPharmacy;

	$scope.yes = function() {
		$uibModalInstance.close("yes");
	};

	$scope.no = function() {
		$uibModalInstance.close("no");
	};
});