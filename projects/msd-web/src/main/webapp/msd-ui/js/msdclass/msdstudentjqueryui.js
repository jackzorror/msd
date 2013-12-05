function handleStudentTabEvents() {
	console.log(" setup Student tab event handle ...");
	
	$(document).on('click', '#btnSearchStudent', handleStudentSearchClick);
	$(document).on('click', '#btnEditStudent', handleEditStudentClick);
	$(document).on('click', '#btnAddStudent', handleStudentAddClick);
	$(document).on('click', '#btnSaveStudent', handleStudentSaveClick); 
	$(document).on('click', '#btnCancelAddStudent', handleCancelAddStudentClick);
	$(document).on('click', '#btnSaveAddStudent', handleSaveAddStudentClick);
	$(document).on('click', '#btnRegisterClass', handleRegisterClassClick);
};

function initStudentTab() {
	console.log(" init student tab from diff file ... ");

	$('#msdstudentdiv').empty();
	
	$('#msdstudentdiv').append('Please input student First Name and Last Name to search');
	$('#msdstudentdiv').append('<br />');
	$('#msdstudentdiv').append('first name : ');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentSearchFirstName'});
	$('#msdstudentdiv').append(fname);
	$('#msdstudentdiv').append(' last name : ');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentSearchLastName'});
	$('#msdstudentdiv').append(lname);
	var sbutton = $('<input/>').attr({type:'button', id:'btnSearchStudent', value:'search'});
	$('#msdstudentdiv').append(sbutton);
	$('#msdstudentdiv').append(' or to add new student ');
	var abutton = $('<input/>').attr({type:'button', id:'btnAddStudent', value:'add'});
	$('#msdstudentdiv').append(abutton);
	var infodiv = $('<div/>').attr({id:'studentInformation'});
	$('#msdstudentdiv').append(infodiv);
	var adddiv = $('<div/>').attr({id:'addStudent'});;
	$('#msdstudentdiv').append(adddiv);
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
			
	$('#studentInformation').append("<label>Student First Name : </label>");
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
	
	addClassRegister();
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
				
function handleEditStudentClick() {
	console.log(" edit student button click ... ");
	if ("Edit" == $('#btnEditStudent').val()) {
		$('#studentInformation :text').prop("disabled", false);
		$('#txtStudentFirstName').focus();
		$('#btnEditStudent').val("Cancel");
	} else if ("Cancel" == $('#btnEditStudent').val()) {
		console.log (" cancel edit student information ... ");
		cancelUpdateStudentInformation();
		$('#studentInformation :text').prop("disabled", true);
		$("#btnEditStudent").val("Edit");
	}
}

function cancelUpdateStudentInformation() {
	var currentStudent = getCurrentStudent();
	$('#txtStudentFirstName').val(currentStudent.firstName);
	$('#txtStudentLastName').val(currentStudent.lastName);
	$('#txtStudentEmail').val("Email@address.com");
};

function handleStudentSaveClick() {
	console.log(" save student button click ... ");
	$("#studentInformation :text").prop("disabled", true);
	$("#btnEditStudent").val("Edit");
	updateStudentInformation();

}

function updateStudentInformation() {
	console.log(' update student information ... ');
	var currentStudent = getCurrentStudent();
	var fname = $("#txtStudentFirstName").val();
	var lname = $("#txtStudentLastName").val();
	var student = { "id":currentStudent.id, "firstName":fname, "lastName":lname };	

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/msdstudent",
		data: JSON.stringify(student),
		contentType: "application/json",
		processData:false,
		success: function(response) {
			if (500 == response.code) {
				alert("Internal Error, Please check service. ");
			} else if (201 == response.code) {
				console.log(" update student successfully ... ");
				data = $.parseJSON(response.result);
				setCurrentStudent(data);
				$("#txtStudentSearchFirstName").val(data.firstName);
				$("#txtStudentSearchLastName").val(data.lastName);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			alert('error');
		}
	});
};
		
function handleStudentAddClick() {

	console.log(" add new student ");
	$("#studentInformation").empty();
	$("#addStudent").empty();
	$('#txtStudentSearchFirstName').val("");
	$('#txtStudentSearchLastName').val("");
	showStudentAdd();
}

function showStudentAdd() {

	$("#addStudent").append("<br />");

	$("#addStudent").append("<h2> Student information </h2>");			
	$("#addStudent").append("<label>Student First Name : </label>");
	var fname = $('<input/>').attr({ type: 'text', id:"txtAddStudentFirstName"});
	$("#addStudent").append(fname);
			
	$("#addStudent").append("<label> Last Name : </label>");
	var lname = $('<input/>').attr({ type: 'text', id:'txtAddStudentLastName'});
	$("#addStudent").append(lname);
	$("#addStudent").append("<br />");
			
	$("#addStudent").append("<label>        Email :</label>");
	var email = $('<input/>').attr({ type: 'text', id:'txtAddStudentEmail'});
	$("#addStudent").append(email);
			
	$("#addStudent").append("<br />");
	$("#addStudent").append("<br />");
			
	var savebutton = $('<input/>').attr({ type: 'button', id:"btnCancelAddStudent", value:"Cancel"});
	$("#addStudent").append(savebutton);

	var savebutton = $('<input/>').attr({ type: 'button', id:"btnSaveAddStudent", value:"Save"});
	$("#addStudent").append(savebutton);
	
	$('#txtAddStudentFirstName').focus();

}

function handleCancelAddStudentClick() {
	console.log(" cancel add student click ... ");
	
	$('#txtAddStudentFirstName').val("");
	$('#txtAddStudentLastName').val("");
	$('#txtAddStudentEmail').val("");
}

function handleSaveAddStudentClick() {
	console.log(" save add student click ... ");
	
	var fname = $('#txtAddStudentFirstName').val();
	var lname = $('#txtAddStudentLastName').val();
	var email = $('#txtAddStudentEmail').val();
	var student = { "id":0, "firstName":fname, "lastName":lname };	

	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/msdstudent",
		data: JSON.stringify(student),
		contentType: "application/json",
		processData:false,
		success: function(response) {
			if (500 == response.code) {
				alert("Internal Error, Please check service. ");
			} else if (302 == response.code) {
				console.log(" add student successfully ... ");
				data = $.parseJSON(response.result);
				setCurrentStudent(data);
				$("#addStudent").empty();
				showStudentInformation(data);
//				getStudentRegisterClass(data);
//				addClassRegister();
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			alert('error');
		}
	});
}

function addClassRegister() {
	$('#addStudent').append('Please select class from the following list to register');
	var classlist = $('<select/>').attr({id:'registerClassListCombobox'});
	var defaultopption = $('<option>').val('default').text('Select one ...');
	classlist.append(defaultopption);
	$('#addStudent').append(classlist);
	var registerbutton = $('<input/>').attr({ type: 'button', id:'btnRegisterClass', value:'Register'});
	$('#addStudent').append(registerbutton);
	
	getAllClassList();
};

function getAllClassList() {
	console.log('in getAllClassList ... ');
	$.ajax({
		type: "GET",
		url: "../msd-app/msdclass",
		dataType: "json",
		contentType: "application/json",
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get class for  process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);

				$('#registerClassListCombobox option[value!="default"]').remove();

				$.each(data, function (i, theItem) {
					$('#registerClassListCombobox').append($("<option></option>").attr("value",theItem.id).text(theItem.name));
				});
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			alert('error');
		}
	});
};

function handleRegisterClassClick () {
	console.log("register new class ... ");
	var registerclasses = $('#registerClassListCombobox').val();
	if (null == registerclasses || registerclasses.length == 0) {
		alert("please select one class from the list");
	} else {
		registerStudentClass(registerclasses);
	}
};

function registerStudentClass(registerclasses) {
	var cstudent = getCurrentStudent();
	var scregister = {"id":0, "msdClassId":registerclasses, "msdStudentId":cstudent.id};
	
	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/msdstudent/" + cstudent.id,
		data: JSON.stringify(scregister),
		processData:false,
		contentType: "application/json",
		success: function(response) {
			console.log(" get student ... ");
			if (404 == response.code) {
				alert(" Can't register class ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				getStudentRegisterClass(cstudent);
			} else {
				alert("error to register student ... ");
			}
		},
		error: function(msg, url, line) {
			alert('error to register student ... ');
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
