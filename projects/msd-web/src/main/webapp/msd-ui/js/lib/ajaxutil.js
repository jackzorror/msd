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

function ajaxGetClassSchedularByClassId(id, fName) {
	console.log(" in get class schedular by id ... ");
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

function ajaxSaveClassInformation(id, cname, clocation, sdate, edate, fName) {
	var classInfo = {"id":id, "name":cname, "location":clocation, "classStartTime":sdate, "classEndTime":edate};

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

function ajaxGetAllStuentSummaryByClassName(cname, fName) {
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent/ByClssName/" + cname,
		dataType: "json",
		contentType: "application/json",
		data: { "type": "Summary"}
	});
	
	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
	
}

