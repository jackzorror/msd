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
	$('#btnStudentCheckIn').jqxButton({ width: '153', theme: theme });

	$('#txtStudentCheckInFirstName').jqxInput('focus');
	
	getAllClassList();
	getUniqueName("FIRSTNAME");
	getUniqueName("LASTNAME");
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
				showMsg("Error! " + response.code + " Can't get class for check in process ... ", "error");
			}
		},
		error: function(msg, url, line) {
			showMsg("System Error! " + response.code + " Can't get class for check in process ... ", "error");
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
		showMsg("Invalid Input! " + msg, "error");
	} else {
		setCheckInClassId(checkinclass);
		validStudentCheckInInformation(fname, lname, checkinclass);
	}
};

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
				showMsg("Error! " + response.code + " Can't get unique for " + fieldname + "...", "error");
			}
		},
		error: function(msg, url, line) {
			showMsg("System Error! Can't get unique for " + fieldname + "...", "error");
		}
	});
};

function checkinstudent() {
	if (null != getCheckInClassId() && 0 != getCheckInStudentId()) {
		console.log(" call student check in ... ");
		
		var checkintime = new Date();

		var scheckin = { "checkInTime":checkintime, "classId":getCheckInClassId(), "id":0, "studentId":getCheckInStudentId() };
			
		$.ajax({
			type: "POST",
			url: "../msd-app/msdstudentcheckin",
			dataType: "json",
			data: JSON.stringify(scheckin),
			contentType: "application/json",
			processData:false,
			success: function(response) {
				if (201 == response.code) {
					showMsg("Wow! You successfully check in class ", "notice");

					$('#txtStudentCheckInFirstName').val("");
					$('#txtStudentCheckInFirstName').jqxInput('focus');
					$('#txtStudentCheckInLastName').val("");
					$('#msdClassDropList').jqxDropDownList('selectIndex', 0 ); 
				} else {
					showMsg("Error! " + response.code + " Can't check in ...", "error");
				}
			},
			error: function(msg, url, line) {
				showMsg("System Error! Can't check in ...", "error");
			}
		});
	}
};

function validStudentCheckInInformation(fname, lname, checkinclass) {
	var sid = 0;
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudentcheckin",
		data: { type:"checkin", firstname: fname, lastname: lname, msdclassid:checkinclass },
		success: function(response) {
			console.log(" valid student check in information ... ");
			if (302 == response.code) {
				var data = $.parseJSON(response.result);
				if (data.validationResult == 1) {
					setCheckInStudentId(data.msdStudentId);
					checkinstudent();
				} else if (data.validationResult == 2){
					if (confirm("You didn't register to this class. Do you want continue to check in?")) { 
						setCheckInStudentId(data.msdStudentId);
						checkinstudent();
					}
				} else {
					showMsg("Invalid Input Information : " + " student : " + fname + " " + 
						lname + " are not register in system, Please check First Name and Last Name ",
						"error");
					$('#txtStudentCheckInFirstName').focus();
				}
			} else {
				showMsg("Can't find student in system, Please check your input", "error");
			}
		},
		error: function(msg, url, line) {
			showMsg("System Error to find student in system", "error");
		}
	});
};

var checkInStudentId;
function getCheckInStudentId() {
	return checkInStudentId;
}
function setCheckInStudentId(value) {
	checkInStudentId = value;
}

var checkInClassId;
function getCheckInClassId() {
	return checkInClassId;
}
function setCheckInClassId(value) {
	checkInClassId = value
}