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
