function handleStudentCheckInTabEvents() {
	console.log(" setup Student checkin event handle ...");
	
	$(document).on('change', '#studentCheckInClassCombobox', handleStudentCheckInClasComboboxChange);
	$(document).on('click', '#btnStudentCheckIn', handleStudentCheckInClick);
	$(document).on('change', '#studentcheckindiv input', handleInputTextChange);
//	$(document).on('change', '#txtStudentCheckInFirstName', handleInputTextChange);
//	$(document).on('change', '#txtStudentCheckInFirstName', handleInputTextChange);
	
};

function initStudentCheckinTab() {
	console.log(" init student checkin ... ");
	$('#studentcheckindiv').empty();
	
	$('#studentcheckindiv').append('Please input student First Name and Last Name to search');
	$('#studentcheckindiv').append('<br />');
	$('#studentcheckindiv').append('first name : ');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentCheckInFirstName'});
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
			if (404 == response.code) {
				alert(" Can't get class for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);

				$('#studentCheckInClassCombobox option[value!="default"]').remove();

				$.each(data, function (i, theItem) {
					$("#studentCheckInClassCombobox").append($("<option></option>").attr("value",theItem.id).text(theItem.name));
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

function getUniqueName(fieldname) {
	console.log(" get unique name for : " + fieldname);
	$.ajax({
		type: "GET",
		url: "../msd-app/msdstudent/nameautocomplete",
		dataType: "json",
		contentType: "application/json",
		data: {field: fieldname },
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't get class for check in process ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);

				if ("FIRSTNAME" == fieldname) {
				    $( "#txtStudentCheckInFirstName" ).autocomplete({
						source: data
					});
				};
				if ("LASTNAME" == fieldname) {
				    $( "#txtStudentCheckInLastName" ).autocomplete({
						source: data
					});
				}

			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			alert('error');
		}
	});
};

function handleInputTextChange(){
		if (null != this.value && $.trim(this.value).length > 0) {
			$(this).css("border", "");
		}
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
}