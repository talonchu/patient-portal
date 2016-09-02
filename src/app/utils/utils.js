function goToNextView(viewList) {
	for (var i = 0; i < viewList.length; i++) { 
		switch (viewList[i]) {
			case 'SELECT_CUSTOMER':
				return "allAccess.step1";
			case 'NO_ELIGIBLE_CUSTOMER':
				//TODO add this view
			case 'GET_PATIENT_MOBILE_PHONE':
				return "phoneDetails";
			case 'PATIENT_HOME':
				return "dashboard.profile.accountInformation.list";
			case 'WHERE_TO_SERVICE':
				//TODO what should we return
		}
	}
}

function saveToSessionStorage(params) {
	for ( var item in params) {
		sessionStorage.setItem(item, params[item]);
	}
}

function touchAllFields(form) {
	// Set all error fields to 'touched' so that the error message will be
	// shown.
	angular.forEach(form.$error, function(field) {
		angular.forEach(field, function(errorField) {
			errorField.$setTouched();
		});
	});
}

function generateMonths(start) {
	if (typeof start === 'undefined') {
		start = 1;
	}
	return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].slice(start - 1);
}

function generateYearsFromNow() {
	var thisYear = moment().year();
	var result = [];
	for (var i = thisYear; i < thisYear + 20; i++) {
		result.push(i);
	}
	return result;
}

function getMaskedCardNumber(lastDigits) {
	switch (lastDigits.length) {
	case 4:
		return "XXXX-XXXX-XXXX-{0}".format(lastDigits);
	}
}

function recoverErrors(field) {
	angular.forEach(field.$error, function(value, key) {
		field.$setValidity(key, true);
	});
}

// for init google map
// ----------------------------------------------------------------------
// google: google object
// center: default center for map
// zoom: default zoom
// mapTypeId: ROADMAP,SATELLITE,HYBRID
// scrollwheel: true, false
// googleMap: return google.maps.Map object
// divId: the div id to init google map
// ---------------------------------------------------------------------
function initGoogleMap(google, center, zoom, mapTypeId, scrollwheel, googleMap, divId) {
	var mapOptions = {
		center: center,
		zoom: zoom,
		mapTypeId: mapTypeId,
		scrollwheel: scrollwheel
	};

	// init google map
	if (googleMap === void 0) {
		googleMap = new google.maps.Map(document.getElementById(divId), mapOptions);
	}
	return googleMap;
}

//set google map marker
//----------------------------------------------------------------------
//google: google object
//googleMap: return google.maps.Map object
//iconPath: marker icon path
//position: center location
//zoom: default zoom
//title: marker title
//---------------------------------------------------------------------
function setGoogleMapMarker(google, googleMap, iconPath, position, zoom, title) {
	var marker;

	googleMap.setCenter(position);
	googleMap.setZoom(zoom);
	var markerOptions = {
		position: position,
		map: googleMap,
		title: title,
		icon: iconPath
	};
	marker = new google.maps.Marker(markerOptions);
	return marker;
}

// remove all markers in map
function removeAllGoogleMarkers(markersArray) {
	if (markersArray) {
		angular.forEach(markersArray, function(item) {
			item.setMap(null);
		});
		markersArray.length = 0;
		return markersArray;
	}
}

function randomImage() {
    var randomNumberInRange = Math.floor(Math.random() * 5) + 1;
    return "assets/image/bagr_image_" + randomNumberInRange + ".jpg";
}

function initAlertMessage(type, message){
	return {
		"type": type,
		"message": message
	};
}

// -------------------------------------------------------------------------
// JavaScript equivalent to printf/string.format
// Refer to http://stackoverflow.com/a/4673436
// -------------------------------------------------------------------------
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

// -------------------------------------------------------------------------
// End of JavaScript equivalent to printf/string.format
// Refer to http://stackoverflow.com/a/4673436
// -------------------------------------------------------------------------
