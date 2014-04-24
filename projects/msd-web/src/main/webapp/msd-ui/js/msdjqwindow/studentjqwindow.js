function addStudentWindowEventListeners(theme) {
	setTheme(theme);
	
	$(document).on('click', '#btnShowStudentWindow', handleShowStudentWindowClick);
	
	$(document).on('click', '#btnSearchStudent', handleStudentSearchClick);
	$(document).on('click', '#btnClearStudent', handleStudentClearClick);
	$(document).on('click', '#btnEditStudent', handleEditStudentClick);
	$(document).on('click', '#btnAddStudent', handleStudentAddClick);
	$(document).on('click', '#btnSaveStudent', handleStudentSaveClick); 
}
// Event handle
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
    	initStudentDiv();
   		getUniqueName("FIRSTNAME");
		getUniqueName("LASTNAME");

		$('#studentWindow').jqxWindow({showCollapseButton: true, height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
	}
};

function handleStudentClearClick() {
	initStudentDiv();
   	$( '#txtStudentSearchFirstName' ).jqxInput({ source: getFirstNameList() });
    $( '#txtStudentSearchLastName' ).jqxInput({ source: getLastNameList() });

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
		$('#classInformation').empty();
		$('#studentInformation').empty();
		$('#registerClass').empty();
		getStudentByName(fname, lname);
	}

	setCurrentFunction("SEARCH");
}

function handleStudentAddClick() {

	console.log(" add new student ");
	$('#txtStudentSearchFirstName').val("");
	$('#txtStudentSearchLastName').val("");
	createStudentInfo();

	$('#btnEditStudent').jqxButton('val', "Canel");

	$('#btnSaveStudent').jqxButton('val', "Add")

	setCurrentFunction("ADD");
}

function handleStudentSaveClick() {
	console.log(" save student button click ... ");
	if ("SEARCH" == getCurrentFunction()) {
		$("#studentInformation :text").prop("disabled", true);
		$("#btnEditStudent").val("Edit");
		updateStudentInformation();
	} else if ("ADD" == getCurrentFunction()) {
		addStudentInformation();
	}
}

function handleEditStudentClick() {
	console.log(" edit student button click ... ");
	if ("SEARCH" == getCurrentFunction()) {
		if ("Edit" == $('#btnEditStudent').val()) {
			$('#studentInformation :text').prop("disabled", false);
			$('#txtStudentFirstName').focus();
			$('#btnEditStudent').val("Cancel");
			$('#btnSaveStudent').jqxButton('disabled', false);
		} else if ("Cancel" == $('#btnEditStudent').val()) {
			console.log (" cancel edit student information ... ");
			cancelUpdateStudentInformation();
			$('#studentInformation :text').prop("disabled", true);
			$("#btnEditStudent").val("Edit");
		}
	} else if ("ADD" == getCurrentFunction()) {
		$('#studentInformation').empty();
	}
}

// UI Creature
function initStudentDiv() {
	console.log(" init student div ... ");

	$('#msdstudentdiv').empty();
	
	var searchdiv = $('<div style="height: 60px; width: 380px; margin-left: 30px; margin-top:10px;" />').attr({id:'searchdiv'});
	$('#msdstudentdiv').append(searchdiv);
	
	var namediv = $('<div/>').attr({id:'namediv', class:'infodiv'});
	$('#searchdiv').append(namediv);

	$('#namediv').append('<label>first name : </label>');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentSearchFirstName'});
	$('#namediv').append(fname);
	$('#txtStudentSearchFirstName').jqxInput({placeHolder: "First Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	$('#namediv').append('<label style="margin-left: 10px;"> last name : </label>');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentSearchLastName'});
	$('#namediv').append(lname);
	$('#txtStudentSearchLastName').jqxInput({placeHolder: "Last Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	var btndiv = $('<div style="height:20px;"/>').attr({id:'btndiv', class:'infodiv'});
	$('#searchdiv').append(btndiv);
	
	var cbutton = $('<input style="float:right;" />').attr({type:'button', id:'btnClearStudent', value:'clear'});
	$('#btndiv').append(cbutton);
	$('#btnClearStudent').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var abutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnAddStudent', value:'add'});
	$('#btndiv').append(abutton);
	$('#btnAddStudent').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var sbutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnSearchStudent', value:'search'});
	$('#btndiv').append(sbutton);
	$('#btnSearchStudent').jqxButton({ width: '60', height: 20, theme: getTheme() });

	var sdiv = $('<div style = "height:145px; width:410px; margin-left:10px; border:1px solid;"/>').attr({id:'studentInformation'});
	$('#msdstudentdiv').append(sdiv);
	
	var cdiv = $('<div style = "width:410px; margin-top: 10px; margin-left:10px; border:1px solid;"/>').attr({id:'classInformation'});
	$('#msdstudentdiv').append(cdiv);

	var rdiv = $('<div style = "width:410px; margin-top: 10px; margin-left:10px; border:1px solid;"/>').attr({id:'registerClass'});
	$('#msdstudentdiv').append(rdiv);

};

function showStudentInformation(data) {
	createStudentInfo();
	
	$('#txtStudentFirstName').jqxInput('disabled', true);
	$('#txtStudentFirstName').jqxInput('val', data.firstName);
			
	$('#txtStudentLastName').jqxInput('disabled', true);
	$('#txtStudentLastName').jqxInput('val', data.lastName);
	
	$('#txtStudentEmail').jqxInput('disabled', true)
	$('#txtStudentEmail').jqxInput('val', 'Email@address.com');
			
	$('#btnEditStudent').jqxButton('val', "Edit");

	$('#btnSaveStudent').jqxButton('val', "Save")
	$('#btnSaveStudent').jqxButton('disabled', true);

	$('#studentInformation').append("<br />");

	setCurrentFunction("SEARCH");
	getStudentRegisterClass(data);
	
	addClassRegister();
};

function cancelUpdateStudentInformation() {
	var currentStudent = getCurrentStudent();
	$('#txtStudentFirstName').val(currentStudent.firstName);
	$('#txtStudentLastName').val(currentStudent.lastName);
	$('#txtStudentEmail').val("Email@address.com");
	$('#btnSaveStudent').jqxButton('disabled', true);
};

function showRegisterClassInformation(data) {
	$('#classInformation').empty();
	$('#classInformation').append('<h3> Registered Class </h3>');
	var csdiv = $('<div style="border:1px solid;"/>').attr({id:'classGrid'});	
	$('#classInformation').append(csdiv);
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	$('#classGrid').jqxGrid(
	{
		source:dataAdapter,
		width: 410,
		height: 100,
		columns:[
			{text: 'Class ID', datafield:'id', hidden:'true'},
			{text: 'Class Name', datafield: 'name', width: 100},
			{text: 'Class Schedule', datafield: ''}
		]
	});
};

function createClassRegisterGrid (data) {
	$('#registerClass').empty();
	$('#registerClass').append('<h3>Please register from the following list</h3>');

	var crdiv = $('<div style="border:1px solid;"/>').attr({id:'registerGrid'});	
	$('#registerClass').append(crdiv);
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	$('#registerGrid').jqxGrid(
	{
		source:dataAdapter,
		width: 410,
		height: 100,
		columns:[
			{text: 'Class ID', datafield:'id', hidden:'true'},
			{text: 'Class Name', datafield: 'name', width: 100},
			{text: 'Class Schedule', datafield: ''},
			{text: 'Register', datafield: 'Register', columntype:'button', width:80, cellsrenderer:function() {
				return "Register";
			}, buttonclick:function(row) {
				var id = $("#registerGrid").jqxGrid('getcellvalue', row, "id");
				registerClass(id);
			}
		}]
	});
};

function createStudentInfo() {
	$('#studentInformation').empty();
	$('#classInformation').empty();
	$('#registerClass').empty();

	$('#studentInformation').append("<h2> Student information </h2>");
			
	$('#studentInformation').append("<label>First Name : </label>");
	var fname = $('<input/>').attr({ type: 'text', id:'txtStudentFirstName'});
	$('#studentInformation').append(fname);
	$('#txtStudentFirstName').jqxInput({height:20, width:110, theme: getTheme()});
			
	$('#studentInformation').append("<label> Last Name : </label>");
	var lname = $('<input/>').attr({ type: 'text', id:'txtStudentLastName'}); 
	$('#studentInformation').append(lname);
	$('#txtStudentLastName').jqxInput({height:20, width:110, theme: getTheme()});
	
	$('#studentInformation').append('<label style="margin-top:10px;">Email :</label>');
	var email = $('<input style="margin-top:10px;"/>').attr({ type: 'text', id:'txtStudentEmail'}); 
	$('#studentInformation').append(email);
	$('#txtStudentEmail').jqxInput({height:20, width:250, theme: getTheme()});
			
	$('#studentInformation').append("<br />");

	var editbutton = $('<input style="float:right; margin-top:10px; margin-right:10px"/>').attr({ type: 'button', id:"btnEditStudent", value:"Edit"});
	$('#studentInformation').append(editbutton);
	$('#btnEditStudent').jqxButton({ width: 60, height: 20, theme:getTheme() });

	var savebutton = $('<input style="float:right; margin-top:10px; margin-right:10px;"/>').attr({ type: 'button', id:"btnSaveStudent", value:"Save"});
	$('#studentInformation').append(savebutton);
	$('#btnSaveStudent').jqxButton({ width: 60, height: 20, theme:getTheme()});

}

function addClassRegister() {
	getNonRegisteredClassList();
};

function studentWindowLogout() {
	$('#studentWindow').jqxWindow('expand');
	$('#studentWindow').jqxWindow('close');
	initStudentWindow();
};

function initStudentWindow() {
	initStudentDiv();
	var mainContainer = $('#mainContainer');
   	var offset = mainContainer.offset();
    var theme = getTheme();
	$('#studentWindow').jqxWindow({height: '300px', width: '450px', theme: theme, position: { x: offset.left + 20, y: offset.top + 20} });
}


// AJAX call ...
function getUniqueName(fieldname) {
	console.log(" get unique name for : " + fieldname);
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: {type:"nameautocomplete",fieldname:fieldname },
		success: function(response) {
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				if ("FIRSTNAME" == fieldname) {
			    	$( '#txtStudentSearchFirstName' ).jqxInput({ source: data });
			    	setFirstNameList(data);
				} else if ("LASTNAME" == fieldname) {
				    $( '#txtStudentSearchLastName' ).jqxInput({ source: data });
				    setLastNameList(data);
				}
			} else {
				alert(" Can't get unique for " + fieldname + " ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
};


function getStudentByName(fname, lname) {
	
	console.log(' get student by name ... ');
			
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdstudent",
		data: { firstname: fname, lastname: lname },
		success: function(response) {
			console.log(" get student ... ");
			if (404 == response.code) {
				alert(" Can't found student, Please check your input ... ");
				$('#txtStudentSearchFirstName').focus();
				$('#studentInformation').empty();
				$('#classInformation').empty();
				$('#registerClass').empty();
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setCurrentStudent(data);
				showStudentInformation(data);
			} else {
				alert("error to find student ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

function updateStudentInformation() {
	console.log(' update student information ... ');
	var currentStudent = getCurrentStudent();
	var fname = $("#txtStudentFirstName").val();
	var lname = $("#txtStudentLastName").val();
	var email = $('#txtStudentEmail').val();
	var student = { "id":currentStudent.id, "firstName":fname, "lastName":lname };	

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/rs/msdstudent",
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
				$('#btnSaveStudent').jqxButton('disabled', true);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
};
		
function addStudentInformation() {
	var fname = $('#txtStudentFirstName').val();
	var lname = $('#txtStudentLastName').val();
	var email = $('#txtStudentEmail').val();
	var student = { "id":0, "firstName":fname, "lastName":lname };	

	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdstudent",
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
				showStudentInformation(data);
				$("#txtStudentSearchFirstName").val(data.firstName);
				$("#txtStudentSearchLastName").val(data.lastName);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

function getStudentRegisterClass(data) {
	console.log(' get student register class ... ');
			
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdstudent",
		data: { type: "registerclass", msdstudentid: data.id },
		success: function(response) {
			console.log(" get student register class ... ");
			if (404 == response.code) {
				console.log(" There is no register class for this student ... ");
				$('#classInformation').empty();
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				showRegisterClassInformation(data);
			} else {
				alert("error to find student ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
};

function getNonRegisteredClassList() {
	console.log('in getNonRegisteredClassList ... ');
	var data = getCurrentStudent();
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: { type: "nonregisterclass", msdstudentid: data.id },
		success: function(response) {
			if (404 == response.code) {
				console.log(" There is no non register class  ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				createClassRegisterGrid(data);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
};

function registerClass(id) {
	console.log('click register class register button ... ');
	var cstudent = getCurrentStudent();
	var scregister = {"id":0, "msdClassId":id, "msdStudentId":cstudent.id};
	
	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdstudent/" + cstudent.id,
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
				addClassRegister();
			} else {
				alert("error to register student ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

var firstNameList;
function setFirstNameList(fnlist) {
	firstNameList = fnlist
}
function getFirstNameList() {
	return firstNameList;
}

var lastNameList;
function setLastNameList(lnlist) {
	lastNameList = lnlist
}
function getLastNameList() {
	return lastNameList;
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


var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
