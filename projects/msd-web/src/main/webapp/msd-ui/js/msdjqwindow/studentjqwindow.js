function addStudentWindowEventListeners(theme) {
	setTheme(theme);
	handleStudentTabEvents();
	
	$(document).on('click', '#btnShowStudentWindow', handleShowStudentWindowClick);
	
}
function handleShowStudentWindowClick() {
	var mainContainer = $('#mainContainer');
    var offset = mainContainer.offset();
    theme = getTheme();
    $('#studentWindow').append('<div >MSD Student</div> <div id="msdstudentdiv"></div>');
    initStudentTab();
	$('#studentWindow').jqxWindow({showCollapseButton: true, height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
};

var windowTheme;

function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
