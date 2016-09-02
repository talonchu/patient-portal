// -------------------------------------------------------------------------
// Set css style for selected div in left navigation
// -------------------------------------------------------------------------
function markSelectedInLeftNav(selectedId) {
	var selectedItem;
	angular.forEach(LEFT_NAV_ITEMS, function(eachItem) {

		if (eachItem.id == selectedId) {
			eachItem.selected = true;
			selectedItem = eachItem;
		} else {
			eachItem.selected = false;
		}
	});
	return selectedItem;
}