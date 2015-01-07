function ajaxGetUniqueName(fieldname, fName) {
	console.log(" get unique name for : " + fieldname);
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: {type:"nameautocomplete",fieldname:fieldname }
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
};

function ajaxGetAllClass(fName) {
	console.log(" get all class ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass",
		dataType: "json",
		contentType: "application/json",
		data: { classstatus: "ALL"}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetAllClassName(fName) {
	console.log(" get all class name ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass",
		dataType: "json",
		contentType: "application/json",
		data: { type: "classname"}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetClassDetailByName(className, fName) {
	console.log(" get class detail by class name ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass",
		dataType: "json",
		contentType: "application/json",
		data: { classname: className}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetClassDetailById(classId, fName) {
	console.log(" get class detail by class id ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass/" + classId,
		dataType: "json",
		contentType: "application/json",
		data:{"type":"DETAIL"}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxHasRole(role, fName) {
	console.log(" check user role for : " + role)
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/msdlogin/hasRole/" + role,
		dataType: "json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetClassSchedularByClassId(id, fName) {
	console.log(" get class schedulars by class id ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclassschedular",
		dataType: "json",
		contentType: "application/json",
		data: { msdclassid: id}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetClassFeeByClassId(id, fName) {
	console.log(" in get class Fee by id ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclassfee",
		dataType: "json",
		contentType: "application/json",
		data: { msdclassid: id}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxDeleteClassSchedular(id, fName) {
	console.log(" delete class schedular ");
	
	var ajaxcall =  $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdclassschedular/" + id
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxDeleteClassFee(id, fName) {
	console.log(" delete class fee ");
	
	var ajaxcall =  $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdclassfee/" + id
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxDddNewSchedulars(newschedular, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclassschedular",
		data: JSON.stringify(newschedular),
		contentType: "application/json",
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddNewFee(classfee, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclassfee",
		data: JSON.stringify(classfee),
		contentType: "application/json",
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddGeneralFee(generalfee, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdgeneralfee",
		data: JSON.stringify(generalfee),
		contentType: "application/json",
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxSaveClassInformation(id, cname, clocation, sdate, edate, isactive, fName) {
	var classInfo = {"id":id, "name":cname, "location":clocation, "classStartTime":sdate, "classEndTime":edate, "isactive":isactive};

	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclass",
		data: JSON.stringify(classInfo),
		contentType: "application/json",
		processData:false
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxSaveCompetitionInformation(competition, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdcompetition",
		data: JSON.stringify(competition),
		contentType: "application/json",
		processData:false
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetAllCompetition(fName) {
	var ajaxcall = $.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdcompetition",
		contentType: "application/json",
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetAllStuentSummaryByClassId(cid, fName) {
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent/ByClssId/" + cid,
		dataType: "json",
		contentType: "application/json",
		data: { "type": "Summary"}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxGetStudentRegisterCompeition(sid, fName) {
	var ajaxcall = $.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdcompetition",
		data: { "msdstudentid":sid,"type": "REGISTER"},
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxGetStudentNonRegisterCompetition(sid, fName) {
	var ajaxcall = $.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/rs/msdcompetition",
		data: { "msdstudentid":sid,"type": "NONREGISTER"},
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxAddStudentRegisteredCompetitions(sid, cidList, fName) {
	var ajaxcall = $.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/rs/msdstudentcompetition/" + sid + "/" + cidList,
		processData:false,
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxDeleteStudentRegisteredCompetitions(sid, cidList, fName) {
	var ajaxcall = $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdstudentcompetition/" + sid + "/" + cidList,
		processData:false,
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxStudentRegisterClasses(sid, cidList, fName) {
	var ajaxcall = $.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/rs/msdstudentclass/" + sid + "/" + cidList,
		processData:false,
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxDeleteStudentRegisteredClasses(sid, cidList, fName) {
	var ajaxcall = $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdstudentclass/" + sid + "/" + cidList,
		processData:false,
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxregisterClassByStudentIdListAndClassId(cid, sidList, rtype, ocid,fName) {
	var ajaxcall = $.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/rs/msdstudentclass",
		data: {classid:cid, studentidlist:sidList, oldclassid:ocid, registertype:rtype}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

function ajaxCheckinStudent(schechin, fName) {
	console.log(" call student check in ... ");
		
	ajaxcall = $.ajax({
		type: "POST",
		url: "../msd-app/msdstudentcheckin",
		dataType: "json",
		data: JSON.stringify(scheckin),
		contentType: "application/json",
		processData:false,
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
		
};

function ajaxCreateStudentNameListFile(cid, fName) {
	console.log(" call create student Name list ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdmisc",
		dataType: "json",
		contentType: "application/json",
		data:{miscname: 'CREATE_NAME_LIST_FILE' + '-' + cid}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentCheckinReportByStudentIdAndClassId(sid, cid, fName) {
	console.log(" call get student check in report ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/msdstudentcheckin/" + sid + "/" + cid,
		dataType: "json",
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
};

function ajaxGetAllStudentCheckinReportByStudentId(sid, fName) {
	console.log(" call get student all check in report ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/msdstudentcheckin/" + sid ,
		dataType: "json",
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
};

function ajaxGetAllMSDCostType(fName) {
	console.log(" call get all cost type ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdmisc",
		dataType: "json",
		contentType: "application/json",
		data:{miscname: 'COST_TYPE'}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
};

function ajaxGetAllMSDCompetitionType (fName) {
	console.log(" call get all competition type ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdmisc",
		dataType: "json",
		contentType: "application/json",
		data:{miscname: 'COMPETITION_TYPE'}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
};

function ajaxGetAllGeneralFee(fName) {
	console.log(" call get all General Fee ... ");
		
	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdgeneralfee",
		dataType: "json",
		contentType: "application/json"
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetClassDetailSchedularByClassId(cid, fName) {
	console.log(" in get class schedular by id ... ");

	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclassschedular",
		dataType: "json",
		contentType: "application/json",
		data: { msdclassid: cid},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetCompetitionDetailById(cid, fName) {
	console.log(" in get competition by id ... ");

	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdcompetition/" + cid,
		dataType: "json",
		data:{type:"DETAIL"},
		contentType: "application/json"
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetCompetitionFeeByCompetitionId(cid, fName) {
	console.log(" in get competition fee by id ... ");

	ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdcompetitionfee",
		dataType: "json",
		contentType: "application/json",
		data: { msdcompetitionid: cid},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddCompetitionFee(competitionfee, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdcompetitionfee",
		data: JSON.stringify(competitionfee),
		contentType: "application/json",
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddGeneralFeeToStudentFee(sid, fid, fnote, fName) {
	var ajaxcall = $.ajax({
		type: "POST",
		dataType: "json",
		url: "../msd-app/rs/msdstudentfee",
		data: {'msdstudentid':sid, 'feeid':fid, 'feenote':fnote, 'type':'GENERALFEE'},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxDeleteCcompetitionFee(id, fName) {
	console.log(" delete competition fee ");
	
	var ajaxcall =  $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdcompetitionfee/" + id
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddNewNonClassDate(nonClassDate, fName) {
	var ajaxcall = $.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclassnonclassdate",
		data: JSON.stringify(nonClassDate),
		contentType: "application/json",
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxDeleteNonClassDate(id, fName) {
	console.log(" delete non class date ");
	
	var ajaxcall =  $.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdclassnonclassdate/" + id
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentFeeByStudentId(id, fName) {
	console.log(" get student fee in ajax ");
	
	var ajaxcall =  $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudentfee",
		dataType: "json",
		contentType: "application/json",
		data: { "id": id, "type": "ByStudentId"},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentCreditByStudentId(id, fName) {
	console.log(" get student credite in ajax ");
	
	var ajaxcall =  $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudentcredit",
		dataType: "json",
		contentType: "application/json",
		data: { "id": id, "type": "ByStudentId"},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddStudentCredit(sid, credit, note, fName) {
	console.log(" add student credite in ajax ");
	var ajaxcall =  $.ajax({
		type: "POST",
		url: "../msd-app/rs/msdstudentcredit",
		dataType: "json",
		data:{msdstudentid:sid, creditnote:note, credit:credit}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxAddStudentCreditToStudents(sidList, credit, note, fName) {
	console.log(" add student credite in ajax ");
	var ajaxcall =  $.ajax({
		type: "POST",
		url: "../msd-app/rs/msdstudentcredit",
		dataType: "json",
		data:{msdstudentidlist:sidList, creditnote:note, credit:credit}
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentFinanceBalance(id, fName) {
	console.log(" get student balance in ajax ");
	
	var ajaxcall =  $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent/" + id + "/FINANCEBALANCE",
		dataType: "json",
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentFeeDetailById(id, fName) {
	console.log(" get student fee detail ajax ");
	
	var ajaxcall =  $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudentfee/" + id,
		dataType: "json",
		contentType: "application/json",
		data:{type:"DETAIL"},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxGetStudentCreditDetailById(id, fName) {
	console.log(" get student credit detail ajax ");
	
	var ajaxcall =  $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudentcredit/" + id,
		dataType: "json",
		contentType: "application/json",
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxPayStudentFees(sid, feeidlist, totalfee, paytype, paytime, paynote, fName) {
	console.log(" pay student fees ");
	var dto = {"msdStudentId":sid, "feeIdList":feeidlist, "totalFee":totalfee, "payType":paytype,"payTime":paytime,"payNote":paynote};
	
	var ajaxcall =  $.ajax({
		type: "POST",
		url: "../msd-app/rs/msdstudentfee",
		dataType: "json",
		contentType: "application/json",
		data:JSON.stringify(dto),
		processData:false
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxConsumeStudentCredits(sid, feeidlist, consumetime, consumenote, fName){
	console.log(" consume student credits ");
	var dto = {"msdStudentId":sid, "creditIdList":feeidlist, "consumeTime":consumetime,"consumeNote":consumenote};
	
	var ajaxcall =  $.ajax({
		type: "POST",
		url: "../msd-app/rs/msdstudentcredit",
		dataType: "json",
		data:{"msdStudentId":sid, "creditIdList":feeidlist, "consumeTime":consumetime,"consumeNote":consumenote},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

function ajaxCheckinClassByStudentIdListAndClassId (cid, checkintime, sidList, fName) {
	console.log(" checkin students to class ");
	
	var ajaxcall =  $.ajax({
		type: "POST",
		url: "../msd-app/msdstudentcheckin",
		dataType: "json",
		data:{"msdclassid":cid, "checkintime":checkintime, "msdstudentidlist":sidList},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}


