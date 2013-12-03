function handleCheckInTabEvents() {
	console.log(" setup check in tab event handle ...");
	
	$(document).on('change', '#checkinClassCombobox', handleCheckinClasComboboxChange);
	$(document).on('click', '#btnInClassStudentCheckInSearch', handleInClassStudentCheckInSearchClick);
	$(document).on('click', '#inClassStudentCheckinButton :button', handleStudentCheckInClick);
	$(document).on('click', '#btnNonClassStudentCheckinSearch', handleNonClassstudentCheckInSearchClick);
	$(document).on('click', '#nonClassStudentCheckinButton :button', handleStudentCheckInClick); 
	
};

function initCheckinTab() {
	console.log(" init check in tab ... ");
	$('#msdcheckindiv').empty();
	
	$('#msdcheckindiv').append('Please select class: ');
	var classlist = $('<select/>').attr({id:'checkinClassCombobox'});
	var defaultopption = $('<option>').val('default').text('Select one ...');
	classlist.append(defaultopption);
	$('#msdcheckindiv').append(classlist);
	var searchbutton = $('<input/>').attr({ type: 'button', id:'btnInClassStudentCheckInSearch', value:'Search', disabled:true});
	$('#msdcheckindiv').append(searchbutton);
	var inclassdiv = $('<div/>').attr({id:'inClassStudentCheckinButton'});
	$('#msdcheckindiv').append(inclassdiv);
	
	$('#msdcheckindiv').append('If student not register to above class, or this is a makeup class please input student name to check in.<br />');
	$('#msdcheckindiv').append('first name : ');
	var searchfname = $('<input/>').attr({ type: 'text', id:'txtNonClassStudentSearchFirstName'});
	$('#msdcheckindiv').append(searchfname);
	$('#msdcheckindiv').append('last name: ');
	var searchlname = $('<input/>').attr({type: 'text', id:'txtNonClassStudentSearchLastName'});
	$('#msdcheckindiv').append(searchlname);
	var searchbutton = $('<input/>').attr({type: 'button', id:'btnNonClassStudentCheckinSearch',value:'search', disabled:true});
	$('#msdcheckindiv').append(searchbutton);
	var nonclassdiv = $('<div/>').attr({id:'nonClassStudentCheckinButton'});
	$('#msdcheckindiv').append(nonclassdiv);

	getCheckInClassList();

};

function getCheckInClassList() {
	console.log('in getCheckInClassList ... ');
	$.ajax({
		type: "GET",
		url: "../msd-app/msdclass",
		dataType: "json",
		contentType: "application/json",
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get class for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);

				$('#checkinClassCombobox option[value!="default"]').remove();

				$.each(data, function (i, theItem) {
					$("#checkinClassCombobox").append($("<option></option>").attr("value",theItem.id).text(theItem.name));
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

function handleCheckinClasComboboxChange() {
	if ($('#checkinClassCombobox').val() != "" && "default" != $('#checkinClassCombobox').val()) {
		$('#btnInClassStudentCheckInSearch').prop('disabled', false);
		$('#btnNonClassStudentCheckinSearch').prop('disabled',false);
	} else {
		$('#btnInClassStudentCheckInSearch').prop('disabled', true);
		$('#btnNonClassStudentCheckinSearch').prop('disabled', true);
	}
			
	$('#inClassStudentCheckinButton').empty();
	$('#nonClassStudentCheckinButton').empty();
}

function handleInClassStudentCheckInSearchClick() {
	console.log(" search student for check in process .. ");
	var checkinclasses = $('#checkinClassCombobox').val();
	if (null == checkinclasses || checkinclasses.length == 0) {
		alert("please select one class from the list");
	} else {
		getStudentCheckInDtoList(checkinclasses);
	}
};

function getStudentCheckInDtoList(classid) {
	console.log("in getStudentCheckInDtoList ... ");

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudentcheckin",
		data: { msdclassid: classid, type: 'checkin' },
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get student list for check in class : " + classid);
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				$("#inClassStudentCheckinButton").empty();

				$.each(data, function (i, theItem) {
					var newbutton = $('<input/>').attr({ type: 'button', id:'btnStudentCheckIn_' + theItem.studentId, value:theItem.name});
					if (theItem.checkedIn) {
						newbutton.prop("disabled", true);
					}
					$("#inClassStudentCheckinButton").append(newbutton);
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

function handleStudentCheckInClick () {
	console.log(' click new button .. ' + this.id);
	checkInStudent(this.id, $("#checkinClassCombobox").val());
}

function checkInStudent(btnid, cid) {
	var sid = btnid.substring(18);
	var checkintime = new Date();

	var scheckin = { "checkInTime":checkintime, "classId":cid, "id":0, "studentId":sid };
			
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
				$("#" + btnid).prop("disabled",true);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			alert('error');
		}
	});
};

function handleNonClassstudentCheckInSearchClick() {
	console.log(" search non class student for check in process .. ");
	var fname = $.trim($('#txtNonClassStudentSearchFirstName').val());
	var lname = $.trim($('#txtNonClassStudentSearchLastName').val());
	if ((null == fname || fname.length == 0) ||
	    (null == lname || lname.length == 0)) {
	    alert("please input both last name and first name");
	} else {
		getNonClassStudentCheckInDto(lname, fname, $("#checkinClassCombobox").val());
	}
};

function getNonClassStudentCheckInDto(lname, fname, cid) {
	console.log(' get non class checkin  student ... ');
			
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdstudentcheckin",
		data: { msdclassid:cid, firstname: fname, lastname: lname, type: 'checkin' },
		success: function(response) {
			console.log(" get non class student for check in ");
			if (404 == response.code) {
				alert(" Can't found student, Please check your input ... ");
				$('#txtNonClassStudentSearchFirstName').focus();

			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				$('#txtNonClassStudentSearchFirstName').val("");
				$('#txtNonClassStudentSearchLastName').val("");
					
				var btnid="btnStudentCheckIn_" + data.studentId;
				var newbutton = document.getElementById(btnid);

				if (null == newbutton) {
					newbutton = $('<input/>').attr({ type: 'button', id:btnid, value:data.name});
					$('#nonClassStudentCheckinButton').append(newbutton);
				} 
				if (data.checkedIn) {
					alert("you already checked in");
					$("#" + btnid).prop("disabled",true);
				} else {
					$("#" + btnid).focus();
				}
			} else {
				alert ('error to get non class student for check in ...');
			}
		},
		error: function(msg, url, line) {
			alert('error to get non class student for check in ... ');
		}
	});
};
		
