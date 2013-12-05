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
		if (null == $('#txtStudentCheckInLastName').val() || !($.trim($('#txtStudentCheckInLastName').val()).length > 0)) {
			fname = $.trim(this.value);
			var lnames = getNameList(fname, "LAST");
			if (null != lnames && lnames.length > 0) {
				if (1 == lnames.length) {
					$('#txtStudentCheckInLastName').val(lnames[0]);
					$('#txtStudentCheckInLastName').css('border',"");
				} else {
				    $( '#txtStudentCheckInLastName' ).autocomplete({
						source: lnames
					});
				}
			}
		}
	} else {
		$(this).css('border', "solid red");
	}
};

function handleLastNameInputTextFocusout() {
	var lname
	if (null != this.value && $.trim(this.value).length > 0) {
		$(this).css('border', "");
		if (null == $('#txtStudentCheckInFirstName').val() || !($.trim($('#txtStudentCheckInFirstName').val()).length > 0)) {
			lname = $.trim(this.value);
			var fnames = getNameList(lname, "FIRST");
			if (null != fnames && fnames.length > 0) {
				if (1 == fnames.length) {
					$('#txtStudentCheckInFirstName').val(fnames[0]);
					$('#txtStudentCheckInFirstName').css('border',"");
				} else {
				    $( '#txtStudentCheckInFirstName' ).autocomplete({
						source: fnames
					});
				}
			}
		}
		
	} else {
		$(this).css('border', "solid red");
	}
};

function getNameList(name, type) {
	var names = [];
	var list = getStudentList();
	var comparename;
	var resultname;

	$.each(list, function (i, theItem) {
		if ("FIRST" == type) {
			comparename = theItem.lastName;
			resultname = theItem.firstName;
		} else if ("LAST" == type) {
			comparename = theItem.firstName;
			resultname = theItem.lastName;
		}
		if (name == comparename) {
			if ($.inArray(resultname, names) < 0) {
				names.push(resultname);
			}
		}
	});
	
	return names;
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
		url: "../msd-app/msdstudent",
		dataType: "json",
		contentType: "application/json",
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get class for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setStudentList(data);
				var fnames = getUniqueNameFromStudentList(data, "FIRST");
			    $( '#txtStudentCheckInFirstName' ).autocomplete({
					source: fnames
				});
				
				var lnames = getUniqueNameFromStudentList(data, "LAST");
			    $( '#txtStudentCheckInLastName' ).autocomplete({
					source: lnames
				});

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
		checkinstudent(lname, fname, checkinclass);
	}
};

function checkinstudent(lname, fname, ciclass) {
	console.log(" F Name : " + fname + " L Name : " + lname + " Class : " + ciclass);
	var sid = findStudentIdByFirstNameLastName(fname, lname);
	if (0 != sid) {
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
		alert(" student : " + fname + " " + lname + " are not register in system, Please check First Name and Last Name ");
		$('#txtStudentCheckInFirstName').focus();
	}
}

function findStudentIdByFirstNameLastName(fname, lname) {
	var result = 0;
	var list = getStudentList();
	if (null == list || list.length < 0) {
		return result;
	} else {
		$.each(list, function (i, theItem) {
			if (lname == theItem.lastName && fname == theItem.firstName) {
				result = theItem.id;
			}
		});
	}
	return result;
}

function getUniqueNameFromStudentList(list, nametype) {
	var names = [];
	var name;
	$.each(list, function (i, theItem) {
		if ("FIRST" == nametype) {
			name = theItem.firstName;
		} else if ("LAST" == nametype) {
			name = theItem.lastName;
		}
		
		if ($.inArray(name, names) < 0) {
			names.push(name);
		}
	});
	
	return names;
};

var studentList;
function setStudentList(list) {
	studentList = list;
}
function getStudentList() {
	return studentList;
}
