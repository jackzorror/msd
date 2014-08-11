// UI Creature
function initClassTab() {
	console.log(" init class tab ... ");

	$('#classControlPanel').empty();
	
	$('#classControlPanel').append('<label style="margin-top:10px; margin-left:20px">Please input class name : </label>');
	var cname = $('<input style="margin-top:10px; margin-left:5px"/>').attr({type:'text', id:'txtClassSearchName'});
	$('#classControlPanel').append(cname);
	$('#txtClassSearchName').jqxInput({placeHolder: "Class Name", height: 20, width: 300, minLength: 1, theme: getTheme() });

	var abutton = $('<input style="float:right;margin-top:10px; margin-left:3px; margin-right:10px" />').attr({type:'button', id:'btnAddClass', value:'Add'});
	$('#classControlPanel').append(abutton);
	$('#btnAddClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var cbutton = $('<input style="float:right;margin-top:10px; margin-left:3px" />').attr({type:'button', id:'btnClearClass', value:'Clear'});
	$('#classControlPanel').append(cbutton);
	$('#btnClearClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-top:10px;" />').attr({type:'button', id:'btnSearchClass', value:'Search'});
	$('#classControlPanel').append(sbutton);
	$('#btnSearchClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	$('classMainPanel').empty();

};


function addClassTabsEventListeners() {
	$(document).on('click', '#btnSearchClass', handleSearchClassClick);
/*
	$(document).on('click', '#btnAddClass', handleAddClassClick);
	$(document).on('click', '#btnEditClassInformation', handleEditClassClick);
	$(document).on('click', '#btnSaveClassInformation', handleSaveClassClick);
	$(document).on('click', '#btnAddSchedular', handleAddSchedularClick);
*/
}

// Event handle
function handleSearchClassClick() {
	console.log(" in handle search ... ");

	var cname = $.trim($('#txtClassSearchName').val());

	if ((null == cname || cname.length == 0)) {
	    alert("please input class name to search ... ");
	} else {
		console.log (" call ajax to get class ... ");
		$('#classCommondiv').empty();
		$('#schedularInformationdiv').empty();

		ajaxGetClassDetailByName(cname, getClassDetailByName);
	}

	setCurrentFunction("SEARCH");
};
/*
function handleEditClassClick() {
	if ("SEARCH" == getCurrentFunction()) {
		if ("Edit" == $('#btnEditClassInformation').val()) {
			$('#classCommondiv :text').prop("disabled", false);
			$('#txtClassName').focus();
			$('#btnEditClassInformation').val("Cancel");
			$('#btnSaveClassInformation').jqxButton('disabled', false);
			$('#divStartTime').jqxDateTimeInput({ disabled: false });
			$('#divEndTime').jqxDateTimeInput({ disabled: false });
		} else if ("Cancel" == $('#btnEditClassInformation').val()) {
			console.log (" cancel edit class information ... ");
			cancelUpdateClassInformation();
			$('#classCommondiv :text').prop("disabled", true);
			$('#divStartTime').jqxDateTimeInput({ disabled: true });
			$('#divEndTime').jqxDateTimeInput({ disabled: true });
			$('#btnEditClassInformation').val("Edit");
			$('#btnSaveClassInformation').jqxButton('disabled', true);
		}
	} else if ("ADD" == getCurrentFunction()) {
//		$('#classCommondiv').empty();
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
*/
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
		
//	getClassSchedularByClassId(data.id);
	
//	createAddClassSchedularDiv();

}
/*
function createAddClassSchedularDiv() {
	$('#addSchedulardiv').empty();
	
	$('#addSchedulardiv').append('<label style="float:left; margin-top:2px;">Weekday : </label>');
	var weekdaydiv = $('<div style="float:left; margin-left:5px"/>').attr({id:'weekdaydiv'});
	$('#addSchedulardiv').append(weekdaydiv);
	$('#weekdaydiv').jqxDropDownList({ checkboxes: true, source: WeekDayShortNameArray, selectedIndex: 1, width: '60', height: '20', theme: theme });
	
	$('#addSchedulardiv').append('<label style="float:left; margin-top:2px; margin-left:5px;">Start : </label>');
	var stime = $('<input style="float:left; margin-left:5px;"/>').attr({type:'text', id:'txtStartTime'});
	$('#addSchedulardiv').append(stime);
	$('#txtStartTime').jqxInput({placeHolder: "Start Time", height: 20, width:45, minLength: 1, theme: getTheme() });
	$('#txtStartTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });
	
	$('#addSchedulardiv').append('<label style="float:left; margin-top:2px; margin-left:5px;">End : </label>');
	var etime = $('<input style="float:left; margin-left:5px;"/>').attr({type:'text', id:'txtEndTime'});
	$('#addSchedulardiv').append(etime);
	$('#txtEndTime').jqxInput({placeHolder: "End Time", height: 20, width:45, minLength: 1, theme: getTheme() });
	$('#txtEndTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });
	
	var btnadd = $('<input style="float:right; margin-right:10px;"/>').attr({type:'button', id:'btnAddSchedular', value:'Add'});
	$('#addSchedulardiv').append(btnadd);
	$('#btnAddSchedular').jqxButton({ width: '60', height: 20, theme: getTheme() });
}
*/
function createClassInformationDiv() {

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:10px; margin-top:10px; border:0px solid; height:80px;"/>').attr({id:'classCommondiv'});
	$('#classMainPanel').append(ccdiv);
	
	var cddiv = $('<div class="InnerDiv" style = "margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'classDetaildiv'});
	$('#classMainPanel').append(cddiv);
	
	var asdiv = $('<div style = "margin-top: 10px; margin-left:10px; border:1px solid;"/>').attr({id:'addSchedulardiv'});
	$('#classMainPanel').append(asdiv);
	
	var sdiv = $('<div style = "margin-top: 10px; margin-left:10px; border:1px solid;"/>').attr({id:'schedularInformationdiv'});
	$('#classMainPanel').append(sdiv);
	

	$('#classCommondiv').empty();
	$('#schedularInformationdiv').empty();
	
	$('#classCommondiv').append('<label style="margin-left:10px; margin-top:10px;"><b>Class Information ... </b></label>');

	var savebtn = $('<input style="float:right; margin-top:5px;margin-right:5px"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	$('#classCommondiv').append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="float:right; margin-top:5px; margin-right:10px;"/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	$('#classCommondiv').append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });

	$('#classCommondiv').append('<br />');

	$('#classCommondiv').append('<label style="margin-top:10px;"> Class Name : </label>');
	var cname = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtClassName'});
	$('#classCommondiv').append(cname);
	$('#txtClassName').jqxInput({placeHolder: "Class Name", height: 20, width:200, minLength: 1, theme: getTheme() });	
	
	$('#classCommondiv').append('<label style="margin-left:10px;margin-top:10px">Location : </label>');
	var location = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtLocation'});
	$('#classCommondiv').append(location);
	$('#txtLocation').jqxInput({placeHolder: "Class Location", height: 20, width:220, minLength: 1, theme: getTheme(), source:ClassLocation });

	$('#classCommondiv').append('<br/>');
	
	var tmpdiv = $('<div class="InnerDiv" style = "margin-top:10px; border:0px solid;"/>').attr({id:'tmpdiv'});
	$('#classCommondiv').append(tmpdiv);
/*	
	$('#classCommondiv').append('<label style="float:left; margin-top:10px;"> Start : </label>');
	var stime = $('<div style="float: left; margin-top:10px; margin-left:10px;"/>').attr({id:'divStartTime'});
	$('#classCommondiv').append(stime);
	$('#divStartTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});
	
	$('#classCommondiv').append('<label style="float:left; margin-top:10px; margin-left:10px;"> End: </label>');
	var etime = $('<div style="float:left; margin-top:10px; margin-left:10px;" />').attr({id:'divEndTime'});
	$('#classCommondiv').append(etime);
	$('#divEndTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});
	
	var label = $('<label id="statuslabel" name="statuslabel" style="float:left; margin-top:10px; margin-left:20px;">Class Status : </label>');
	$('#classCommondiv').append(label);

	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="float:left; margin-top:10px; margin-left:20px;" />');
	$('#classCommondiv').append(statusLabel);
*/
	$('#tmpdiv').append('<label style="float:left; margin-top:5px;"> Start : </label>');
	var stime = $('<div style="float: left; margin-top:0px; margin-left:10px;"/>').attr({id:'divStartTime'});
	$('#tmpdiv').append(stime);
	$('#divStartTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});
	
	$('#tmpdiv').append('<label style="float:left; margin-top:5px; margin-left:10px;"> End: </label>');
	var etime = $('<div style="float:left; margin-top:0px; margin-left:10px;" />').attr({id:'divEndTime'});
	$('#tmpdiv').append(etime);
	$('#divEndTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});
	
	var label = $('<label id="statuslabel" name="statuslabel" style="float:left; margin-top:5px; margin-left:20px;">Class Status : </label>');
	$('#tmpdiv').append(label);

	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="float:left; margin-top:5px; margin-left:20px;" />');
	$('#tmpdiv').append(statusLabel);

	$('#classCommondiv').append('<br />');
/*
	var savebtn = $('<input style="margin-top:10px;"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	$('#classCommondiv').append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="margin-top:10px; "/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	$('#classCommondiv').append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
*/
}

function getClassDetailByName(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get class detail by class name ... ");
	} else if (302 == response.code) {
		console.log(" get class detail by class name");
		var data = $.parseJSON(response.result);
		showClassInformation(data);
	} else {
		alert('error');
	}
}


/*
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
	$('#schedularInformationdiv').empty();
	$('#schedularInformationdiv').append('<h3> Class Schedular ... </h3>');
	var csdiv = $('<div style="border:0px solid;"/>').attr({id:'classSchedularGrid'});	
	$('#schedularInformationdiv').append(csdiv);
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
*/
/*
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
				$('#schedularInformationdiv').empty();				
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
*/
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

