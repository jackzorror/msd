function handleStudentCheckInTabEvents() {
	console.log(" setup Student checkin event handle ...");
	
	$(document).on('change', '#studentCheckInClassCombobox', handleStudentCheckInClasComboboxChange);
	$(document).on('click', '#btnStudentCheckIn', handleStudentCheckInClick);
	$(document).on('focusout', '#txtStudentCheckInFirstName', handleFirstNameInputTextFocusout);
	$(document).on('focusout', '#txtStudentCheckInLastName', handleLastNameInputTextFocusout);
};

function initStudentCheckinTab() {
	console.log(" init student checkin ... ");
	$('#studentcheckindiv').empty();
	
	$('#studentcheckindiv').append('Please input student First Name and Last Name to search');
	$('#studentcheckindiv').append('<br />');
	$('#studentcheckindiv').append('first name : ');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentCheckInFirstName', class:'autocomplete'});
	$('#studentcheckindiv').append(fname);
	$('#studentcheckindiv').append(' last name : ');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentCheckInLastName'});
	$('#studentcheckindiv').append(lname);

	$('#studentcheckindiv').append('Class : ');
	var classlist = $('<select/>').attr({id:'studentCheckInClassCombobox'});
	var defaultopption = $('<option>').val('default').text('Select one ...');
	classlist.append(defaultopption);
	$('#studentcheckindiv').append(classlist);
	var checkinbutton = $('<input/>').attr({ type: 'button', id:'btnStudentCheckIn', value:'Check In'});
	$('#studentcheckindiv').append(checkinbutton);
	$('#txtStudentCheckInFirstName').focus();
	
	getAllClassList();
	getUniqueName("FIRSTNAME");
	getUniqueName("LASTNAME");
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

function getAllClassList() {
	console.log('in getAllClassList ... ');
	$.ajax({
		type: "GET",
		url: "../msd-app/msdclass",
		dataType: "json",
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get class for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);

				$('#studentCheckInClassCombobox option[value!="default"]').remove();

				$.each(data, function (i, theItem) {
					$("#studentCheckInClassCombobox").append($("<option></option>").attr("value",theItem.id).text(theItem.name));
				});
			} else {
				alert("error return code : " + response.code + " in getAllClassList ... ");
			}
		},
		error: function(msg, url, line) {
			alert("error in get AllClassList Server call ... ");
		}
	});
};

function getUniqueName(fieldname) {
	console.log(" get unique name for : " + fieldname);
	$.ajax({
		type: "GET",
		url: "../msd-app/msdstudentcheckin",
		dataType: "json",
		contentType: "application/json",
		data: {type:"checkin",namelisttype:fieldname },
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get name list for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				if ("FIRSTNAME" == fieldname) {
			    	$( '#txtStudentCheckInFirstName' ).autocomplete({
						source: data
					});
				} else if ("LASTNAME" == fieldname) {
				    $( '#txtStudentCheckInLastName' ).autocomplete({
						source: data
					});
				}
			} else {
				alert("error return code : " + response.code + " in getUniqueName ... ");
			}
		},
		error: function(msg, url, line) {
			alert("error in get UniqueName Server call ... ");
		}
	});
};

function handleStudentCheckInClasComboboxChange() {
	console.log(" in handleStudentCheckInClassComboboxChange ... ");
	var checkinclass = $('#studentCheckInClassCombobox').val();
	if (null != checkinclass && checkinclass.length != 0 || "default" != checkinclass) {
		$('#studentCheckInClassCombobox').css("border", "");
	}
};

function handleStudentCheckInClick() {
	console.log(" in handleStudentCheckInClick ... ");
	var msg = "Please provide : ";
	var error = false;
	var fname = $.trim($('#txtStudentCheckInFirstName').val());
	if (null == fname || fname.length == 0) {
		$('#txtStudentCheckInFirstName').css("border", "solid red");
		msg += " First Name; ";
		error = true;
	}
	var lname = $.trim($('#txtStudentCheckInLastName').val());
	if (null == lname || lname.length == 0) {
		$('#txtStudentCheckInLastName').css("border", "solid red");
		msg += " Last Name; ";
		error = true;
	}
	var checkinclass = $('#studentCheckInClassCombobox').val();
	if (null == checkinclass || checkinclass.length == 0 || "default" == checkinclass) {
		$('#studentCheckInClassCombobox').css("border", "solid red");
		msg += " Select Class ";
		error = true;
	}
	
	if (error) {
		alert(msg);
	} else {
		findStudentIdByFirstNameLastName(fname, lname, checkinclass);
	}
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
				if (500 == response.code) {
					alert("Internal Error, Please check service. ");
				} else if (201 == response.code) {
					alert(" You successfully check in class ");
					$('#txtStudentCheckInFirstName').val("").focus();
					$('#txtStudentCheckInLastName').val("");
					$('#studentCheckInClassCombobox').val("default");
				} else {
					alert("error return code  : " + response.code + " in checkinstuent ... ");
				}
			},
			error: function(msg, url, line) {
				alert("error in get checkinstudent Server call ... ");
			}
		});
	} else {
		alert(" student : " + $('#txtStudentCheckInFirstName').val() + " " + $('#txtStudentCheckInLastName').val() + " are not register in system, Please check First Name and Last Name ");
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