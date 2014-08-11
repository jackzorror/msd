function setTabFocusElement(event) {
	
	var eventData = $('#msdMainTabs').jqxTabs('getTitleAt', event.args.item);
	if ('Student' == eventData)
		$('#txtStudentSearchFirstName').focus();
	else if ('Class' == eventData)
		$('#txtClassSearchName').focus();
	
//	console.log (" tab action event : " + eventData);
}

var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
