var LEFT_NAV_ITEMS = [ {
	"mode" : "accountProfile",
	"id" : "leftNavAccountInformation",
	"link" : "dashboard.profile.accountInformation",
	"content" : "Account Information",
	"subContent" : "",
	"selected" : true
}, {
	"mode" : "accountProfile",
	"id" : "leftNavPrimaryProfile",
	"link" : "dashboard.profile.primaryProfile",
	"content" : "About Me",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "accountProfile",
	"id" : "leftNavPharmacies",
	"link" : "dashboard.profile.pharmacies.list",
	"content" : "Pharmacies",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "accountProfile",
	"id" : "leftNavContactPreferences",
	"link" : "dashboard.profile.contactPreferences.home",
	"content" : "Contact Preferences",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "accountProfile",
	"id" : "leftNavPaymentMethods",
	"link" : "dashboard.profile.paymentMethods.list",
	"content" : "Payment Methods",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "accountProfile",
	"id" : "leftNavSecurity",
	"link" : "dashboard.profile.security",
	"content" : "Security",
	"subContent" : "Manage your password recovery security questions.",
	"selected" : false
}, {
	"mode" : "accountProfile",
	"id" : "leftNavPasswordManagement",
	"link" : "dashboard.profile.passwordManagement",
	"content" : "Password Management",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavLifestyle",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=lifeStyle&username={username}",
	"content" : "Lifestyle",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavDrugAllergies",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=dsAllergyHistory&username={username}",
	"content" : "Drug Allergies",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavConditions",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=conditionHistory&username={username}",
	"content" : "Conditions",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavEmerContact",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=emergency_contacts&username={username}",
	"content" : "Emergency Contact",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavFamiliyHealthHistory",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=familyHealthHistory&username={username}",
	"content" : "Family Health History",
	"subContent" : "",
	"selected" : false
}, {
	"mode" : "healthProfile",
	"id" : "leftNavMedications",
	"link" : "intellivisit/pc/PatientRedirect.xhtml?tabName=medications&username={username}",
	"content" : "Medications",
	"subContent" : "",
	"selected" : false
}];

var HEADER_NAV_ITEMS = {
	"Home" : {
		"id": "home",
		"iconClass" : "header-icon-home",
		"func" : function() {
			angular.injector(['ngCookies']).invoke(['$cookies', function($cookies) {
				if (sessionStorage.getItem("access_token") !== null) {
					$cookies.put("Authorization", sessionStorage.getItem("access_token"), {path: "/"});
				}

				window.location.href = Routes.buildURL(Routes.elliHealthPatientDashboard, {
					"username": sessionStorage.getItem("username")
				}); 
			}]);
		}
	},
	"Virtual Visit" : {
		"id": "virtualVisit",
		"iconClass" : "header-icon-visit",
		"func" : function() {
			angular.injector(['ngCookies']).invoke(['$cookies', function($cookies) {
				if (sessionStorage.getItem("access_token") !== null) {
					$cookies.put("Authorization", sessionStorage.getItem("access_token"), {path: "/"});
				}

				window.location.href = Routes.buildURL(Routes.elliHealthQuickVisit, {
					"username": sessionStorage.getItem("username")
				});
			}]);
		}
	},
	"My Account" : {
		"id": "myAccount",
		"iconClass" : "header-icon-account",
		"link" : "#/dashboard/profile/accountInformation"
	},
	"Support" : {
		"id": "support",
		"iconClass" : "header-icon-support",
		"link" : "http://intellivisit.com/contact/"
	}
}; 
