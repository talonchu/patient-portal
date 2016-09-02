angular.module('Intellivisit.patient.dashboard.profile.pharmacies').config(function config($stateProvider) {
	$stateProvider.state('dashboard.profile.pharmacies', {
		url: '/pharmacies',
		template: '<ui-view></ui-view>'
	}).state('dashboard.profile.pharmacies.list', {
		url: '/list',
		controller: 'Dashboard.Profile.Pharmacies.ListCtrl',
		templateUrl: 'dashboard/profile/pharmacies/pharmacies-list.tpl.html',
		data: {
			pageTitle: 'My Saved Pharmacies'
		},
		resolve: {
			currentPharmaciesList: function(PharmaciesService) {
				return PharmaciesService.getPharmaciesListForUser();
			}
		},
		params: {
			currentAlert: undefined
        }
	}).state('dashboard.profile.pharmacies.add', {
		url: '/add',
		controller: 'Dashboard.Profile.Pharmacies.AddCtrl',
		templateUrl: 'dashboard/profile/pharmacies/pharmacy-add.tpl.html',
		data: {
			pageTitle: 'Add a Pharmacy'
		}
	});
});