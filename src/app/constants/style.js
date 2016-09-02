/**
 * Created by jack.yang on 2016/3/22.
 */
var PASSWORD_VALID_MESSAGE_STYLE = "fa fa-check fa-fw valid";
var PASSWORD_INVALID_MESSAGE_STYLE = "fa fa-times fa-fw";

var ALERT_ICONS = {
	"success" : {
		"class" : "fa fa-check",
		"color" : "green"
	},
	"info" : {
		"class" : "fa fa-info-circle",
		"color" : "lightblue"
	},
	"warning" : {
		"class" : "fa fa-warning",
		"color" : "orange"
	},
	"danger" : {
		"class" : "fa fa-times-circle",
		"color" : "red"
	}
};

var ALLOWED_DATE_FORMATS = [ "MM/dd/yyyy" ];

var LEFT_NAV_SELECTED_ITEM_STYLE = "nav-header left-nav-selected";
var LEFT_NAV_UNSELECTED_ITEM_STYLE = "nav-header";

var PAYMENT_CARD_ICONS_CLASS = {
	"visa": "fa fa-cc-visa fa-5x fa-fw",
	"amex": "fa fa-cc-amex fa-5x fa-fw",
	"mastercard": "fa fa-cc-mastercard fa-5x fa-fw",
	"diners": "fa fa-cc-diners-club fa-5x fa-fw",
	"discover": "fa fa-cc-discover fa-5x fa-fw"
};