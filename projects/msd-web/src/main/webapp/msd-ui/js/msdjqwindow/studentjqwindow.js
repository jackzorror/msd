function addStudentWindowEventListeners(theme) {
	setTheme(theme);
	handleStudentTabEvents();
	
	$(document).on('click', '#btnShowStudentWindow', handleShowStudentWindowClick);
	
}
function handleShowStudentWindowClick() {
	if (false == $('#studentWindow').jqxWindow('isOpen')) {
		$('#studentWindow').jqxWindow('open');
	} else if (true == $('#studentWindow').jqxWindow('isOpen')) {
		console.log(" do nothing ... ");
	} else {
		var mainContainer = $('#mainContainer');
    	var offset = mainContainer.offset();
	    var theme = getTheme();

	    $('#studentWindow').append('<div >MSD Student</div> <div id="msdstudentdiv"></div>');
    	initStudentTab();
		$('#studentWindow').jqxWindow({showCollapseButton: true, height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
	}
};

function studentWindowLogout() {
	$('#studentWindow').jqxWindow('expand');
	$('#studentWindow').jqxWindow('close');
	initStudentWindow();
};

function initStudentWindow() {
	initStudentTab();
	var mainContainer = $('#mainContainer');
   	var offset = mainContainer.offset();
    var theme = getTheme();
	$('#studentWindow').jqxWindow({height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
}

var windowTheme;

function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
