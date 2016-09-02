angular.module('Intellivisit.patient.dashboard.profile.pharmacies')

.service('PharmaciesService', [ '$http', '$state', '$log', function($http, $state, $log) {
	this.searchAllPharmacies = function(searchText, currentPage, pageSize) {
		return $http.get(Routes.buildURL(Routes.searchedPharmaciesList, {
			"searchText": searchText,
			"currentPage": currentPage,
			"pageSize": pageSize
		}));
	};

	this.getPharmaciesListForUser = function() {
		var username = sessionStorage.getItem("username");
		return $http.get(Routes.buildURL(Routes.userPharmaciesList, {
			"username": username
		}));
	};

	this.makeDefaultPharmacyForUser = function(makeDefaultPharmacy) {
		var username = sessionStorage.getItem("username");
		return $http.patch(Routes.buildURL(Routes.makeDefaultPharmacy, {
			"username": username,
			"id": makeDefaultPharmacy.id
		}));
	};

	this.deletePharmacyForUser = function(deletedPharmacy) {
		var username = sessionStorage.getItem("username");
		return $http['delete'](Routes.buildURL(Routes.makeDefaultPharmacy, {
			"username": username,
			"id": deletedPharmacy.id
		}));
	};

	this.addPharmacyForUser = function(selectPharmacy) {
		var username = sessionStorage.getItem("username");
		return $http.post(Routes.buildURL(Routes.addPharmacy, {
			"username": username
		}),selectPharmacy);
	};
} ]);
