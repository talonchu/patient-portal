angular.module('Intellivisit.patient.dashboard.profile.paymentMethods')
	.service('PaymentMethodsService', function ($http, $q) {

		this.getCardsForCurrentUser = function() {
			var username = sessionStorage.getItem("username");
			return $http.get(Routes.buildURL(
				Routes.card, 
				{"username": username}
			));
		};

		this.deleteCard = function(cardId) {
			var username = sessionStorage.getItem("username");
			return $http["delete"](Routes.buildURL(
				Routes.singleCard, 
				{"username": username, "id": cardId}
			));
		};

		this.createCard = function(data) {
			var username = sessionStorage.getItem("username");
			return $http.post(Routes.buildURL(
				Routes.card, 
				{"username": username}
			), data);
		};

		this.editCard = function(data, cardId) {
			var username = sessionStorage.getItem("username");
			return $http.patch(Routes.buildURL(
				Routes.singleCard, 
				{"username": username, "id": cardId}
			), data);
		};
	})

	;