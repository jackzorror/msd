function ajaxGetUniqueName(fieldname, fName) {
	console.log(" get unique name for : " + fieldname);
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdstudent",
		dataType: "json",
		contentType: "application/json",
		data: {type:"nameautocomplete",fieldname:fieldname },
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
		data: { type: "classname"},
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


function ajaxGetClassSchedularByClassId(id, fName) {
	console.log(" get class schedulars by class id ... ");
	var ajaxcall = $.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclassschedular",
		dataType: "json",
		contentType: "application/json",
		data: { msdclassid: id},
	});

	ajaxcall.done(fName);
	ajaxcall.error(handleAjaxError);
}

