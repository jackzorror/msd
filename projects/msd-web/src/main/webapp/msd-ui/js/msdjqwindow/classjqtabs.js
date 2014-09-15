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
	$(document).on('keypress', '#txtClassSearchName', handleClassSEarchNameKeypress);
	$(document).on('click', '#btnClearClass', handleClearClassClick);
	$(document).on('click', '#btnAddClass', handleAddClassClick);
	
	$(document).on('click', '#btnEditClassInformation', handleEditClassClick);
	$(document).on('click', '#btnSaveClassInformation', handleSaveClassClick);
}

// Event handle
function handleSearchClassClick() {
	console.log(" in handle search ... ");

	var cname = $.trim($('#txtClassSearchName').val());

	if ((null == cname || cname.length == 0)) {
	    alert("please input class name to search ... ");
	} else {
		console.log (" call ajax to get class ... ");
		ajaxGetClassDetailByName(cname, getClassDetailByName);
	}

	setCurrentFunctionInClassTab("SEARCH");
};

function handleClassSEarchNameKeypress(e) {
	if (e.which == 13)
		$('#btnSearchClass').click();
}

function handleClearClassClick() {
	$('#classMainPanel').empty();
	$('#txtClassSearchName').val('');
	$('#txtClassSearchName').focus();
}

function handleEditClassClick() {
	if ("SEARCH" == getCurrentFunctionInClassTab()) {
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
	} else if ("ADD" == getCurrentFunctionInClassTab()) {
		$('#btnClearClass').click();
	}
};

function handleSaveClassClick() {
	var id = (null != getCurrentClassInClassTab() ? getCurrentClassInClassTab().id : null);
	var cname = $('#txtClassName').val();
	var clocation  = $('#txtLocation').val();
	var sdate = $('#divStartTime').jqxDateTimeInput('value');
	var edate = $('#divEndTime').jqxDateTimeInput('value');
	console.log(" new class : " + cname + " -> " + clocation + " time : " + sdate  + " ~ " + edate);
	ajaxSaveClassInformation(id, cname, clocation, sdate, edate, saveClassInformation);
}

function handleAddClassClick() {
	console.log(" in handle add ... ");
	
	setCurrentFunctionInClassTab("ADD");
	showClassInformation(null);
	setCurrentClassInClassTab(null);

	$('#txtClassSearchName').val('');
	$('#classCommondiv :text').prop("disabled", false);
	$('#txtClassName').focus();
	$('#btnEditClassInformation').val("Cancel");
	$('#btnSaveClassInformation').jqxButton('disabled', false);
	$('#divStartTime').jqxDateTimeInput({ disabled: false });
	$('#divEndTime').jqxDateTimeInput({ disabled: false });
}

function showClassInformation(data) {

	createClassInformationDiv();
	$('#txtClassName').jqxInput({disabled:true });
	$('#txtClassName').jqxInput('val', null != data ? data.name : "");
	
	
	$('#txtLocation').jqxInput({disabled:true });
	$('#txtLocation').jqxInput('val', null != data ? data.location : "");
	
	$('#divStartTime').val(null != data && null != data.classStartTime ? data.classStartTime : null);

	$('#divStartTime').jqxDateTimeInput({ disabled: true });
	
	$('#divEndTime').val(null != data && null != data.classEndTime ? data.classEndTime : null);

	$('#divEndTime').jqxDateTimeInput({ disabled: true });

	if (null != data && null != data.classStatus) {
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
	} else {
		$('#labelClassStatus').text("NA");
		$('#labelClassStatus').css("color", "grey");
	}
	$('#btnSaveClassInformation').jqxButton({ disabled:true });

	if (null != data)
		ajaxGetClassSchedularByClassId(data.id, getClassSchedularByClassId);
	
}

function createClassInformationDiv() {

	$('#classMainPanel').empty();

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:10px; border:0px solid; height:100px;"/>').attr({id:'classCommondiv'});
	$('#classMainPanel').append(ccdiv);
	
	var cddiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:10px; border:0px solid;"/>').attr({id:'classDetaildiv'});
	$('#classMainPanel').append(cddiv);
	
	var sdiv = $('<div class="InnerDiv" style = "margin-top: 0px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'schedularInformationdiv'});
	$('#classMainPanel').append(sdiv);	

	$('#classCommondiv').empty();
	$('#schedularInformationdiv').empty();
	$('#classCommondiv').append('<br/>');
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
}

function getClassDetailByName(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get class detail by class name ... ");
	} else if (302 == response.code) {
		console.log(" get class detail by class name");
		var data = $.parseJSON(response.result);
		showClassInformation(data);
		setCurrentClassInClassTab(data);
	} else {
		alert('error');
	}
}

function cancelUpdateClassInformation() {
	var data = getCurrentClassInClassTab();
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
}

function showClassSchedularInformation(data) {
	console.log(" in show class schedular information .. ");
	$('#schedularInformationdiv').empty();
	$('#schedularInformationdiv').append('<br/>');
	$('#schedularInformationdiv').append('<label style="margin-left:10px; margin-top:10px;"><b>Class Scheduler ... </b></label>');
	$('#schedularInformationdiv').append('<br/>');
	$('#schedularInformationdiv').append('<br/>');
	var csdiv = $('<div class="InnerDiv" style="margin-left:80px; border:0px solid;"/>').attr({id:'classSchedularDataTable'});	
	$('#schedularInformationdiv').append(csdiv);
	var pdiv = $('<div/>').attr({id:'addClassSchedularPopupWindow'});
	$('#schedularInformationdiv').append(pdiv);
	$('#addClassSchedularPopupWindow').append('<div >Add Weekday Class Scheduler</div> <div style="height:130px; width:220px;" id="addClassSchedulerdiv"></div>');

    var offset = $("#classSchedularDataTable").offset();
    $("#addClassSchedularPopupWindow").jqxWindow({
    	width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
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
	
    $("#classSchedularDataTable").jqxDataTable({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
                
    	pageable: false,
	    editable: false,
    	showToolbar: true,
	    altrows: true,
    	ready: function(){},
	    toolbarHeight: 25,
    	renderToolbar: function(toolBar){
    		var toTheme = function (className) {
    			if (getTheme() == "") return className;
	            return className + " " + className + "-" + theme;
    	    }
                    // appends buttons to the status bar.
        	var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%; margin-top:5px'> <b> Weekly Class Scheduler </b></div>");
	        var buttonTemplate = "<div style='float: right; padding: 1px; margin: 1px;'><div style='width: 16px; height: 16px;'></div></div>";
    	    var addButton = $(buttonTemplate);
        	var deleteButton = $(buttonTemplate);
	        container.append(addButton);
    	    container.append(deleteButton);
        	toolBar.append(container);
	        addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
    	    addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
        	addButton.jqxTooltip({ position: 'bottom', content: "Add"});
	        deleteButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
    	    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
        	deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
	        var updateButtons = function (action) {
    	    	switch (action) {
        	    	case "Select":
            	    	addButton.jqxButton({ disabled: false });
                	    deleteButton.jqxButton({ disabled: false });
                    	break;
	                case "Unselect":
    	                addButton.jqxButton({ disabled: false });
        	            deleteButton.jqxButton({ disabled: true });
            	        break;
            	}
        	}
	        var rowIndex = null;
    	    $("#classSchedularDataTable").on('rowSelect', function (event) {
        		var args = event.args;
            	rowIndex = args.index;
	            updateButtons('Select');
    	    });
        	$("#classSchedularDataTable").on('rowUnselect', function (event) {
        		updateButtons('Unselect');
	        });
    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
					createAddClassSchedularDiv();
				    var offset = $("#classSchedularDataTable").offset();
					$("#addClassSchedularPopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 20 } });
                    $("#addClassSchedularPopupWindow").jqxWindow('open');
                    
                    $('#btnCancelAddSchedular').on('click', function () {
						console.log(" cancel add scheduler ...");
						$("#addClassSchedularPopupWindow").jqxWindow('hide');
                    });
                    $('#btnAddSchedular').on('click', function () {
						console.log(" add new scheduler ...");
                        $("#classSchedularDataTable").jqxDataTable('unselectRow', 0);
						
						var weekdays = $('#weekdaydiv').jqxDropDownList('getCheckedItems');
						console.log(" selected weekday count : " + weekdays.length);
						var stime = $('#txtStartTime').val();
						var etime = $('#txtEndTime').val();
						var weekdaystrs = new Array();

						if (null == weekdays || weekdays.length < 1) {
						    alert("please select at least one day from weekday list ");
						} else if (null == stime || stime.length < 1) {
						    alert("please select class start time ");
						} else if (null == etime || etime.length < 1) {
						    alert("please select class end time ");
						} else {
							$.each(weekdays, function (index) {
								weekday = this.label;
	                            $("#classSchedularDataTable").jqxDataTable('addRow', null, { weekdayStr:weekday, startTime:stime, endTime:etime }, 'first');
								weekdaystrs.push(weekday);
							});
                            $("#classSchedularDataTable").jqxDataTable('selectRow', 0);
							$("#addClassSchedularPopupWindow").jqxWindow('hide');

							newschedular = {"id":0, "msdClassId":getCurrentClassInClassTab().id, "startTime":stime, "endTime":etime, "weekdays":weekdaystrs};
	
							ajaxDddNewSchedulars(newschedular, addNewSchedulars);
						}
                    });
                    
                	updateButtons('add');
	            }
    	    });
        	deleteButton.click(function () {
        		if (!deleteButton.jqxButton('disabled')) {
        			var deleterow = $("#classSchedularDataTable").jqxDataTable('getSelection');
            		$("#classSchedularDataTable").jqxDataTable('deleteRow', rowIndex);
	                updateButtons('delete');

	                ajaxDeleteClassSchedular(deleterow[0].id, deleteClassSchedular);
    	        }
        	});
	    },
    	columns: [
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Weekday', datafield: 'weekdayStr', width: 200},
			{text: 'Start Time', datafield: 'startTime', width:200},
			{text: 'End Time', datafield: 'endTime', width:200}
		]
    });
    
	$('#schedularInformationdiv').append('<br/>');
}

function deleteClassSchedular(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete class schedular ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete class schedular ... ");
	} else {
		alert("error to find student ... ");
	}
}

function createAddClassSchedularDiv() {
	$('#addClassSchedulerdiv').empty();

	// weekday	
	var tdiv = $('<div style="margin-top:10px; border:0px solid;"/>');
	$('#addClassSchedulerdiv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Weekday : </label>');
	var weekdaydiv = $('<div style="margin-left:5px"/>').attr({id:'weekdaydiv'});
	tdiv.append(weekdaydiv);
	$('#weekdaydiv').jqxDropDownList({ checkboxes: true, dropDownHeight:170, source: WeekDayShortNameArray, selectedIndex: 1, width: '120', height: '20', theme: getTheme() });

	// start time
	var tdiv = $('<div style="margin-top:5px; width:180px;border:0px solid;" align="right" />');
	$('#addClassSchedulerdiv').append(tdiv);
	tdiv.append('<label style="margin-top:2px; margin-left:5px;">Start : </label>');
	var stime = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtStartTime'});
	tdiv.append(stime);
	$('#txtStartTime').jqxInput({rtl: true, placeHolder: "Start Time", height: 20, width:100, minLength: 1, theme: getTheme() });
	$('#txtStartTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });

	// end time
	var tdiv = $('<div style="margin-top:5px; width:180px;border:0px solid;" align="right" />');
	$('#addClassSchedulerdiv').append(tdiv);
	tdiv.append('<label style="margin-top:2px; margin-left:5px;">End : </label>');
	var etime = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtEndTime'});
	tdiv.append(etime);
	$('#txtEndTime').jqxInput({rtl: true, placeHolder: "End Time", height: 20, width:100, minLength: 1, theme: getTheme() });
	$('#txtEndTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:21} });
	
	$('#addClassSchedulerdiv').append('<br/>');

	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	$('#addClassSchedulerdiv').append(tdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddSchedular', value:'Add'});
	tdiv.append(btnadd);
	$('#btnAddSchedular').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCancelAddSchedular', value:'Cancel'});
	tdiv.append(btncancel);
	$('#btnCancelAddSchedular').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function addNewSchedulars(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class schedulars successfully ... ");
	} else {
		alert('error');
	}
}

function getClassSchedularByClassId(response, request, settings) {
	console.log(" in get class schedular by id ... ");
	if (404 == response.code) {
		console.log(" Can't find class schedular by id : " + getCurrentClassInClassTab().id);
		showClassSchedularInformation(null);
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get class schedular by id ");
		showClassSchedularInformation(data);
	} else {
		alert('error');
	}
}

function saveClassInformation(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class successfully ... ");
		data = $.parseJSON(response.result);
		$('#txtClassSearchName').val(data.name);
		$('#btnSearchClass').click();		
		ajaxGetAllClassName(getAllClassName);
		
//		setCurrentClassInClassTab(data);
//		showClassInformation(data);
	} else {
		alert('error');
	}
}

var currentFunctionInClassTab;
function setCurrentFunctionInClassTab(status) {
	currentFunctionInClassTab = status;
}
function getCurrentFunctionInClassTab() {
	return currentFunctionInClassTab;
}

var currentClassInClassTab;
function getCurrentClassInClassTab(){
	return currentClassInClassTab;
}
function setCurrentClassInClassTab(value) {
	currentClassInClassTab = value;
}

