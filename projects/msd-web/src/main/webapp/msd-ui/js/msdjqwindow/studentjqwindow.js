function addStudentWindowEventListeners(theme) {
	setTheme(theme);
	
	$(document).on('click', '#btnShowStudentWindow', handleShowStudentWindowClick);
	$(document).on('click', '#btnSearchStudent', handleStudentSearchClick);
	
}
function handleShowStudentWindowClick() {
	console.log(" click button show student window ... ");
	var mainContainer = $('#mainContainer');
    var offset = mainContainer.offset();
    theme = getTheme();
    $('#studentWindow').append('<div >MSD Student</div> <div id="msdstudentdiv"></div>');
    initStudentTab();
	$('#studentWindow').jqxWindow({showCollapseButton: true, height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
};

function initStudentTab() {
	console.log(" init student tab from diff file ... ");

	$('#msdstudentdiv').empty();
	$('#msdstudentdiv').append('<p align="center">');
	$('#msdstudentdiv').append('first name : ');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentSearchFirstName'});
	$('#msdstudentdiv').append(fname);
	$('msdstudentdiv').append('</p>');
	$('#msdstudentdiv').append('&nbsp;last name : ');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentSearchLastName'});
	$('#msdstudentdiv').append(lname);
	$('#msdstudentdiv').append('<br />');
	var sbutton = $('<input/>').attr({type:'button', id:'btnSearchStudent', value:'search'});
	$('#msdstudentdiv').append(sbutton);
	$('#msdstudentdiv').append('&nbsp;');
	var abutton = $('<input/>').attr({type:'button', id:'btnAddStudent', value:'add', stype:"margin-left:5px"});
	$('#msdstudentdiv').append(abutton);
	var infodiv = $('<div/>').attr({id:'studentInformation'});
	$('#msdstudentdiv').append(infodiv);
	var adddiv = $('<div/>').attr({id:'addStudent'});;
	$('#msdstudentdiv').append(adddiv);
	$('#btnSearchStudent').jqxButton({ theme: theme, width: '60px'});
	$('#btnAddStudent').jqxButton({ theme: theme, width: '60px'});
};

function handleStudentSearchClick() {
	console.log (" search student by name ... ");
	
	var fname = $.trim($('#txtStudentSearchFirstName').val());
	var lname = $.trim($('#txtStudentSearchLastName').val());

	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0)) {
	    alert("please input both last name and first name");
	} else {
		console.log (" call ajax to get student ... ");
		$('#addStudent').empty();
		$('#studentInformation').empty();
		getStudentByName(fname, lname);
	}
}

function getStudentByName(fname, lname) {
	
	console.log(' get student by name ... ');
			
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudent",
		data: { firstname: fname, lastname: lname },
		success: function(response) {
			console.log(" get student ... ");
			if (404 == response.code) {
				alert(" Can't found student, Please check your input ... ");
				$('#txtStudentSearchFirstName').focus();
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setCurrentStudent(data);
				showStudentInformation(data);
			} else {
				alert("error to find student ... ");
			}
		},
		error: function(msg, url, line) {
			alert('error to get student ... ');
		}
	});
}

function showStudentInformation(data) {
	$('#studentInformation').empty();

	$('#studentInformation').append("<br />");

	$('#studentInformation').append("<h2> Student information </h2>");
			
	$('#studentInformation').append("<label>First Name : </label>");
	var fname = $('<input/>').attr({ type: 'text', id:"txtStudentFirstName", value:data.firstName});
	fname.prop("disabled",true);
	$('#studentInformation').append(fname);
			
	$('#studentInformation').append("<label> Last Name : </label>");
	var lname = $('<input/>').attr({ type: 'text', id:'txtStudentLastName', value:data.lastName});
	lname.prop("disabled",true);
	$('#studentInformation').append(lname);
	$('#studentInformation').append("<br />");
		
	$('#studentInformation').append("<label>        Email :</label>");
	var email = $('<input/>').attr({ type: 'text', id:'txtStudentEmail', value:'Email@address.com'});
	email.prop("disabled",true);
	$('#studentInformation').append(email);
			
	$('#studentInformation').append("<br />");
	$('#studentInformation').append("<br />");
	$('#studentInformation').append("<br />");
			
	var editbutton = $('<input/>').attr({ type: 'button', id:"btnEditStudent", value:"Edit"});
	$('#studentInformation').append(editbutton);

	var savebutton = $('<input/>').attr({ type: 'button', id:"btnSaveStudent", value:"Save"});
	$('#studentInformation').append(savebutton);

	$('#studentInformation').append("<br />");

	$('#studentInformation').append("<h2> Student register class information </h2>");
			
	$('#studentInformation').append("<table id=divgrid></table>");

	getStudentRegisterClass(data);
	
//	addClassRegister();
};

function getStudentRegisterClass(data) {
	console.log(' get student register class ... ');
			
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudent",
		data: { type: "registerclass", msdstudentid: data.id },
		success: function(response) {
			console.log(" get student register class ... ");
			if (404 == response.code) {
				console.log(" There is no register class for this student ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				var rowCount = data.length;
				
				if (null != $('#studentClassRegister')) {
					$('#studentClassRegister').remove()
				}
	            var table = $('<table id="studentClassRegister"> <caption>Student Register Class information</caption> </table>');
       			for(i=0; i<rowCount; i++){
	                var row = $('<tr></tr>');
                    var column1 = $('<td></td>').text(data[i].id);
                    var column2 = $('<td></td>').text(data[i].name);
                    table.append(row);
   		            row.append(column1);
   		            row.append(column2);
                }
	            $('#studentInformation').append(table);
			} else {
				alert("error to find student ... ");
			}
		},
		error: function(msg, url, line) {
			alert('error to get student ... ');
		}
	});
};


var currentStudent;
function setCurrentStudent(student) {
	currentStudent = student;
}
function getCurrentStudent() {
	return currentStudent;
}

var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
