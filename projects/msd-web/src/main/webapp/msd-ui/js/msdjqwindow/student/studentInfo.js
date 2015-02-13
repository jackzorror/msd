function showStudentDetailInfo(data) {
	console.log(" In Show Student Detail Information ... ");
	var smp = $('#studentMainPanel');
	
	smp.empty();

	createStudentPanel();
	
	bindStudentDetailInfo(data);
	disableEditStudentDetailInfo(true);

	$('#btnEditStudent').jqxButton('val', "Edit");
	$('#btnSaveStudent').jqxButton('val', "Save");
	$('#btnSaveStudent').jqxButton('disabled', true);

	setCurrentFunction("SEARCH");
	
	bindingStudentMedicalPanel(data);
	disableEditMedicalInfo(true);

	$('#btnEditMedical').jqxButton('val', "Edit");
	$('#btnSaveMedical').jqxButton('val', "Save")
	$('#btnSaveMedical').jqxButton('disabled', true);
}

function createStudentPanel() {
	
	var smp = $('#studentMainPanel');
	smp.empty();

	// student detail information 
	var sdiv = $('<div style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentDetailDiv'});
	sdiv.append('<h4 style="margin-top:10px;">Student Detail Informatioin :</h4>');
	var scdiv = $('<div style="background:#e0e9f5;"></div>').attr({id:'studentDetailContentDiv'});
	
	smp.append(sdiv);
	sdiv.append(scdiv);

	createStudentDetailPanel();

	// student medical information
	var mdiv = $('<div style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentMedicalDetailDiv'});
	sdiv.append('<h4 style="margin-top:10px;">Student Medical Informatioin :</h4>');
	var mcdiv = $('<div style="background:#e0e9f5;"></div>').attr({id:'studentMedicalDetailContentDiv'});
	
	smp.append(mdiv);
	mdiv.append(mcdiv);
	
	createStudentMedicalPanel();
}

function createStudentDetailPanel() {
	var scdiv = $('#studentDetailContentDiv');
	var sndiv = $('<div  dock="left" style="width:450px;border:0px solid;"></div>').attr({id:'studentNameDiv'});
	var sgdiv = $('<div dock="right" style="border:0px solid;"></div>').attr({id:'studentGenderDiv'});
	var spdiv = $('<div dock="bottom" style="border:0px solid;"></div>').attr({id:'studentPhoneDiv'});
	
	scdiv.append(spdiv);
	scdiv.append(sndiv);
	scdiv.append(sgdiv);
	
	sndiv.append("<label>First Name : </label>");
	var fname = $('<input/>').attr({ type: 'text', id:'txtStudentFirstName'});
	sndiv.append(fname);
	fname.jqxInput({height:20, width:130, theme: getTheme()});

	sndiv.append("<label> Last Name : </label>");
	var lname = $('<input/>').attr({ type: 'text', id:'txtStudentLastName'}); 
	sndiv.append(lname);
	lname.jqxInput({height:20, width:130, theme: getTheme()});
	
	sndiv.append('<label style="float:left; margin-top:10px;">DOB :</label>');

	var dob = $('<div style="float:left; margin-top:6px; margin-left:5px;" />').attr({id:'dtinputStudentDob'});
	sndiv.append(dob);
	dob.jqxDateTimeInput({height:20, width:100, formatString: 'd', theme: getTheme()});
	
	sndiv.append('<label style="float:left; margin-top:10px; margin-left:10px;">Email :</label>');
	var email = $('<input style="float:left; margin-top:6px; margin-left:5px;"/>').attr({ type: 'text', id:'txtStudentEmail'}); 
	sndiv.append(email);
	email.jqxInput({height:20, width:230, theme: getTheme()});
	
	sgdiv.append("<label> Gender </label>");
	var mdiv = $('<div style="margin-left:10px;">Male</div>').attr({id:'rbtnGenderMale'});
	sgdiv.append(mdiv);
	mdiv.jqxRadioButton({ groupName :"Gender", boxSize:"10px", theme: getTheme()});
	
	var fdiv = $('<div style="margin-left:10px;">Female</div>').attr({id:'rbtnGenderFemale'});
	sgdiv.append(fdiv);
	fdiv.jqxRadioButton({ groupName :"Gender", boxSize:"10px", theme: getTheme()});
	
	spdiv.append('<label style="float:left; margin-top:10px;margin-left:15px;">Home Phone :</label>');
	var homePhone = $('<div style="float:left; margin-top:6px;margin-left:5px"/>').attr({id:'minputHomePhone'});
	spdiv.append(homePhone);
	homePhone.jqxMaskedInput({ width: 150, height: 20, mask: '(###) ### - ####', theme:getTheme()});
	
	spdiv.append('<label style="float:left; margin-top:10px;margin-left:25px;">School Name :</label>');
	var schoolName = $('<input style="float:left; margin-top:6px;margin-left:5px"/>').attr({type:'text', id:'txtSchoolName'});
	spdiv.append(schoolName);
	schoolName.jqxInput({height:20, width:200, theme:getTheme()});
	
	spdiv.append('<br />');
	spdiv.append('<label style="float:left; margin-top:10px;margin-left:29px;">Cell Phone :</label>');
	var cellPhone = $('<div style="float:left; margin-top:6px;margin-left:5px"/>').attr({id:'minputCellPhone'});
	spdiv.append(cellPhone);
	cellPhone.jqxMaskedInput({height:20, width:150, mask: '(###) ### - ####', theme:getTheme()});
	
	spdiv.append('<label style="float:left; margin-top:10px;margin-left:25px;">School Grade :</label>');
	var schoolGrade = $('<input style="float:left; margin-top:6px;margin-left:4px"/>').attr({type:'text', id:'txtSchoolGrade'});
	spdiv.append(schoolGrade);
	schoolGrade.jqxInput({height:20, width:200, theme:getTheme()});
	
	spdiv.append('<br />');
	spdiv.append('<label style="margin-top:10px;margin-left:3px;">Home Address :</label>');
	var homeAddress = $('<input style="margin-top:10px;margin-left:3px;"/>').attr({type:'text', id:'txtHomeAddress'});
	spdiv.append(homeAddress);
	homeAddress.jqxInput({height:20, width:480, theme:getTheme()});
	
	// Parent One Information
	var parentOneDiv = $('<div style="width:600px; margin-top:10px;border:0px solid;"></div>').attr({id:'parentOneDiv'});
	spdiv.append(parentOneDiv);
	
	parentOneDiv.append('<h5 style="margin-top:10px;">Parent One Informatioin :</h5>');
	
	parentOneDiv.append('<label style="margin-left:5px;">First Name :</label>');
	var parentOneFirstName = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentOneFirstName'});
	parentOneDiv.append(parentOneFirstName);
	parentOneFirstName.jqxInput({height:20, width:130, theme:getTheme()});
	
	parentOneDiv.append('<label style="margin-left:10px;">Last Name :</label>');
	var parentOneLastName = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentOneLastName'});
	parentOneDiv.append(parentOneLastName);
	parentOneLastName.jqxInput({height:20, width:130, theme:getTheme()});
	
	parentOneDiv.append('<label style="margin-left:10px;">Relation :</label>');
	var parentOneRelation = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentOneRelation'});
	parentOneDiv.append(parentOneRelation);
	parentOneRelation.jqxInput({height:20, width:60, theme:getTheme()});
	
	parentOneDiv.append('<label style="margin-top:10px; margin-left:40px;">Email :</label>');
	var parentOneEamil = $('<input style="margin-top:10px;margin-left:5px" />').attr({type:'text', id:'txtParentOneEmail'});
	parentOneDiv.append(parentOneEamil);
	parentOneEamil.jqxInput({height:20, width:460, theme:getTheme()});
	
	parentOneDiv.append('<br />');
	parentOneDiv.append('<label style="float:left; margin-top:10px; margin-left:8px;">Cell Phone :</label>');
	var parentOneCellPhone = $('<div style="float:left; margin-top:6px; margin-left:4px" />').attr({id:'minputParentOneCellPhone'});
	parentOneDiv.append(parentOneCellPhone);
	parentOneCellPhone.jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	
	parentOneDiv.append('<label style="float:left; margin-top:10px; margin-left:26px;">Work Phone :</label>');
	var parentOneWorkPhone = $('<div style="float:left; margin-top:6px; margin-left:5px" />').attr({id:'minputParentOneWorkPhone'});
	parentOneDiv.append(parentOneWorkPhone);
	parentOneWorkPhone.jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	parentOneDiv.append('<br />');
	parentOneDiv.append('<br />');
	
	// Parent Two Information
	var parentTwoDiv = $('<div style="width:600px;border:0px solid;"></div>').attr({id:'parentTwoDiv'});
	spdiv.append(parentTwoDiv);

	parentTwoDiv.append('<h5 style="margin-top:10px;">Parent Two Informatioin :</h5>');
	
	parentTwoDiv.append('<label style="margin-left:5px;">First Name :</label>');
	var parentTwoFirstName = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentTwoFirstName'});
	parentTwoDiv.append(parentTwoFirstName);
	parentTwoFirstName.jqxInput({height:20, width:130, theme:getTheme()});
	
	parentTwoDiv.append('<label style="margin-left:10px;">Last Name :</label>');
	var parentTwoLastName = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentTwoLastName'});
	parentTwoDiv.append(parentTwoLastName);
	parentTwoLastName.jqxInput({height:20, width:130, theme:getTheme()});
	
	parentTwoDiv.append('<label style="margin-left:10px;">Relation :</label>');
	var parentTwoRelation = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtParentTwoRelation'});
	parentTwoDiv.append(parentTwoRelation);
	parentTwoRelation.jqxInput({height:20, width:60, theme:getTheme()});
	
	parentTwoDiv.append('<label style="margin-top:10px; margin-left:40px;">Email :</label>');
	var parentTwoEamil = $('<input style="margin-top:10px;margin-left:5px" />').attr({type:'text', id:'txtParentTwoEmail'});
	parentTwoDiv.append(parentTwoEamil);
	parentTwoEamil.jqxInput({height:20, width:460, theme:getTheme()});
	
	parentTwoDiv.append('<br />');
	parentTwoDiv.append('<label style="float:left; margin-top:10px; margin-left:8px;">Cell Phone :</label>');
	var parentTwoCellPhone = $('<div style="float:left; margin-top:6px; margin-left:4px" />').attr({id:'minputParentTwoCellPhone'});
	parentTwoDiv.append(parentTwoCellPhone);
	parentTwoCellPhone.jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	
	parentTwoDiv.append('<label style="float:left; margin-top:10px; margin-left:26px;">Work Phone :</label>');
	var parentTwoWorkPhone = $('<div style="float:left; margin-top:6px; margin-left:5px" />').attr({id:'minputParentTwoWorkPhone'});
	parentTwoDiv.append(parentTwoWorkPhone);
	parentTwoWorkPhone.jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	parentTwoDiv.append('<br />');
	parentTwoDiv.append('<br />');
	
	var editbutton = $('<input style="float:right;margin-top:5px; margin-right:20px"/>').attr({ type: 'button', id:"btnEditStudent", value:"Edit"});
	spdiv.append(editbutton);
	editbutton.jqxButton({ width: 60, height: 20, theme:getTheme() });
	
	editbutton.on('click', function () {
		console.log(" edit student button click ... ");
		if ("SEARCH" == getCurrentFunction()) {
			if ("Edit" == $('#btnEditStudent').val()) {
				disableEditStudentDetailInfo(false);
				$('#txtStudentFirstName').focus();
				$('#btnEditStudent').val("Cancel");
				$('#btnSaveStudent').jqxButton('disabled', false);
			} else if ("Cancel" == $('#btnEditStudent').val()) {
				console.log (" cancel edit student information ... ");
				cancelUpdateStudentInformation();
				disableEditStudentDetailInfo(true);
				$("#btnEditStudent").val("Edit");
				$('#btnSaveStudent').jqxButton('disabled', true);
			}
		} else if ("ADD" == getCurrentFunction()) {
			$('#studentMainPanel').empty();
			disableButton(true);
		}
	}); 

	var savebutton = $('<input style="float:right; margin-top:5px; margin-right:10px;"/>').attr({ type: 'button', id:"btnSaveStudent", value:"Save"});
	spdiv.append(savebutton);
	savebutton.jqxButton({ width: 60, height: 20, theme:getTheme()});

	savebutton.on('click', function () {
		console.log(" save student button click ... ");
		if ("SEARCH" == getCurrentFunction()) {
			disableEditStudentDetailInfo(true);
			$("#btnEditStudent").val("Edit");
			var currentStudent = getCurrentStudent();
			var student = getStudentFromUI(currentStudent);
			
			ajaxUpdateStudentInformation(student, updateStudentInformation);
			
		} else if ("ADD" == getCurrentFunction()) {
			var student = getStudentFromUI(null);
			ajaxAddStudentInformation(student, addStudentInformation);
		}
	}); 

	scdiv.jqxDockPanel({ height: 430});
}

function createStudentMedicalPanel() {
	var smdcdiv = $('#studentMedicalDetailContentDiv');
	smdcdiv.empty();

	// Medical Insurance Information
	var medicalDiv = $('<div class="InnerDiv" style="width:600px; height:85px;border:0px solid;"></div>').attr({id:'medicalDiv'});
	smdcdiv.append(medicalDiv);
	
	medicalDiv.append('<h5>Medical Insurance Informatioin</h5>');
	medicalDiv.append('<label>Insurance Company :</label>');
	var medicalCompany = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtStudentInsuranceCompany'});
	medicalDiv.append(medicalCompany);
	medicalCompany.jqxInput({placeHolder: "Medical Insurance Company Name", height: 20, width: 240, minLength: 1, theme: getTheme()})

	medicalDiv.append('<label style="margin-left:5px;">Policy # :</label>');
	var policyNumber = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtStudentPolicyNumber'});
	medicalDiv.append(policyNumber);
	policyNumber.jqxInput({placeHolder: "Policy #", height: 20, width: 125, minLength: 1, theme: getTheme()});
	
	medicalDiv.append('<label style="float:left; margin-top:10px;margin-left:3px;">Pediatrician\'s Name :</label>');
	var pediatricianName = $('<input style="float:left; margin-top:6px; margin-left:5px;"/>').attr({type:'text', id:'txtStudentPediatricianName'});
	medicalDiv.append(pediatricianName);
	pediatricianName.jqxInput({placeHolder: "Pedictrician's Name", height: 20, width: 240, minLength: 1, theme: getTheme()});
	
	medicalDiv.append('<label style="float:left; margin-top:10px; margin-left:17px;">Phone :</label>');
	var pediatricianPhone = $('<div style="float:left; margin-top:6px; margin-left:5px;"/>').attr({id:'minputStudentPediatricianPhone'});
	medicalDiv.append(pediatricianPhone);
	pediatricianPhone.jqxMaskedInput({height: 20, width: 125, mask:'(###) ###-####', theme:getTheme()});
	
	// Emergency Notification
	var emergencyDiv = $('<div class="InnerDiv" style="width:600px; height:85px;border:0px solid;"></div>').attr({id:'emergencyDiv'});
	smdcdiv.append(emergencyDiv);
	
	emergencyDiv.append('<h5>Emergency Notification</h5>');
	emergencyDiv.append('<label style="margin-left:2px;">Contact Name :</label>');
	var emergencyName = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtStudentEmergencyName'});
	emergencyDiv.append(emergencyName);
	emergencyName.jqxInput({height: 20, width: 400, minLength: 1, theme: getTheme()})

	emergencyDiv.append('<label style="float:left; margin-top:10px;">Contact Phone :</label>');
	var emergencyPhone = $('<div style="float:left; margin-top:6px; margin-left:5px;"/>').attr({id:'minputStudentEmergencyPhone'});
	emergencyDiv.append(emergencyPhone);
	emergencyPhone.jqxMaskedInput({height:20, width:130, mask:'(###) ###-####', theme:getTheme()});
	
	emergencyDiv.append('<label style="float:left; margin-top:10px; margin-left:18px;">Alternate Phone :</label>');
	var emergencyAltPhone = $('<div style="float:left; margin-top:6px; margin-left:5px;"/>').attr({id:'minputStudentEmergencyAltPhone'});
	emergencyDiv.append(emergencyAltPhone);
	emergencyAltPhone.jqxMaskedInput({height:20, width:130, mask:'(###) ###-####', theme:getTheme()});
	
	var buttonDiv = $('<div style="width:600px; height:30px;"></div>').attr({id:'buttonDiv'});
	smdcdiv.append(buttonDiv);
	
	var editbutton = $('<input style="float:right;margin-top:10px; margin-right:0px"/>').attr({ type: 'button', id:"btnEditMedical", value:"Edit"});
	buttonDiv.append(editbutton);
	editbutton.jqxButton({ width: 60, height: 20, theme:getTheme() });

	editbutton.on('click', function () {
		console.log(" edit medical button click ... ");
		if ("SEARCH" == getCurrentFunction()) {
			if ("Edit" == $('#btnEditMedical').val()) {
				disableEditMedicalInfo(false);
				$('#txtStudentInsuranceCompany').focus();
				$('#btnEditMedical').val("Cancel");
				$('#btnSaveMedical').jqxButton('disabled', false);
			} else if ("Cancel" == $('#btnEditMedical').val()) {
				console.log (" cancel edit medical information ... ");
				cancelUpdateStudentMedicalInformation();
				disableEditMedicalInfo(true);
				$("#btnEditMedical").val("Edit");
				$('#btnSaveMedical').jqxButton('disabled', true);
			}
		} else if ("ADD" == getCurrentFunction()) {
			$('#studentMainPanel').empty();
			disableButton(true);
		}
	}); 

	var savebutton = $('<input style="float:right; margin-top:10px; margin-right:10px;"/>').attr({ type: 'button', id:"btnSaveMedical", value:"Save"});
	buttonDiv.append(savebutton);
	savebutton.jqxButton({ width: 60, height: 20, theme:getTheme()});

	savebutton.on('click', function () {
		console.log(" save student button click ... ");
		if ("SEARCH" == getCurrentFunction()) {
			disableEditMedicalInfo(true);
			$("#btnEditMedical").val("Edit");
			$('#btnSaveMedical').jqxButton('disabled', true);
			var currentStudent = getCurrentStudent();
			var student = getStudentFromUI(currentStudent);
			
			ajaxUpdateStudentInformation(student, updateStudentInformation);
			
		} else if ("ADD" == getCurrentFunction()) {
			var student = getStudentFromUI(null);
			ajaxAddStudentInformation(student, addStudentInformation);
		}
	});
};

function bindStudentDetailInfo(data) {
	if (null == data)
		return;
	
	// student information
	$('#txtStudentFirstName').jqxInput('val', data.firstName);
	$('#txtStudentLastName').jqxInput('val', data.lastName);
	var gender = data.gender || null;
	if (null != gender) {
		if (gender == 'M') 
			$('#rbtnGenderMale').jqxRadioButton('check');
		else 
			$('#rbtnGenderFemale').jqxRadioButton('check');
	}
	$('#dtinputStudentDob').jqxDateTimeInput('setDate', data.dob || null);
	$('#txtStudentEmail').jqxInput('val', data.emailAddress || null);
	$('#minputHomePhone').jqxMaskedInput('clearValue');
	$('#minputHomePhone').jqxMaskedInput('inputValue', data.homePhone || null);
	$('#txtSchoolName').jqxInput('val', data.schoolName || null);
	$('#minputCellPhone').jqxMaskedInput('clearValue');
	$('#minputCellPhone').jqxMaskedInput('inputValue', data.cellPhone || null);
	$('#txtSchoolGrade').jqxInput('val', data.schoolGrade || null);
	$('#txtHomeAddress').jqxInput('val', data.homeAddress || null);
	
	// parent one information 
	if (null != data.msdStudentParentDtos && data.msdStudentParentDtos.length > 0) {
	 	$('#txtParentOneFirstName').jqxInput('val', data.msdStudentParentDtos[0].firstName || null);
		$('#txtParentOneLastName').jqxInput('val', data.msdStudentParentDtos[0].lastName || null);
		$('#txtParentOneRelation').jqxInput('val', data.msdStudentParentDtos[0].relationship || null);
		$('#txtParentOneEmail').jqxInput('val', data.msdStudentParentDtos[0].emailAddress || null);
		$('#minputParentOneCellPhone').jqxMaskedInput('clearValue');
		$('#minputParentOneCellPhone').jqxMaskedInput('inputValue', data.msdStudentParentDtos[0].cellPhone || null);
		$('#minputParentOneWorkPhone').jqxMaskedInput('clearValue');
		$('#minputParentOneWorkPhone').jqxMaskedInput('inputValue', data.msdStudentParentDtos[0].workPhone || null);
	}
	// parent two information 
	if (null != data.msdStudentParentDtos && data.msdStudentParentDtos.length > 1) {
		$('#txtParentTwoFirstName').jqxInput('val', data.msdStudentParentDtos[1].firstName || null);
		$('#txtParentTwoLastName').jqxInput('val', data.msdStudentParentDtos[1].lastName || null);
		$('#txtParentTwoRelation').jqxInput('val', data.msdStudentParentDtos[1].relationship || null);
		$('#txtParentTwoEmail').jqxInput('val', data.msdStudentParentDtos[1].emailAddress || null);
		$('#minputParentTwoCellPhone').jqxMaskedInput('clearValue');
		$('#minputParentTwoCellPhone').jqxMaskedInput('inputValue', data.msdStudentParentDtos[1].cellPhone || null);
		$('#minputParentTwoWorkPhone').jqxMaskedInput('clearValue');
		$('#minputParentTwoWorkPhone').jqxMaskedInput('inputValue', data.msdStudentParentDtos[1].workPhone || null);
	}
}

function disableEditStudentDetailInfo(disable) {
	$("#studentDetailContentDiv :text").prop("disabled", disable);
	$("#studentDetailContentDiv div[id^='minput']").jqxMaskedInput({disabled:disable});
	$("#studentDetailContentDiv div[id^='dtinput']").jqxDateTimeInput({disabled:disable});
	$("#studentDetailContentDiv div[id^='rbtn']").jqxRadioButton({ disabled:disable }); 
}

function bindingStudentMedicalPanel(data) {
	// medical information
	if (null != data.msdStudentMedicalInfoDto) {
		$('#txtStudentInsuranceCompany').jqxInput('val', data.msdStudentMedicalInfoDto.insuranceCompany || null);
		$('#txtStudentPolicyNumber').jqxInput('val', data.msdStudentMedicalInfoDto.policyNumber || null);
		$('#txtStudentPediatricianName').jqxInput('val', data.msdStudentMedicalInfoDto.pediatricianName || null);
		$('#minputStudentPediatricianPhone').jqxMaskedInput('clearValue');
		$('#minputStudentPediatricianPhone').jqxMaskedInput('inputValue', data.msdStudentMedicalInfoDto.phone || null);
		$('#txtStudentEmergencyName').jqxInput('val', data.msdStudentMedicalInfoDto.emergencyName || null);
		$('#minputStudentEmergencyPhone').jqxMaskedInput('clearValue');
		$('#minputStudentEmergencyPhone').jqxMaskedInput('inputValue', data.msdStudentMedicalInfoDto.emergencyPhone || null);
		$('#minputStudentEmergencyAltPhone').jqxMaskedInput('clearValue');
		$('#minputStudentEmergencyAltPhone').jqxMaskedInput('inputValue', data.msdStudentMedicalInfoDto.emergencyPhoneAlt || null);
	}
}

function disableEditMedicalInfo(disable) {
	$("#studentMedicalDetailContentDiv :text").prop("disabled", disable);
	$("#studentMedicalDetailContentDiv div[id^='minput']").jqxMaskedInput({disabled:disable});
}

function updateStudentInformation(response) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (201 == response.code) {
		console.log(" update student successfully ... ");
		data = $.parseJSON(response.result);
		setCurrentStudent(data);
		$("#txtStudentSearchFirstName").val(data.firstName);
		$("#txtStudentSearchLastName").val(data.lastName);
		$('#btnSaveStudent').jqxButton('disabled', true);

		// reload student first/last name list
		ajaxGetUniqueName("FIRSTNAME", getUniqueFirstNameForStudent);
		ajaxGetUniqueName("LASTNAME",getUniqueLasstNameForStudent);
	} else {
		alert('error');
	}
};

function addStudentInformation(response) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add student successfully ... ");
		data = $.parseJSON(response.result);
		setCurrentStudent(data);
		showStudentDetailInfo(data);
		$("#txtStudentSearchFirstName").val(data.firstName);
		$("#txtStudentSearchLastName").val(data.lastName);
				
		// reload student first/last name list
		ajaxGetUniqueName("FIRSTNAME", getUniqueFirstNameForStudent);
		ajaxGetUniqueName("LASTNAME",getUniqueLasstNameForStudent);
	} else {
		alert('error');
	}
}


function getStudentFromUI(s) {
	var sid, sm, p1, p2, ps = null;
	
	if (null != s) 
		sid = s.id
	else 
		sid = 0;

	var sm = getStudentMedicalInfo(s);
	var p1 = getStudentParentInfo(s, 1);
	var p2 = getStudentParentInfo(s, 2);
	
	var ps = [p1, p2];
	var gender;
	if ($('#rbtnGenderMale').val())
		gender ='M';
	else if ($('#rbtnGenderFemale').val())
		gender ='F';
	else
		gender = '';
		
	var isActive;
	if (null != s)
		isActive = s.isActive;
	else 
		isActive = 1;
		
	var student = {
		"id":sid, 
		"firstName":$("#txtStudentFirstName").val(), 
		"lastName":$("#txtStudentLastName").val(),
		"gender":gender,	
		"dob":$('#dtinputStudentDob').jqxDateTimeInput('getDate'),	
		"emailAddress":$('#txtStudentEmail').val(),	
		"homePhone":$('#minputHomePhone').jqxMaskedInput('inputValue'),	
		"schoolName":$('#txtSchoolName').val(),	
		"cellPhone":$('#minputCellPhone').jqxMaskedInput('inputValue'),	
		"schoolGrade":$('#txtSchoolGrade').val(),	
		"homeAddress":$('#txtHomeAddress').val(),	
		"msdStudentParentDtos":ps,	
		"msdStudentMedicalInfoDto":sm,
		"isActive":(null != s ? s.isActive : 1)
	};
	return student;
}

function getStudentMedicalInfo(s) {
	var sm = null;
	var id = null;
	
	var insuranceCompany = $('#txtStudentInsuranceCompany').val();
	var policyNumber = $('#txtStudentPolicyNumber').val();
	var pediatricianName = $('#txtStudentPediatricianName').val();
	var phone = $('#minputStudentPediatricianPhone').jqxMaskedInput('inputValue');
	var emergencyName = $('#txtStudentEmergencyName').val();
	var emergencyPhone = $('#minputStudentEmergencyPhone').jqxMaskedInput('inputValue');
	var emergencyPhoneAlt = $('#minputStudentEmergencyAltPhone').jqxMaskedInput('inputValue');
	
	if (null != s) {
		if (null != s.msdStudentMedicalInfoDto)
			id = s.msdStudentMedicalInfoDto.id;
	 	else 
	 		if (insuranceCompany || policyNumber || pediatricianName || phone || emergencyName || emergencyPhone || emergencyPhoneAlt)
	 			id = 0;
		
	} else {
		id = 0;
	}
	
	if (null != id) {
		sm = {
			"insuranceCompany":insuranceCompany,
			"policyNumber":policyNumber,
			"pediatricianName":pediatricianName,
			"phone":phone,
			"emergencyName":emergencyName,
			"emergencyPhone":emergencyPhone,
			"emergencyPhoneAlt":emergencyPhoneAlt,
			"id":id
		};
	}
	
	return sm;
}

function getStudentParentInfo(s, t) {
	var p = null;
	var id = null;
	
	var cellPhone = (t == 1 ? $('#minputParentOneCellPhone').jqxMaskedInput('inputValue') :
							$('#minputParentTwoCellPhone').jqxMaskedInput('inputValue'));
	var emailAddress = (t == 1 ? $('#txtParentOneEmail').val() : $('#txtParentTwoEmail').val());
	var firstName = (t == 1 ? $('#txtParentOneFirstName').val() : $('#txtParentTwoFirstName').val());
	var lastName = (t == 1 ? $('#txtParentOneLastName').val() : $('#txtParentTwoLastName').val());
	var relationship = (t == 1 ? $('#txtParentOneRelation').val() : $('#txtParentTwoRelation').val());
	var workPhone = (t == 1 ? $('#minputParentOneWorkPhone').jqxMaskedInput('inputValue') :
							$('#minputParentTwoWorkPhone').jqxMaskedInput('inputValue'));
	
	if (null != s) {
		if (null != s.msdStudentParentDtos && s.msdStudentParentDtos.length > 0) 
			id = s.msdStudentParentDtos[t-1].id;
		else 
			if (cellPhone || emailAddress || firstName || lastName || relationship || workPhone)
				id = 0;
	} else {
		id = 0;
	}
	
	if (null !=id) {
		p = {
			"cellPhone":cellPhone,
			"emailAddress":emailAddress,
			"firstName":firstName,
			"id":id,
			"lastName":lastName,
			"relationship":relationship,
			"workPhone":workPhone,
		};
	}
	
	return p;
}

function cancelUpdateStudentInformation() {
	var currentStudent = getCurrentStudent();
	bindStudentDetailInfo(currentStudent);
};

function cancelUpdateStudentMedicalInformation() {
	var currentStudent = getCurrentStudent();
	bindingStudentMedicalPanel(currentStudent);
}

function getPhoneType() {
	return ["Home", "Mobile","Work"];
}
