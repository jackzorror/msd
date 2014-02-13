function handleStudentCheckInTabEvents() {
	console.log(" setup Student checkin event handle ...");
	
	$(document).on('click', '#btnStudentCheckIn', handleStudentCheckInClick);
	$(document).on('focusout', '#txtStudentCheckInFirstName', handleFirstNameInputTextFocusout);
	$(document).on('focusout', '#txtStudentCheckInLastName', handleLastNameInputTextFocusout);
	$(document).on('change', '#msdClassDropList', handleClassDropListChange);
	
};

function initStudentCheckinTab(theme) {
	console.log(" init student checkin ... ");
	$('#studentcheckindiv').empty();

	$('#studentcheckindiv').append('<label style="margin-left: 10px;">Please input student First Name, Last Name, and select class to Check In ...</label>');

	var namediv = $('<div style="float: left; margin-left: 10px; margin-top:10px;" />').attr({id:'namediv'});
	$('#studentcheckindiv').append(namediv);

	var classdiv = $('<div style="margin-left: 10px; margin-top:10px;" />').attr({id:'classdiv'});
	$('#studentcheckindiv').append(classdiv);

	var btndiv = $('<div style="margin-left: 10px; margin-top:10px;" />').attr({id:'btndiv'});
	$('#studentcheckindiv').append(btndiv);
	
	$('#namediv').append('<label>first name : </label>');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentCheckInFirstName'});
	$('#namediv').append(fname);
	$('#txtStudentCheckInFirstName').jqxInput({placeHolder: "First Name: ", height: 20, width: 150, minLength: 1, theme: theme });

	$('#namediv').append('<label style="margin-left: 10px;"> last name : </label>');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentCheckInLastName'});
	$('#namediv').append(lname);
	$('#txtStudentCheckInLastName').jqxInput({placeHolder: "Last Name: ", height: 20, width: 150, minLength: 1, theme: theme });

	$('#namediv').append('<label style="margin-left: 10px;"> Class : &nbsp;</label>');
	$('#classdiv').append(' <div style="margin-left: 10px; margin-top:10px;" id="msdClassDropList"></div> ');
	
	$("#msdClassDropList").jqxDropDownList({ selectedIndex: 0, width: '150', height: '20', theme: theme });

	var checkinbutton = $('<input style="float:right; margin-right: 40px" />').attr({ type: 'button', id:'btnStudentCheckIn', value:'Check In'});
	$('#btndiv').append(checkinbutton);
	$('#btnStudentCheckIn').jqxButton({ width: '150', theme: theme });

	$('#txtStudentCheckInFirstName').jqxInput('focus');
	
	getAllClassList();
	getUniqueName("FIRSTNAME");
	getUniqueName("LASTNAME");
	getAllStudents();
};

function getAllClassList() {
	console.log('in getAllClassList ... ');
	$.ajax({
		type: "GET",
		url: "../msd-app/msdclass",
		dataType: "json",
		success: function(response) {
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				$("#msdClassDropList").jqxDropDownList({ source: data, displayMember:"name", valueMember:"id" });
				$("#msdClassDropList").jqxDropDownList('insertAt', 'Please Choose:', 0);
				$("#msdClassDropList").jqxDropDownList('selectIndex', 0 ); 
			} else {
				$.msgBox({ title: "Error " + response.code, content: " Can't get class for check in process ... ", type:"error" });
			}
		},
		error: function(msg, url, line) {
			$.msgBox({ title: "System error", content: " Can't get class for check in process ... ", type:"error" });
		}
	});
};

function handleFirstNameInputTextFocusout() {
	var fname;
	if (null != this.value && $.trim(this.value).length > 0) {
		$(this).css('border', "");
	} else {
		$(this).css('border', "solid red");
	}
};

function handleLastNameInputTextFocusout() {
	var lname
	if (null != this.value && $.trim(this.value).length > 0) {
		$(this).css('border', "");
	} else {
		$(this).css('border', "solid red");
	}
};

function handleClassDropListChange() {
	console.log(" in handleClassDropListChange ... ");
	var checkinclass = $('#msdClassDropList').val();
	if (null != checkinclass || checkinclass.length != 0 || "Please Choose:" != checkinclass) {
		$('#msdClassDropList').css("border", "");
	}
};

function handleStudentCheckInClick() {
	console.log(" in handleStudentCheckInClick ... ");
	var msg = "Please provide : ";
	var error = false;
	var fname = $.trim($('#txtStudentCheckInFirstName').val());
	if (null == fname || fname.length == 0) {
		$('#txtStudentCheckInFirstName').css("border", "solid red");
		msg += " First Name, ";
		error = true;
	}
	var lname = $.trim($('#txtStudentCheckInLastName').val());
	if (null == lname || lname.length == 0) {
		$('#txtStudentCheckInLastName').css("border", "solid red");
		msg += " Last Name, ";
		error = true;
	}
	var checkinclass = $('#msdClassDropList').val();
	if (null == checkinclass || checkinclass.length == 0 || "Please Choose:" == checkinclass) {
		$('#msdClassDropList').css("border", "solid red");
		msg += " Class Name ";
		error = true;
	}
	
	if (error) {
		$.msgBox({ title: "Invalid input", content: msg, type:"alert" });
	} else {
		findStudentIdByFirstNameLastName(fname, lname, checkinclass);
	}
};

function getAllStudents() {
	console.log(" get all student ");
	$.ajax({
		type: "GET",
		url: "../msd-app/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: {type:"summary"},
		success: function(response) {
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setStudents(data);
			} else {
				$.msgBox({ title: "Error " + response.code, content: " Can't get all student ", type:"error" });
			}
		},
		error: function(msg, url, line) {
			$.msgBox({ title: "System error", content: " Can't get all student ", type:"error" });
		}
	});
}

function getUniqueName(fieldname) {
	console.log(" get unique name for : " + fieldname);
	$.ajax({
		type: "GET",
		url: "../msd-app/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: {type:"nameautocomplete",fieldname:fieldname },
		success: function(response) {
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				if ("FIRSTNAME" == fieldname) {
			    	$( '#txtStudentCheckInFirstName' ).jqxInput({ source: data });
				} else if ("LASTNAME" == fieldname) {
				    $( '#txtStudentCheckInLastName' ).jqxInput({ source: data });
				}
			} else {
				$.msgBox({ title: "Error " + response.code, content: " Can't get unique for " + fieldname + " ... ", type:"error" });
			}
		},
		error: function(msg, url, line) {
			$.msgBox({ title: "System error", content: " Can't get unique for " + fieldname + " ... ", type:"error" });
		}
	});
};

function checkinstudent(sid, ciclass) {
	if (null != sid && 0 != sid) {
		console.log(" call student check in ... ");
		
		var checkintime = new Date();

		var scheckin = { "checkInTime":checkintime, "classId":ciclass, "id":0, "studentId":sid };
			
		$.ajax({
			type: "POST",
			url: "../msd-app/msdstudentcheckin",
			dataType: "json",
			data: JSON.stringify(scheckin),
			contentType: "application/json",
			processData:false,
			success: function(response) {
				if (201 == response.code) {
					$.msgBox({title:"Wow", content:" You successfully check in class ", type:"info"});

					$('#txtStudentCheckInFirstName').val("");
					$('#txtStudentCheckInFirstName').jqxInput('focus');
					$('#txtStudentCheckInLastName').val("");
					$('#msdClassDropList').jqxDropDownList('selectIndex', 0 ); 
				} else {
					$.msgBox({ title: "Error " + response.code, content: " Can't check in ... ", type:"error" });
				}
			},
			error: function(msg, url, line) {
				$.msgBox({ title: "System error", content: " Can't check in ... ", type:"error" });
			}
		});
	} else {
		$.msgBox({title:"Invalid Input Info",
				  content:" student : " + $('#txtStudentCheckInFirstName').val() + " " + $('#txtStudentCheckInLastName').val() + " are not register in system, Please check First Name and Last Name ",
				  type:"error"});
		$('#txtStudentCheckInFirstName').focus();
	}
};

function findStudentIdByFirstNameLastName(fname, lname, checkinclass) {
	var sid = 0;
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudent",
		data: { firstname: fname, lastname: lname },
		success: function(response) {
			console.log(" get student ... ");
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				sid = data.id;
			}
			
			checkinstudent(sid, checkinclass)
		},
		error: function(msg, url, line) {
			checkinstudent(sid, checkinclass)
		}
	});
};

var allStudents;
function getStudents() {
	return allStudents;
}
function setStudents(data) {
	allStudents = data;
}