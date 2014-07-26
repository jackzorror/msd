// UI Creature
function initStudentTab() {
	console.log(" init student tab ... ");

	$('#studentControlPanel').empty();
	
	var namediv = $('<div/>').attr({id:'namediv', class:'infodiv'});
	$('#studentSearchPanel').append(namediv);

	$('#namediv').append('<label style="margin-left:10px;">Please input student </label>');
	$('#namediv').append('<label>first name : </label>');
	var fname = $('<input/>').attr({type:'text', id:'txtStudentSearchFirstName'});
	$('#namediv').append(fname);
	$('#txtStudentSearchFirstName').jqxInput({placeHolder: "First Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	$('#namediv').append('<label style="margin-left: 10px;"> last name : </label>');
	var lname = $('<input/>').attr({type:'text', id:'txtStudentSearchLastName'});
	$('#namediv').append(lname);
	$('#txtStudentSearchLastName').jqxInput({placeHolder: "Last Name: ", height: 20, width: 100, minLength: 1, theme: getTheme() });

	var cbutton = $('<input style="float:right;margin-right:10px;" />').attr({type:'button', id:'btnClearStudent', value:'clear'});
	$('#namediv').append(cbutton);
	$('#btnClearStudent').jqxButton({ width: '80', theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnSearchStudent', value:'search'});
	$('#namediv').append(sbutton);
	$('#btnSearchStudent').jqxButton({ width: '80', theme: getTheme() });

	var abutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnAddStudent', value:'New Student'});
	$('#studentControlPanel').append(abutton);
	$('#btnAddStudent').jqxButton({ width: '100', theme: getTheme() });
	
	var rbutton = $('<input style="float:left; margin-top:10px; margin-left:3px;" />').attr({type:'button', id:'btnRegistClass', value:'Register Class'});
	$('#studentControlPanel').append(rbutton);
	$('#btnRegistClass').jqxButton({width:'100', theme: getTheme() });
};

function showStudentInformation(data) {
	createStudentPanel();
	
	bindStudentDetailInfo(data);
	disableEditStudentDetailInfo(true);

	$('#btnEditStudent').jqxButton('val', "Edit");
	$('#btnSaveStudent').jqxButton('val', "Save")
	$('#btnSaveStudent').jqxButton('disabled', true);

	setCurrentFunction("SEARCH");
	createStudentRegisterClassPanel();	
	getStudentRegisterClass(data);
	getNonRegisteredClassList(data);
	
	bindingStudentMedicalPanel(data);
	disableEditMedicalInfo(true);

	$('#btnEditMedical').jqxButton('val', "Edit");
	$('#btnSaveMedical').jqxButton('val', "Save")
	$('#btnSaveMedical').jqxButton('disabled', true);
};

function createStudentPanel() {
	
	$('#studentMainPanel').empty();

	// student detail information 
	var sdiv = $('<div class="accord" style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentDetailDiv'});
	var stdiv = $('<div class="title">Student Detail Information </div>').attr({id:'studentDetailTitleDiv'});
	var scdiv = $('<div class="content" style="background:#e0e9f5;"></div>').attr({id:'studentDetailContentDiv'});
	
	$('#studentMainPanel').append(sdiv);
	$('#studentDetailDiv').append(stdiv);
	$('#studentDetailDiv').append(scdiv);

	createStudentDetailPanel();
	$('#studentDetailDiv').raaccordion();

	// student register class information
	var cdiv = $('<div class="accord" style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentClassDetailDiv'});
	var ctdiv = $('<div class="title">Student Register Class Information </div>').attr({id:'studentClassDetailTitleDiv'});
	var ccdiv = $('<div class="content" style="background:#e0e9f5;"></div>').attr({id:'studentClassDetailContentDiv'});
	
	$('#studentMainPanel').append(cdiv);
	$('#studentClassDetailDiv').append(ctdiv);
	$('#studentClassDetailDiv').append(ccdiv);
	
	$('#studentClassDetailDiv').raaccordion();

	// student medical information
	var mdiv = $('<div class="accord" style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentMedicalDetailDiv'});
	var mtdiv = $('<div class="title">Student Medical Information </div>').attr({id:'studentMedicalDetailTitleDiv'});
	var mcdiv = $('<div class="content" style="background:#e0e9f5;"></div>').attr({id:'studentMedicalDetailContentDiv'});
	
	$('#studentMainPanel').append(mdiv);
	$('#studentMedicalDetailDiv').append(mtdiv);
	$('#studentMedicalDetailDiv').append(mcdiv);
	
	createStudentMedicalPanel();
	$('#studentMedicalDetailDiv').raaccordion();

}

function createStudentDetailPanel() {
	var sndiv = $('<div  dock="left" style="width:450px;"></div>').attr({id:'studentNameDiv'});
	var sgdiv = $('<div dock="right"></div>').attr({id:'studentGenderDiv'});
	var spdiv = $('<div dock="bottom"></div>').attr({id:'studentPhoneDiv'});
	
	$('#studentDetailContentDiv').append(spdiv);
	$('#studentDetailContentDiv').append(sndiv);
	$('#studentDetailContentDiv').append(sgdiv);
	
	$('#studentNameDiv').append("<label>First Name : </label>");
	var fname = $('<input/>').attr({ type: 'text', id:'txtStudentFirstName'});
	$('#studentNameDiv').append(fname);
	$('#txtStudentFirstName').jqxInput({height:20, width:130, theme: getTheme()});


	$('#studentNameDiv').append("<label> Last Name : </label>");
	var lname = $('<input/>').attr({ type: 'text', id:'txtStudentLastName'}); 
	$('#studentNameDiv').append(lname);
	$('#txtStudentLastName').jqxInput({height:20, width:130, theme: getTheme()});
	
	$('#studentNameDiv').append('<br />');
	$('#studentNameDiv').append('<label style="float:left; margin-top:10px;">DOB :</label>');

	var dob = $('<div style="float:left; margin-top:10px; margin-left:10px;" />').attr({id:'dtinputStudentDob'});
	$('#studentNameDiv').append(dob);
	$('#dtinputStudentDob').jqxDateTimeInput({height:20, width:100, formatString: 'd', theme: getTheme()});
	
	$('#studentNameDiv').append('<label style="float:left; margin-top:10px; margin-left:10px;">Email :</label>');
	var email = $('<input style="float:left; margin-top:10px;"/>').attr({ type: 'text', id:'txtStudentEmail'}); 
	$('#studentNameDiv').append(email);
	$('#txtStudentEmail').jqxInput({height:20, width:230, theme: getTheme()});
	
	$('#studentGenderDiv').append("<label> Gender </label>");
	var mdiv = $('<div style="margin-left:10px;">Male</div>').attr({id:'rbtnGenderMale'});
	$('#studentGenderDiv').append(mdiv);
	$('#rbtnGenderMale').jqxRadioButton({ groupName :"Gender", boxSize:"10px", theme: getTheme()});
	
	var fdiv = $('<div style="margin-left:10px;">Female</div>').attr({id:'rbtnGenderFemale'});
	$('#studentGenderDiv').append(fdiv);
	$('#rbtnGenderFemale').jqxRadioButton({ groupName :"Gender", boxSize:"10px", theme: getTheme()});
	
	$('#studentPhoneDiv').append('<label style="float:left; margin-top:10px;margin-left:15px;">Home Phone :</label>');
	var homePhone = $('<div style="float:left; margin-top:10px;"/>').attr({id:'minputHomePhone'});
	$('#studentPhoneDiv').append(homePhone);
	$('#minputHomePhone').jqxMaskedInput({ width: 150, height: 20, mask: '(###) ### - ####', theme:getTheme()});
	
	$('#studentPhoneDiv').append('<label style="float:left; margin-top:10px;margin-left:30px;">School Name :</label>');
	var schoolName = $('<input style="float:left; margin-top:10px;"/>').attr({type:'text', id:'txtSchoolName'});
	$('#studentPhoneDiv').append(schoolName);
	$('#txtSchoolName').jqxInput({height:20, width:200, theme:getTheme()});
	
	$('#studentPhoneDiv').append('<br />');
	$('#studentPhoneDiv').append('<label style="float:left; margin-top:10px;margin-left:30px;">Cell Phone :</label>');
	var cellPhone = $('<div style="float:left; margin-top:10px;"/>').attr({id:'minputCellPhone'});
	$('#studentPhoneDiv').append(cellPhone);
	$('#minputCellPhone').jqxMaskedInput({height:20, width:150, mask: '(###) ### - ####', theme:getTheme()});
	
	$('#studentPhoneDiv').append('<label style="float:left; margin-top:10px;margin-left:30px;">School Grade :</label>');
	var schoolGrade = $('<input style="float:left; margin-top:10px;"/>').attr({type:'text', id:'txtSchoolGrade'});
	$('#studentPhoneDiv').append(schoolGrade);
	$('#txtSchoolGrade').jqxInput({height:20, width:200, theme:getTheme()});
	
	$('#studentPhoneDiv').append('<br />');
	$('#studentPhoneDiv').append('<label style="margin-top:10px;margin-left:4px;">Home Address :</label>');
	var homeAddress = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtHomeAddress'});
	$('#studentPhoneDiv').append(homeAddress);
	$('#txtHomeAddress').jqxInput({height:20, width:480, theme:getTheme()});
	
	// Parent One Information
	var parentOneDiv = $('<div style="width:600px; margin-top:10px;"></div>').attr({id:'parentOneDiv'});
	$('#studentPhoneDiv').append(parentOneDiv);
	
	$('#parentOneDiv').append('<h5 style="margin-top:20px;">Parent One Informatioin :</h5>');
	
	$('#parentOneDiv').append('<label style="margin-left:5px;">First Name :</label>');
	var parentOneFirstName = $('<input/>').attr({type:'text', id:'txtParentOneFirstName'});
	$('#parentOneDiv').append(parentOneFirstName);
	$('#txtParentOneFirstName').jqxInput({height:20, width:130, theme:getTheme()});
	
	$('#parentOneDiv').append('<label style="margin-left:10px;">Last Name :</label>');
	var parentOneLastName = $('<input/>').attr({type:'text', id:'txtParentOneLastName'});
	$('#parentOneDiv').append(parentOneLastName);
	$('#txtParentOneLastName').jqxInput({height:20, width:130, theme:getTheme()});
	
	$('#parentOneDiv').append('<label style="margin-left:10px;">Relation :</label>');
	var parentOneRelation = $('<input/>').attr({type:'text', id:'txtParentOneRelation'});
	$('#parentOneDiv').append(parentOneRelation);
	$('#txtParentOneRelation').jqxInput({height:20, width:70, theme:getTheme()});
	
	$('#parentOneDiv').append('<label style="margin-top:10px; margin-left:40px;">Email :</label>');
	var parentOneEamil = $('<input style="margin-top:10px;" />').attr({type:'text', id:'txtParentOneEmail'});
	$('#parentOneDiv').append(parentOneEamil);
	$('#txtParentOneEmail').jqxInput({height:20, width:455, theme:getTheme()});
	
	$('#parentOneDiv').append('<br />');
	$('#parentOneDiv').append('<label style="float:left; margin-top:10px; margin-left:8px;">Cell Phone :</label>');
	var parentOneCellPhone = $('<div style="float:left; margin-top:10px;" />').attr({id:'minputParentOneCellPhone'});
	$('#parentOneDiv').append(parentOneCellPhone);
	$('#minputParentOneCellPhone').jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	
	$('#parentOneDiv').append('<label style="float:left; margin-top:10px; margin-left:26px;">Work Phone :</label>');
	var parentOneWorkPhone = $('<div style="float:left; margin-top:10px;" />').attr({id:'minputParentOneWorkPhone'});
	$('#parentOneDiv').append(parentOneWorkPhone);
	$('#minputParentOneWorkPhone').jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	$('#parentOneDiv').append('<br />');
	$('#parentOneDiv').append('<br />');
	
	// Parent Two Information
	var parentTwoDiv = $('<div style="width:600px;"></div>').attr({id:'parentTwoDiv'});
	$('#studentPhoneDiv').append(parentTwoDiv);

	$('#parentTwoDiv').append('<h5 style="margin-top:20px;">Parent Two Informatioin :</h5>');
	
	$('#parentTwoDiv').append('<label style="margin-left:5px;">First Name :</label>');
	var parentTwoFirstName = $('<input/>').attr({type:'text', id:'txtParentTwoFirstName'});
	$('#parentTwoDiv').append(parentTwoFirstName);
	$('#txtParentTwoFirstName').jqxInput({height:20, width:130, theme:getTheme()});
	
	$('#parentTwoDiv').append('<label style="margin-left:10px;">Last Name :</label>');
	var parentTwoLastName = $('<input/>').attr({type:'text', id:'txtParentTwoLastName'});
	$('#parentTwoDiv').append(parentTwoLastName);
	$('#txtParentTwoLastName').jqxInput({height:20, width:130, theme:getTheme()});
	
	$('#parentTwoDiv').append('<label style="margin-left:10px;">Relation :</label>');
	var parentTwoRelation = $('<input/>').attr({type:'text', id:'txtParentTwoRelation'});
	$('#parentTwoDiv').append(parentTwoRelation);
	$('#txtParentTwoRelation').jqxInput({height:20, width:70, theme:getTheme()});
	
	$('#parentTwoDiv').append('<label style="margin-top:10px; margin-left:40px;">Email :</label>');
	var parentTwoEamil = $('<input style="margin-top:10px;" />').attr({type:'text', id:'txtParentTwoEmail'});
	$('#parentTwoDiv').append(parentTwoEamil);
	$('#txtParentTwoEmail').jqxInput({height:20, width:455, theme:getTheme()});
	
	$('#parentTwoDiv').append('<br />');
	$('#parentTwoDiv').append('<label style="float:left; margin-top:10px; margin-left:8px;">Cell Phone :</label>');
	var parentTwoCellPhone = $('<div style="float:left; margin-top:10px;" />').attr({id:'minputParentTwoCellPhone'});
	$('#parentTwoDiv').append(parentTwoCellPhone);
	$('#minputParentTwoCellPhone').jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	
	$('#parentTwoDiv').append('<label style="float:left; margin-top:10px; margin-left:26px;">Work Phone :</label>');
	var parentTwoWorkPhone = $('<div style="float:left; margin-top:10px;" />').attr({id:'minputParentTwoWorkPhone'});
	$('#parentTwoDiv').append(parentTwoWorkPhone);
	$('#minputParentTwoWorkPhone').jqxMaskedInput({height:20, width:170, mask:'(###) ### - ####', theme:getTheme()});
	
	var editbutton = $('<input style="float:right;margin-top:10px; margin-right:10px"/>').attr({ type: 'button', id:"btnEditStudent", value:"Edit"});
	$('#studentPhoneDiv').append(editbutton);
	$('#btnEditStudent').jqxButton({ width: 60, height: 20, theme:getTheme() });

	var savebutton = $('<input style="float:right; margin-top:10px; margin-right:10px;"/>').attr({ type: 'button', id:"btnSaveStudent", value:"Save"});
	$('#studentPhoneDiv').append(savebutton);
	$('#btnSaveStudent').jqxButton({ width: 60, height: 20, theme:getTheme()});

	
	$('#studentDetailContentDiv').jqxDockPanel({ width: 608, height: 450});
}

function createStudentMedicalPanel() {
	$('#studentMedicalDetailContentDiv').empty();

	// Medical Insurance Information
	var medicalDiv = $('<div class="InnerDiv" style="width:600px; height:100px;"></div>').attr({id:'medicalDiv'});
	$('#studentMedicalDetailContentDiv').append(medicalDiv);
	
	$('#medicalDiv').append('<h5>Medical Insurance Informatioin</h5>');
	$('#medicalDiv').append('<label>Insurance Company :</label>');
	var medicalCompany = $('<input/>').attr({type:'text', id:'txtStudentInsuranceCompany'});
	$('#medicalDiv').append(medicalCompany);
	$('#txtStudentInsuranceCompany').jqxInput({placeHolder: "Medical Insurance Company Name", height: 20, width: 250, minLength: 1, theme: getTheme()})
//	$('#txtStudentInsuranceCompany').on('textchanged', studentMedicalInfoChange());

	$('#medicalDiv').append('<label style="margin-left:5px;">Policy # :</label>');
	var policyNumber = $('<input style="marign-left:5px;"/>').attr({type:'text', id:'txtStudentPolicyNumber'});
	$('#medicalDiv').append(policyNumber);
	$('#txtStudentPolicyNumber').jqxInput({placeHolder: "Policy #", height: 20, width: 125, minLength: 1, theme: getTheme()});
	
	$('#medicalDiv').append('<label style="float:left; margin-top:10px;margin-left:3px;">Pediatrician\'s Name :</label>');
	var pediatricianName = $('<input style="float:left; margin-top:10px; marign-left:5px;"/>').attr({type:'text', id:'txtStudentPediatricianName'});
	$('#medicalDiv').append(pediatricianName);
	$('#txtStudentPediatricianName').jqxInput({placeHolder: "Pedictrician's Name", height: 20, width: 200, minLength: 1, theme: getTheme()});
	
	$('#medicalDiv').append('<label style="float:left; margin-top:10px; margin-left:10px;">Phone :</label>');
	var pediatricianPhone = $('<div style="float:left; margin-top:10px; marign-left:5px;"/>').attr({id:'minputStudentPediatricianPhone'});
	$('#medicalDiv').append(pediatricianPhone);
	$('#minputStudentPediatricianPhone').jqxMaskedInput({height: 20, width: 180, mask:'(###) ###-####', theme:getTheme()});
	
	// Emergency Notification
	var emergencyDiv = $('<div class="InnerDiv" style="width:600px; height:70px;"></div>').attr({id:'emergencyDiv'});
	$('#studentMedicalDetailContentDiv').append(emergencyDiv);
	
	$('#emergencyDiv').append('<h5>Emergency Notification</h5>');
	$('#emergencyDiv').append('<label style="float:left;">Name :</label>');
	var emergencyName = $('<input style="float:left;"/>').attr({type:'text', id:'txtStudentEmergencyName'});
	$('#emergencyDiv').append(emergencyName);
	$('#txtStudentEmergencyName').jqxInput({height: 20, width: 150, minLength: 1, theme: getTheme()})

	$('#emergencyDiv').append('<label style="float:left; margin-left:5px;">Phone :</label>');
	var emergencyPhone = $('<div style="float:left; marign-left:5px;"/>').attr({id:'minputStudentEmergencyPhone'});
	$('#emergencyDiv').append(emergencyPhone);
	$('#minputStudentEmergencyPhone').jqxMaskedInput({height:20, width:100, mask:'(###) ###-####', theme:getTheme()});
	
	$('#emergencyDiv').append('<label style="float:left; margin-left:5px;">Alternate Phone :</label>');
	var emergencyAltPhone = $('<div style="float:left; marign-left:5px;"/>').attr({id:'minputStudentEmergencyAltPhone'});
	$('#emergencyDiv').append(emergencyAltPhone);
	$('#minputStudentEmergencyAltPhone').jqxMaskedInput({height:20, width:100, mask:'(###) ###-####', theme:getTheme()});
	
	var buttonDiv = $('<div style="width:600px; height:30px;"></div>').attr({id:'buttonDiv'});
	$('#studentMedicalDetailContentDiv').append(buttonDiv);
	
	var editbutton = $('<input style="float:right;margin-top:10px; margin-right:10px"/>').attr({ type: 'button', id:"btnEditMedical", value:"Edit"});
	$('#buttonDiv').append(editbutton);
	$('#btnEditMedical').jqxButton({ width: 60, height: 20, theme:getTheme() });

	var savebutton = $('<input style="float:right; margin-top:10px; margin-right:10px;"/>').attr({ type: 'button', id:"btnSaveMedical", value:"Save"});
	$('#buttonDiv').append(savebutton);
	$('#btnSaveMedical').jqxButton({ width: 60, height: 20, theme:getTheme()});

};

/*
function studentMedicalInfoChange() {
	console.log(" student medical Info change ");
}
*/

function createStudentRegisterClassPanel() {
	$('#studentClassDetailContentDiv').empty();
	
	var cdiv = $('<div style="width:600px;"></div>').attr({id:'registeredClassDiv'});
	$('#studentClassDetailContentDiv').append(cdiv);
}

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

function showRegisterClassInformation(data) {
	$('#registeredClassDiv').empty();
	$('#registeredClassDiv').append('<h5>Stduent Registered Class Informatioin</h5>');
	if (null != data && data.length > 0) {
		var idiv = $('<div></div>').attr({id:'innerDiv'});
		$('#registeredClassDiv').append(idiv);
		
		for (var i = 0; i < data.length; i++) {
			var id = data[i].id;
			var name = data[i].name;
			var schedules = data[i].schedule;
			var cdivid = "cdiv_" + id;
			var cdiv = $('<div class="InnerDiv" style="margin-top:10px"/>').attr({id:cdivid})
			$('#innerDiv').append(cdiv);
			cdiv.append('<label style="margin-left:10px;"> Class Name     :' + name + '</label> <br />');
			cdiv.append('<label> Class Schedule :' + schedules + '</label> <br />');
			var cbtnid = 'btnDeleteRegisterClass_' + id;
			var cdbtn = $('<input style="margin-left:500px;" />').attr({type:'button', id:cbtnid, value:'Delete'});
			cdiv.append(cdbtn);
			cdbtn.jqxButton({width:'100', theme: getTheme() });
		}
	}
};

function addClassRegister() {
	getNonRegisteredClassList();
};

function disableEditStudentDetailInfo(disable) {
	$("#studentDetailContentDiv :text").prop("disabled", disable);
	$("#studentDetailContentDiv div[id^='minput']").jqxMaskedInput({disabled:disable});
	$("#studentDetailContentDiv div[id^='dtinput']").jqxDateTimeInput({disabled:disable});
	$("#studentDetailContentDiv div[id^='rbtn']").jqxRadioButton({ disabled:disable }); 
}

function disableEditMedicalInfo(disable) {
	$("#studentMedicalDetailContentDiv :text").prop("disabled", disable);
	$("#studentMedicalDetailContentDiv div[id^='minput']").jqxMaskedInput({disabled:disable});
}

function cancelUpdateStudentInformation() {
	var currentStudent = getCurrentStudent();
	bindStudentDetailInfo(currentStudent);
};

function cancelUpdateStudentMedicalInformation() {
	var currentStudent = getCurrentStudent();
	bindingStudentMedicalPanel(currentStudent);
}


/***************************************
 * Event handle                        *
 ***************************************/
function addStudentTabsEventListeners(theme) {
	setTheme(theme);

	$(document).on('click', '#btnSearchStudent', handleStudentSearchClick);
	$(document).on('click', '#btnClearStudent', handleStudentClearClick);

	$(document).on('click', '#btnEditStudent', handleEditStudentClick);
	$(document).on('click', '#btnSaveStudent', handleStudentSaveClick);
	
	$(document).on('click', '#btnEditMedical', handleEditMedicalClick);
	$(document).on('click', '#btnSaveMedical', handleMedicalSaveClick);
	
	$(document).on('click', '#studentClassDetailContentDiv :button[id^="btnDeleteRegisterClass"]', handleDeleteRegisterClassClick);
	
	$(document).on('click', '#btnSelectClass', handleNonRegisteredClassSelectClick);
	/*
	$(document).on('click', '#btnAddStudent', handleStudentAddClick);
	*/ 
	
	$(document).on('keypress', '#txtStudentSearchFirstName', handleSearchFirstNameKeypress);
	$(document).on('keypress', '#txtStudentSearchLastName', handleSearchLastNameKeypress);
}

function handleNonRegisteredClassSelectClick(e) {
	var cid = $("#ddlistNonRegisteredClassList").val()
	console.log(" non registered class list change ... : " + cid);
	
	$('#registclassinfoDiv').empty();
	var name = "name"; 
	var schedules = "schedues";
	$('#registclassinfoDiv').append('<label style="margin-left:20px;"> Class Name     :' + name + '</label> <br />');
	$('#registclassinfoDiv').append('<label> Class Schedule :' + schedules + '</label> <br />')
	
	var cdbtn = $('<input style="margin-left:480px;" />').attr({type:'button', id:'btnRegisterClass', value:'Register'});
	$('#registclassinfoDiv').append(cdbtn);
	cdbtn.jqxButton({width:'100', theme: getTheme() });
}

function handleSearchFirstNameKeypress(e) {
	if (e.which == 13)
		$('#txtStudentSearchLastName').focus();
}

function handleSearchLastNameKeypress(e) {
	if (e.which == 13)
		$('#btnSearchStudent').click();
}

function handleDeleteRegisterClassClick() {
	console.log(" delete register class click ... ");
	var buttonid = $(this)[0].id
	var deleteid = buttonid.substr(23, buttonid.length);
	findStudentRegisterClass(getCurrentStudent().id, deleteid);
}

function handleStudentClearClick() {
	$('#studentMainPanel').empty();
	
   	$( '#txtStudentSearchFirstName' ).val('');
    $( '#txtStudentSearchLastName' ).val('');
   	$( '#txtStudentSearchFirstName' ).jqxInput({ source: getFirstNameList() });
    $( '#txtStudentSearchLastName' ).jqxInput({ source: getLastNameList() });
    $( '#txtStudentSearchFirstName' ).focus();

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
		$('#studentMainPanel').empty();
		getStudentByName(fname, lname);
	}

	setCurrentFunction("SEARCH");
}

function handleStudentAddClick() {

	console.log(" add new student ");
	$('#txtStudentSearchFirstName').val("");
	$('#txtStudentSearchLastName').val("");
	createStudentPanel();

	$('#btnEditStudent').jqxButton('val', "Canel");

	$('#btnSaveStudent').jqxButton('val', "Add")

	setCurrentFunction("ADD");
}

function handleStudentSaveClick() {
	console.log(" save student button click ... ");
	if ("SEARCH" == getCurrentFunction()) {
		disableEditStudentDetailInfo(true);
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
		$('#studentInformation').empty();
	}
}

function handleMedicalSaveClick() {
	console.log(" save student button click ... ");
	if ("SEARCH" == getCurrentFunction()) {
		disableEditMedicalInfo(true);
		$("#btnEditMedical").val("Edit");
		$('#btnSaveMedical').jqxButton('disabled', true);
		updateStudentInformation();
	} else if ("ADD" == getCurrentFunction()) {
		addStudentInformation();
	}
}

function handleEditMedicalClick() {
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
		$('#studentInformation').empty();
	}
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
				$('#studentMainPanel').empty();
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
	var student = getStudentFromUI(currentStudent);

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
		"msdStudentMedicalInfoDto":sm
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
			"insuranceCompany":$('#txtStudentInsuranceCompany').val(),
			"policyNumber":$('#txtStudentPolicyNumber').val(),
			"pediatricianName":$('#txtStudentPediatricianName').val(),
			"phone":$('#minputStudentPediatricianPhone').jqxMaskedInput('inputValue'),
			"emergencyName":$('#txtStudentEmergencyName').val(),
			"emergencyPhone":$('#minputStudentEmergencyPhone').jqxMaskedInput('inputValue'),
			"emergencyPhoneAlt":$('#minputStudentEmergencyAltPhone').jqxMaskedInput('inputValue'),
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
			id = s.msdStudentParentDtos.id;
		else 
			if (cellPhone || emailAddress || firstName || lastName || relationship || workPhone)
				id = 0;
	} else {
		id = 0;
	}
	
	if (null !=id) {
		p = {
			"cellPhone":$('#minputParentOneCellPhone').jqxMaskedInput('inputValue'),
			"emailAddress":$('#txtParentOneEmail').val(),
			"firstName":$('#txtParentOneFirstName').val(),
			"id":id,
			"lastName":$('#txtParentOneLastName').val(),
			"relationship":$('#txtParentOneRelation').val(),
			"workPhone":$('#minputParentOneWorkPhone').jqxMaskedInput('inputValue'),
		};
	}
	
	return p;
}

function addStudentInformation() {
	var student = getStudentFromUI(null);	

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

function findStudentRegisterClass(sid, cid) {
	console.log(' delete student register class ... ');
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdstudent",
		data: { type: "registerclass", msdstudentid: sid, msdclassid: cid },
		success: function(response) {
			console.log(" find student register class ... ");
			if (404 == response.code) {
				console.log(" Can not find register class for this student ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				deleteStudentRegisterClass(data);
			} else {
				alert("error to find student registered class ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

function deleteStudentRegisterClass(data) {
	var scregister = {"id":data.id, "msdClassId":data.msdClassId, "msdStudentId":data.msdStudentId};
/*	
	$.ajax({
		type: "DELETE",
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
				getStudentRegisterClass(getCurrentStudent());
			} else {
				alert("error to register student ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
*/
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

function getNonRegisteredClassList(data) {
	console.log('in getNonRegisteredClassList ... ');
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: { type: "nonregisterclass", msdstudentid: data.id },
		success: function(response) {
			if (404 == response.code) {
				console.log(" There is no non register class  ");
				setNonRegisterClassList(null);
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setNonRegisterClassList(data);
			} else {
				setNonRegisterClassList(null);
				alert('error');
			}
		},
		error: function(msg, url, line) {
			setNonRegisterClassList(null);
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

function setNonRegisterClassList(nrclist) {
	nonRegisterClassList = nrclist;
	$('#ddlistNonRegisteredClassList').jqxDropDownList({source: nrclist, selectedIndex: -1, displayMember: "name", valueMember: "id"});
}
function getNonRegisterClassList() {
	return nonRegisterClassList;
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

function getPhoneType() {
	return ["Home", "Mobile","Work"];
}

var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
