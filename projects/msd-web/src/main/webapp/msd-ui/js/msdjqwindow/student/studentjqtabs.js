function initStudentTab() {
	console.log(" init student tab ... ");

	var scp = $('#studentControlPanel').empty();
	
	var namediv = $('<div/>').attr({id:'namediv', class:'infodiv'});
	$('#studentSearchPanel').append(namediv);

	namediv.append('<label style="margin-left:10px;">Please input student </label>');
	namediv.append('<label>first name : </label>');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentSearchFirstName'});
	namediv.append(fname);
	fname.jqxInput({placeHolder: "First Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	namediv.append('<label style="margin-left: 10px;"> last name : </label>');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentSearchLastName'});
	namediv.append(lname);
	lname.jqxInput({placeHolder: "Last Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	var cbutton = $('<input style="float:right;margin-right:10px;" />').attr({type:'button', id:'btnClearStudent', value:'clear'});
	namediv.append(cbutton);
	cbutton.jqxButton({ width: '80', theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnSearchStudent', value:'search'});
	namediv.append(sbutton);
	sbutton.jqxButton({ width: '80', theme: getTheme() });

	var ibutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnStudentInfo', value:'Student'});
	scp.append(ibutton);
	ibutton.jqxButton({ width: '100', theme: getTheme() });
	
	var rbutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnRegistClass', value:'Class'});
	scp.append(rbutton);
	rbutton.jqxButton({width:'100', theme: getTheme() });
	
	var cbutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnCompetitionInfo', value:'Competition'});
	scp.append(cbutton);
	cbutton.jqxButton({width:'100', theme: getTheme() });
	
	var fbutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnFinanceInfo', value:'Finance'});
	scp.append(fbutton);
	fbutton.jqxButton({width:'100', theme: getTheme() });
	
	var abutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnAddStudent', value:'Add Student'});
	scp.append(abutton);
	abutton.jqxButton({ width: '100', theme: getTheme() });
	
	$('#btnStudentInfo').jqxButton({disabled:true});
	$('#btnRegistClass').jqxButton({disabled:true});
	$('#btnCompetitionInfo').jqxButton({disabled:true});
	$('#btnFinanceInfo').jqxButton({disabled:true});
	$('#btnAddStudent').jqxButton({disabled:false});
	
	addStudentTabsEventListeners();
};

function disableButton(disable) {
	$('#btnStudentInfo').jqxButton({disabled:disable});
	$('#btnRegistClass').jqxButton({disabled:disable});
	$('#btnCompetitionInfo').jqxButton({disabled:disable});
	$('#btnFinanceInfo').jqxButton({disabled:disable});
	$('#btnAddStudent').jqxButton({disabled:false});
}

function addStudentTabsEventListeners() {

	$(document).on('click', '#btnSearchStudent', handleStudentSearchClick);
	$(document).on('click', '#btnClearStudent', handleStudentClearClick);

	$(document).on('click', '#btnStudentInfo', handleStudentInfoClick);
	$(document).on('click', '#btnRegistClass', handleRegistClassClick);
	$(document).on('click', '#btnCompetitionInfo', handleCompetitionInfoClick);
	$(document).on('click', '#btnFinanceInfo', handleFinanceInfoClick);
	$(document).on('click', '#btnAddStudent', handleStudentAddClick);
	
	$(document).on('keypress', '#txtStudentSearchFirstName', handleSearchFirstNameKeypress);
	$(document).on('keypress', '#txtStudentSearchLastName', handleSearchLastNameKeypress);
}

function handleSearchFirstNameKeypress(e) {
	if (e.which == 13)
		$('#txtStudentSearchLastName').focus();
}

function handleSearchLastNameKeypress(e) {
	if (e.which == 13)
		$('#btnSearchStudent').click();
}

function handleStudentClearClick() {
	$('#studentMainPanel').empty();
	
   	$( '#txtStudentSearchFirstName' ).val('');
    $( '#txtStudentSearchLastName' ).val('');
   	$( '#txtStudentSearchFirstName' ).jqxInput({ source: getFirstNameList() });
    $( '#txtStudentSearchLastName' ).jqxInput({ source: getLastNameList() });
    $( '#txtStudentSearchFirstName' ).focus();

	disableButton(true);
}

function handleStudentSearchClick() {
	console.log (" search student by name ... ");
	
	var fname = $.trim($('#txtStudentSearchFirstName').val());
	var lname = $.trim($('#txtStudentSearchLastName').val());

	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0)) {
	    alert("please input both last name and first name");
	} else {
		console.log (" call ajax to get student ... ");
		$('#studentMainPanel').empty();
		ajaxGetStudentByName(fname, lname, getStudentByName);
	}

	setCurrentFunction("SEARCH");
}

function handleStudentAddClick() {

	console.log(" add new student ");
	$('#txtStudentSearchFirstName').val("");
	$('#txtStudentSearchLastName').val("");
	createStudentPanel();

	$('#btnEditStudent').jqxButton('val', "Canel");
	$('#btnSaveStudent').jqxButton('val', "Add")

	$("#btnEditMedical").jqxButton('val', "Canel");
	$('#btnSaveMedical').jqxButton('val', "Add");
	
	disableButton(true);
	$('#btnAddStudent').jqxButton({disabled:true});

	setCurrentFunction("ADD");
}

function handleStudentInfoClick() {
	$('#btnSearchStudent').click();
}

function handleRegistClassClick() {
	console.log(" register class ... ");
	
	var fname = $.trim($('#txtStudentSearchFirstName').val());
	var lname = $.trim($('#txtStudentSearchLastName').val());

	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0) ||
	    null == getCurrentStudent()) {
	    alert("Please Find student with last name and first name first");
	} else {
		showStudentRegisteredClassesInfo();
	}

	setCurrentFunction("REGISTER");
}

function handleCompetitionInfoClick() {
	console.log(" Competition Information ... ");
	
	var fname = $.trim($('#txtStudentSearchFirstName').val());
	var lname = $.trim($('#txtStudentSearchLastName').val());

	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0) ||
	    null == getCurrentStudent()) {
	    alert("Please Find student with last name and first name first");
	} else {
		showStudentCompetitionInfo();
	}

	setCurrentFunction("COMPETITION");
}

function handleFinanceInfoClick() {
	console.log(" Finance Information ... ");
	
	var fname = $.trim($('#txtStudentSearchFirstName').val());
	var lname = $.trim($('#txtStudentSearchLastName').val());

	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0) ||
	    null == getCurrentStudent()) {
	    alert("Please Find student with last name and first name first");
	} else {
		showStudentFinanceInfo();
	}

	setCurrentFunction("FINANCE");
}

function getStudentByName(response, request, settings){
	if (404 == response.code) {
		alert(" Can't found student, Please check your input ... ");
		$('#txtStudentSearchFirstName').focus();
		$('#studentMainPanel').empty();
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		if (null != data) {
			disableButton(false);
		} else {
			disableButton(true);
		}
	
		setCurrentStudent(data);
		showStudentDetailInfo(data);
	} else {
		alert("error to find student ... ");
	}
}

var currentFunction;
function setCurrentFunction(status) {
	currentFunction = status;
}
function getCurrentFunction() {
	return currentFunction;
}

var currentStudent;
function setCurrentStudent(student) {
	currentStudent = student;
}
function getCurrentStudent() {
	return currentStudent;
}

