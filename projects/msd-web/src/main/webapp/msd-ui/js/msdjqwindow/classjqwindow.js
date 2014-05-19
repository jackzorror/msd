function addClassWindowEventListeners(theme) {
	setTheme(theme);

	$(document).on('click', '#btnShowClassWindow', handleShowClassWindowClick);
	
	$(document).on('click', '#btnSearchClass', handleSearchClassClick);
	$(document).on('click', '#btnAddClass', handleAddClassClick);
	$(document).on('click', '#btnEditClassInformation', handleEditClassClick);
	$(document).on('click', '#btnSaveClassInformation', handleSaveClassClick);
	$(document).on('click', '#btnAddSchedular', handleAddSchedularClick);
}

// Event handle
function handleShowClassWindowClick() {
	if (false == $('#classWindow').jqxWindow('isOpen')) {
		$('#classWindow').jqxWindow('open');
	} else if (true == $('#classWindow').jqxWindow('isOpen')) {
		console.log(" do nothing ... ");
	} else {
		var mainContainer = $('#mainContainer');
    	var offset = mainContainer.offset();
	    var theme = getTheme();

	    $('#classWindow').append('<div >MSD Class</div> <div id="msdclassdiv"></div>');
    	initClassDiv();
		$('#classWindow').jqxWindow({showCollapseButton: true, height: '300px', width: '450px', theme: theme, position: { x: offset.left + 50, y: offset.top + 50} });
	}

}; 

function handleSearchClassClick() {
	console.log(" in handle search ... ");

	var cname = $.trim($('#txtClassSearchName').val());

	if ((null == cname || cname.length == 0)) {
	    alert("please input class name to search ... ");
	} else {
		console.log (" call ajax to get class ... ");
		$('#classInformationdiv').empty();
		$('#schedularInformation').empty();

		getClassByName(cname);
	}

	setCurrentFunction("SEARCH");
};

function handleEditClassClick() {
	if ("SEARCH" == getCurrentFunction()) {
		if ("Edit" == $('#btnEditClassInformation').val()) {
			$('#classInformationdiv :text').prop("disabled", false);
			$('#txtClassName').focus();
			$('#btnEditClassInformation').val("Cancel");
			$('#btnSaveClassInformation').jqxButton('disabled', false);
			$('#divStartTime').jqxDateTimeInput({ disabled: false });
			$('#divEndTime').jqxDateTimeInput({ disabled: false });
		} else if ("Cancel" == $('#btnEditClassInformation').val()) {
			console.log (" cancel edit class information ... ");
			cancelUpdateClassInformation();
			$('#classInformationdiv :text').prop("disabled", true);
			$('#divStartTime').jqxDateTimeInput({ disabled: true });
			$('#divEndTime').jqxDateTimeInput({ disabled: true });
			$('#btnEditClassInformation').val("Edit");
			$('#btnSaveClassInformation').jqxButton('disabled', true);
		}
	} else if ("ADD" == getCurrentFunction()) {
//		$('#classInformationdiv').empty();
	}
};

function handleSaveClassClick() {
	console.log(" in save class information ... ");
	var id = getCurrentClass().id;
	var cname = $('#txtClassName').val();
	var clocation  = $('#txtLocation').val();
	var sdate = $('#divStartTime').jqxDateTimeInput('value');
	var edate = $('#divEndTime').jqxDateTimeInput('value');
	console.log(" new class : " + cname + " -> " + clocation + " time : " + sdate  + " ~ " + edate);
	saveClassInformatioin(id, cname, clocation, sdate, edate);
}

function handleAddClassClick() {
	console.log(" in handle add ... ");
	
	setCurrentFunction("ADD");
}

function handleAddSchedularClick() {
	var weekdays = $('#weekdaydiv').jqxDropDownList('getCheckedItems');
	var stime = $('#txtStartTime').val();
	var etime = $('#txtEndTime').val();
	var weekdaystrs = new Array();
	var classid = getCurrentClass().id;
	$.each(weekdays, function (index) {
		weekday = this.label;
		weekdaystrs.push(weekday);
	});
	newschedular = {"id":0, "msdClassId":classid, "startTime":stime, "endTime":etime, "weekdays":weekdaystrs};
	
	addNewSchedulars(newschedular);
}

// UI Creature
function initClassDiv() {
	console.log(" init class div ... ");

	$('#msdclassdiv').empty();
	
	var searchdiv = $('<div style="border:0px solid; height: 20px; width: 380px; margin-left: 30px; margin-top:10px;" />').attr({id:'searchdiv'});
	$('#msdclassdiv').append(searchdiv);
	
	$('#searchdiv').append('<label>class name : </label>');
	var cname = $('<input/>').attr({type:'text', id:'txtClassSearchName'});
	$('#searchdiv').append(cname);
	$('#txtClassSearchName').jqxInput({placeHolder: "Class Name", height: 20, width: 100, minLength: 1, theme: getTheme() });

	var abutton = $('<input style="float:right;" />').attr({type:'button', id:'btnAddClass', value:'add'});
	$('#searchdiv').append(abutton);
	$('#btnAddClass').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var sbutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnSearchClass', value:'search'});
	$('#searchdiv').append(sbutton);
	$('#btnSearchClass').jqxButton({ width: '60', height: 20, theme: getTheme() });

	var cdiv = $('<div style = "width:410px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'classInformationdiv'});
	$('#msdclassdiv').append(cdiv);
	
	var sdiv = $('<div style = "width:410px; margin-top: 10px; margin-left:10px; border:0px solid;"/>').attr({id:'schedularInformation'});
	$('#msdclassdiv').append(sdiv);
	
	var asdiv = $('<div style = "height:100px; width:410px; margin-top: 10px; margin-left:10px; border:0px solid;"/>').attr({id:'addSchedularInformation'});
	$('#msdclassdiv').append(asdiv);
	
	getAllClassName();

};

function classWindowLogout() {
	$('#classWindow').jqxWindow('expand');
	$('#classWindow').jqxWindow('close');
	initClassWindow();
};

function initClassWindow() {
	initClassDiv();
	var mainContainer = $('#mainContainer');
   	var offset = mainContainer.offset();
    var theme = getTheme();
	$('#classWindow').jqxWindow({height: '300px', width: '450px', theme: theme, position: { x: offset.left + 50, y: offset.top + 50} });
}

function showClassInformation(data) {

	createClassInformationDiv();
	$('#txtClassName').jqxInput({disabled:true });
	$('#txtClassName').jqxInput('val', data.name);
	
	
	$('#txtLocation').jqxInput({disabled:true });
	$('#txtLocation').jqxInput('val', data.location);
	
	if (null != data.classStartTime) {
		$('#divStartTime').val(data.classStartTime);
	}
	$('#divStartTime').jqxDateTimeInput({ disabled: true });
	
	if (null != data.classEndTime) {
		$('#divEndTime').val(data.classEndTime);
	}
	$('#divEndTime').jqxDateTimeInput({ disabled: true });

	if (null != data.classStatus) {
		if ("ACTIVE" == data.classStatus) {
			$('#labelClassStatus').text(data.classStatus);
			$('#labelClassStatus').css("color", "green");
		} else if ("INACTIVE" == data.classStatus) {
			$('#labelClassStatus').text(data.classStatus);
			$('#labelClassStatus').css("color", "blue");
		} else {
			$('#labelClassStatus').text(data.classStatus);
			$('#labelClassStatus').css("color", "red");
		}
	}
	$('#btnSaveClassInformation').jqxButton({ disabled:true });
		
	getClassSchedularByClassId(data.id);
	
	createAddClassSchedularDiv();

}

function createAddClassSchedularDiv() {
	$('#addSchedularInformation').empty();
	
	$('#addSchedularInformation').append('<label style="float:left; margin-top:2px;">Weekday : </label>');
	var weekdaydiv = $('<div style="float:left; margin-left:5px"/>').attr({id:'weekdaydiv'});
	$('#addSchedularInformation').append(weekdaydiv);
	$('#weekdaydiv').jqxDropDownList({ checkboxes: true, source: WeekDayShortNameArray, selectedIndex: 1, width: '60', height: '20', theme: theme });
	
	$('#addSchedularInformation').append('<label style="float:left; margin-top:2px; margin-left:5px;">Start : </label>');
	var stime = $('<input style="float:left; margin-left:5px;"/>').attr({type:'text', id:'txtStartTime'});
	$('#addSchedularInformation').append(stime);
	$('#txtStartTime').jqxInput({placeHolder: "Start Time", height: 20, width:45, minLength: 1, theme: getTheme() });
	$('#txtStartTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });
	
	$('#addSchedularInformation').append('<label style="float:left; margin-top:2px; margin-left:5px;">End : </label>');
	var etime = $('<input style="float:left; margin-left:5px;"/>').attr({type:'text', id:'txtEndTime'});
	$('#addSchedularInformation').append(etime);
	$('#txtEndTime').jqxInput({placeHolder: "End Time", height: 20, width:45, minLength: 1, theme: getTheme() });
	$('#txtEndTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });
	
	var btnadd = $('<input style="float:right; margin-right:10px;"/>').attr({type:'button', id:'btnAddSchedular', value:'Add'});
	$('#addSchedularInformation').append(btnadd);
	$('#btnAddSchedular').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function createClassInformationDiv() {
	$('#classInformationdiv').empty();
	$('#schedularInformation').empty();
	
	$('#classInformationdiv').append('<label> Class Name : </label>');
	var cname = $('<input/>').attr({type:'text', id:'txtClassName'});
	$('#classInformationdiv').append(cname);
	$('#txtClassName').jqxInput({placeHolder: "Class Name", height: 20, width:100, minLength: 1, theme: getTheme() });	
	
	$('#classInformationdiv').append('<label style="margin-left:10px;">Location : </label>');
	var location = $('<input/>').attr({type:'text', id:'txtLocation'});
	$('#classInformationdiv').append(location);
	$('#txtLocation').jqxInput({placeHolder: "Class Location", height: 20, width:130, minLength: 1, theme: getTheme(), source:ClassLocation });
	$('#classInformationdiv').append('<br/>');
	
	$('#classInformationdiv').append('<label style="float:left; margin-top:10px;"> Start : </label>');
	var stime = $('<div style="float: left; margin-top:10px; margin-left:10px;"/>').attr({id:'divStartTime'});
	$('#classInformationdiv').append(stime);
	$('#divStartTime').jqxDateTimeInput({width: '100px', height: '20px', formatString: 'd', theme: getTheme()});
	
	$('#classInformationdiv').append('<label style="float:left; margin-top:10px; margin-left:10px;"> End: </label>');
	var etime = $('<div style="float:left; margin-top:10px; margin-left:10px;" />').attr({id:'divEndTime'});
	$('#classInformationdiv').append(etime);
	$('#divEndTime').jqxDateTimeInput({width: '100px', height: '20px', formatString: 'd', theme: getTheme()});
	
	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="float:left; margin-top:10px; margin-left:20px;" />');
	$('#classInformationdiv').append(statusLabel);

	var savebtn = $('<input style="margin-top:10px; margin-left:270px;"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	$('#classInformationdiv').append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="margin-top:10px; margin-left:10px;"/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	$('#classInformationdiv').append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function cancelUpdateClassInformation() {
	var data = getCurrentClass();
	$('#txtClassName').jqxInput('val', data.name);
	$('#txtClassName').jqxInput({disabled:true});
	$('#txtLocation').jqxInput('val', data.location);
	$('#txtLocation').jqxInput({disabled:true});
	if (null != data.classStartTime) {
		$('#divStartTime').val(data.classStartTime);
	}
	$('#divStartTime').jqxDateTimeInput({ disabled: true });
	if (null != data.classEndTime) {
		$('#divEndTime').val(data.classEndTime);
	}
	$('#divEndTime').jqxDateTimeInput({ disabled: true });
}

function showClassSchedularInformation(data) {
	console.log(" in show class schedular information .. ");
	$('#schedularInformation').empty();
	$('#schedularInformation').append('<h3> Class Schedular ... </h3>');
	var csdiv = $('<div style="border:0px solid;"/>').attr({id:'classSchedularGrid'});	
	$('#schedularInformation').append(csdiv);
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'msdClassId', 	type: 'int'},
			{ name: 'weekdayStr',  type: 'string'},
			{ name: 'weekday', 	type: 'int'},
			{ name: 'startTime', type: 'string'},
			{ name: 'endTime', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	$('#classSchedularGrid').jqxGrid(
	{
		source:dataAdapter,
		width: 410,
		height: 100,
		columns:[
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Weekday', datafield: 'weekdayStr', width: 100},
			{text: 'Start Time', datafield: 'startTime', width:100},
			{text: 'End Time', datafield: 'endTime', width:100},
			{text: 'Delete', datafield: 'Delete', columntype:'button', cellsrenderer:function() {
				return "Delete";
			}, buttonclick:function(row) {
				var id = $("#classSchedularGrid").jqxGrid('getcellvalue', row, "id");
				deleteClassSchedular(id);
			}
		}]
	});
	
}

// AJAX call ...
function getAllClassName() {
	console.log(" in get all class name ... ");
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass",
		dataType: "json",
		contentType: "application/json",
		data: { type: "classname"},
		success: function(response) {
			if (404 == response.code) {
				console.log(" Can't get class name ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				console.log(" get class name list ");
				$('#txtClassSearchName').jqxInput({source:data});
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
	
}

function getClassByName(cname) {
	console.log(" in get class by name ... ");
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclass",
		dataType: "json",
		contentType: "application/json",
		data: { classname: cname},
		success: function(response) {
			if (404 == response.code) {
				alert(" Can't find class by name : " + cname);
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				setCurrentClass(data);
				console.log(" get class by name ");
				showClassInformation(data);
				
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

function getClassSchedularByClassId(id) {
	console.log(" in get class schedular by id ... ");
	$.ajax({
		type: "GET",
		url: "../msd-app/rs/msdclassschedular",
		dataType: "json",
		contentType: "application/json",
		data: { msdclassid: id},
		success: function(response) {
			if (404 == response.code) {
				console.log(" Can't find class schedular by id : " + id);
				$('#schedularInformation').empty();				
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				console.log(" get class schedular by id ");
				showClassSchedularInformation(data);
				
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});

}

function saveClassInformatioin(id, cname, clocation, sdate, edate) {
	var classInfo = {"id":id, "name":cname, "location":clocation, "classStartTime":sdate, "classEndTime":edate};

	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclass",
		data: JSON.stringify(classInfo),
		contentType: "application/json",
		processData:false,
		success: function(response) {
			if (500 == response.code) {
				alert("Internal Error, Please check service. ");
			} else if (302 == response.code) {
				console.log(" add class successfully ... ");
				data = $.parseJSON(response.result);
				setCurrentClass(data);
				showClassInformation(data);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});
}

function addNewSchedulars(newschedular) {
	$.ajax({
		type: "PUT",
		dataType: "json",
		url: "../msd-app/rs/msdclassschedular",
		data: JSON.stringify(newschedular),
		contentType: "application/json",
		processData:false,
		success: function(response) {
			if (500 == response.code) {
				alert("Internal Error, Please check service. ");
			} else if (302 == response.code) {
				console.log(" add class schedulars successfully ... ");
				$('#txtStartTime').val("");
				$('#txtEndTime').val("");
				$('#weekdaydiv').val("");
				$('#weekdaydiv').jqxDropDownList('uncheckAll'); 
				getClassSchedularByClassId(getCurrentClass().id);
			} else {
				alert('error');
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});

}

function deleteClassSchedular(id) {
	console.log(" delete class schedular ");
	
		$.ajax({
		type: "DELETE",
		dataType: "json",
		url: "../msd-app/rs/msdclassschedular/" + id,
		success: function(response) {
			console.log(" get student ... ");
			if (404 == response.code) {
				alert(" Can't delete class schedular ... ");
			} else if (302 == response.code) {
				var data = $.parseJSON(response.result);
				getClassSchedularByClassId(getCurrentClass().id);
			} else {
				alert("error to find student ... ");
			}
		},
		error: function(msg, url, line) {
			handleAjaxError(msg);
		}
	});

}

var currentFunction;
function setCurrentFunction(status) {
	currentFunction = status;
}
function getCurrentFunction() {
	return currentFunction;
}

var currentClass;
function getCurrentClass(){
	return currentClass;
}
function setCurrentClass(value) {
	currentClass = value;
}

var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
