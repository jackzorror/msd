// UI Creature
function initClassTab() {
	console.log(" init class tab ... ");

	$('#classControlPanel').empty();
	
	var scpdiv = $('<div style="border:0px solid;"/>').attr({id:'classControldiv'});
	$('#classControlPanel').append(scpdiv);

	var ddldiv = $('<div dock="left" style="margin-top:10px; border:0px solid  #ccc; height:20px; width:500px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:10px; border:0px solid  #ccc; height:20px;"/>');
	scpdiv.append(ddldiv);
	scpdiv.append(btndiv);
	
	ddldiv.append('<label style="float:left; margin-top:8px; margin-left:20px">Please Select name : </label>');
	var cname = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlClassSearchName'});
	ddldiv.append(cname);
	$('#ddlClassSearchName').jqxDropDownList({placeHolder: "Please Select Class Name", height: 20, width: 300, dropDownHeight: 150, theme: getTheme()});

	var abutton = $('<input style="float:right;margin-top:5px; margin-left:3px; margin-right:10px" />').attr({type:'button', id:'btnAddClass', value:'Add'});
	btndiv.append(abutton);
	$('#btnAddClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var cbutton = $('<input style="float:right;margin-top:5px; margin-left:3px" />').attr({type:'button', id:'btnClearClass', value:'Clear'});
	btndiv.append(cbutton);
	$('#btnClearClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-top:5px;" />').attr({type:'button', id:'btnSearchClass', value:'Search'});
	btndiv.append(sbutton);
	$('#btnSearchClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	$('#classControldiv').jqxDockPanel({height: 40});

	$('classMainPanel').empty();

};

function addClassTabsEventListeners() {
	$(document).on('click', '#btnSearchClass', handleSearchClassClick);
	$(document).on('keypress', '#ddlClassSearchName', handleClassSearchNameKeypress);
	$(document).on('click', '#btnClearClass', handleClearClassClick);
	$(document).on('click', '#btnAddClass', handleAddClassClick);
	
	$(document).on('click', '#btnEditClassInformation', handleEditClassClick);
	$(document).on('click', '#btnSaveClassInformation', handleSaveClassClick);
}

// Event handle
function handleSearchClassClick() {
	console.log(" in handle search ... ");

	var item = $('#ddlClassSearchName').jqxDropDownList('getSelectedItem');

	if (null == item) {
	    alert("Please select class name from list ... ");
	} else {
		console.log (" call ajax to get class ... ");
		var cid = item.value;
		if (null == cid || cid == 0) 
			alert("Please select class from list ... ");
		else 
			ajaxGetClassDetailById(cid, getClassDetailById);
	}

	setCurrentFunctionInClassTab("SEARCH");
};

function handleClassSearchNameKeypress(e) {
	if (e.which == 13)
		$('#btnSearchClass').click();
}

function handleClearClassClick() {
	$('#classMainPanel').empty();
	$('#ddlClassSearchName').jqxDropDownList({selectedIndex:-1});
}

function handleEditClassClick() {
	if ("SEARCH" == getCurrentFunctionInClassTab()) {
		if ("Edit" == $('#btnEditClassInformation').val()) {
			enableEditClassInformation();
			$('#txtClassName').focus();
			$('#btnEditClassInformation').val("Cancel");
		} else if ("Cancel" == $('#btnEditClassInformation').val()) {
			console.log (" cancel edit class information ... ");
			cancelUpdateClassInformation();
			disableEditClassInformation();
			$('#btnEditClassInformation').val("Edit");
		}
	} else if ("ADD" == getCurrentFunctionInClassTab()) {
		$('#btnClearClass').click();
	}
};

function handleSaveClassClick() {
	var id = (null != getCurrentClassInClassTab() ? getCurrentClassInClassTab().id : null);
	var isActive = (null != getCurrentClassInClassTab() ? getCurrentClassInClassTab().isactive : true);
	var cname = $('#txtClassName').val();
	var clocation  = $('#txtLocation').val();
	var sdate = $('#divStartTime').jqxDateTimeInput('value');
	var edate = $('#divEndTime').jqxDateTimeInput('value');
	var ncdate = $("#ddlNonClassDateList").jqxDropDownList('getItems'); 
	var ncdatestr = "";
	for (i in ncdate) {
		if (null != ncdate[i] && ncdate[i].value.length > 0) {
			ncdatestr += ncdate[i].value + ",";
		}
	}	
	console.log(" new class : " + cname + " -> " + clocation + " time : " + sdate  + " ~ " + edate + " - " + ncdatestr);
	ajaxSaveClassInformation(id, cname, clocation, sdate, edate, isActive, saveClassInformation);
}

function handleAddClassClick() {
	console.log(" in handle add ... ");
	
	setCurrentFunctionInClassTab("ADD");
	showClassInformation(null);
	setCurrentClassInClassTab(null);
	enableEditClassInformation();
	$('#ddlClassSearchName').jqxDropDownList({selectedIndex: -1});
	$('#txtClassName').focus();
	$('#btnEditClassInformation').val("Cancel");

	initClassLabelInformation();
}

function showClassInformation(data) {

	createClassInformationDiv();

	$('#txtClassName').jqxInput('val', null != data ? data.name : "");
	$('#txtLocation').jqxInput('val', null != data ? data.location : "");
	$('#divStartTime').val(null != data && null != data.classStartTime ? data.classStartTime : null);
	$('#divEndTime').val(null != data && null != data.classEndTime ? data.classEndTime : null);

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
	
	if (null != data && null != data.totalNumberStudent)
		$('#txtTotalStudent').jqxInput('val', data.totalNumberStudent);
	else
		$('#txtTotalStudent').jqxInput('val', "0");

	if (null != data && null != data.totalClassFee)
		$('#txtTotalClassFee').jqxInput('val', '$ ' + data.totalClassFee);
	else
		$('#txtTotalClassFee').jqxInput('val', "$0");
	
	if (null != data && null != data.totalClassCount)
		$('#txtTotalClassTime').jqxInput('val', data.totalClassCount);
	else
		$('#txtTotalClassTime').jqxInput('val', "0");
	
	disableEditClassInformation();
	if (null != data) {
		var nonClassDateSource = getNonClassDateSource(data);
		$('#ddlNonClassDateList').jqxDropDownList({source:nonClassDateSource, displayMember: "text", valueMember: "value"});
		if (nonClassDateSource.length > 0) 
			$('#ddlNonClassDateList').jqxDropDownList({selectedIndex:0});

		showClassSchedularInformation(data.classSchedularList);
		showClassFeeInformation(data.classFeeList)
	}
	
}

function createClassInformationDiv() {

	$('#classMainPanel').empty();

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:10px; border:0px solid; height:120px;"/>').attr({id:'classCommondiv'});
	$('#classMainPanel').append(ccdiv);
	
	var sdiv = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'schedularInformationdiv'});
	$('#classMainPanel').append(sdiv);	

	var ccdiv = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'costInformationdiv'});
	$('#classMainPanel').append(ccdiv);	

	$('#classCommondiv').empty();
	$('#schedularInformationdiv').empty();
	$('#costInformationdiv').empty();
	
	var tmpdiv = $('<div class="InnerDiv" style = "margin-top:5px; border:0px solid;"/>');
	$('#classCommondiv').append(tmpdiv);

	var ldiv = $('<div dock="left" style="margin-top:5px; border:0px solid  #ccc; width:500px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:5px; border:0px solid  #ccc; height:20px;"/>');
	tmpdiv.append(ldiv);
	tmpdiv.append(btndiv);

	ldiv.append('<label style="margin-left:10px; margin-top:8px;"><b>Class Information ... </b></label>');

	var savebtn = $('<input style="float:right; margin-top:0px;margin-right:5px"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	btndiv.append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="float:right; margin-top:0px; margin-right:10px;"/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	btndiv.append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });

	tmpdiv.jqxDockPanel({height: 25});

	$('#classCommondiv').append('<label style="margin-top:10px;"> Class Name : </label>');
	var cname = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtClassName'});
	$('#classCommondiv').append(cname);
	$('#txtClassName').jqxInput({placeHolder: "Class Name", height: 20, width:200, minLength: 1, theme: getTheme() });	
	
	$('#classCommondiv').append('<label style="margin-left:10px;margin-top:10px">Semester : </label>');
	var location = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtLocation'});
	$('#classCommondiv').append(location);
	$('#txtLocation').jqxInput({placeHolder: "Class Semester", height: 20, width:220, minLength: 1, theme: getTheme(), source:ClassLocation });

	var tmpdiv = $('<div class="InnerDiv" style = "float:left; margin-top:5px; border:0px solid;"/>').attr({id:'tmpdiv'});
	$('#classCommondiv').append(tmpdiv);

	$('#tmpdiv').append('<label style="float:left; margin-top:5px;"> Start : </label>');
	var stime = $('<div style="float: left; margin-top:0px; margin-left:10px;"/>').attr({id:'divStartTime'});
	$('#tmpdiv').append(stime);
	$('#divStartTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});
	
	$('#tmpdiv').append('<label style="float:left; margin-top:5px; margin-left:10px;"> End: </label>');
	var etime = $('<div style="float:left; margin-top:0px; margin-left:10px;" />').attr({id:'divEndTime'});
	$('#tmpdiv').append(etime);
	$('#divEndTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});

	$('#tmpdiv').append('<label style="float:left; margin-top:5px; margin-left:10px">Non Class Date : </label>');
	var ddlnoclassdate = $('<div style="float:left; margin-top:0px; margin-left:10px"/>').attr({id:'ddlNonClassDateList'});
	$('#tmpdiv').append(ddlnoclassdate);
	$('#ddlNonClassDateList').jqxDropDownList({placeHolder: "", height: 20, width: 110, dropDownHeight: 100, theme: getTheme()});

	var toTheme = function (className) {
		if (getTheme() == "") return className;
        return className + " " + className + "-" + theme;
    };

    var buttonTemplate = "<div style='float: left; margin-top:4px; margin-left:8px'><div style='width: 15px; height: 15px;'></div></div>";
    var addButton = $(buttonTemplate).attr({id:'btnAddNonClassDate'});
    $('#tmpdiv').append(addButton);
    addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 15, width: 15, theme: getTheme() });
    addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
   	addButton.jqxTooltip({ position: 'bottom', content: "Add"});
   	
   	addButton.click(function () {
   		if (!addButton.jqxButton('disabled')) {
   			console.log("add non class date");
			createAddNonClassDateDiv();

			var offset = $("#classCommondiv").offset();
			$("#addNonClassDatePopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 20 } });
            $("#addNonClassDatePopupWindow").jqxWindow('open');
            $("#divNewNonClassDate").jqxDateTimeInput('focus');
			
   		}
        $('#btnCancelAddNonClassDate').on('click', function () {
			console.log(" cancel add Non class Date ...");
			$("#addNonClassDatePopupWindow").jqxWindow('hide');
        });
        $('#btnAddNonClassDateValue').on('click', function () {
			console.log(" add new non class Date ...");
			var newdate = $('#divNewNonClassDate').jqxDateTimeInput('value');
			var startdate = $('#divStartTime').jqxDateTimeInput('value');
			var enddate = $('#divEndTime').jqxDateTimeInput('value');
			if (newdate < startdate || newdate > enddate)
				alert("Please select between class start date and end date");
			else {
				$("#addNonClassDatePopupWindow").jqxWindow('hide');
				var cid = getCurrentClassInClassTab().id;
				var ncdate = {"id":0, "msdClassId":cid, "nonClassDate":newdate};
				ajaxAddNewNonClassDate(ncdate, addNewNonClassDate);
			}
        });
   	});

   	
    var deleteButton = $(buttonTemplate).attr({id:'btnDeleteNonClassDate'});
    $('#tmpdiv').append(deleteButton);
    deleteButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 15, width: 15, theme: getTheme() });
    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
   	deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
   	
   	deleteButton.click(function () {
   		if (!deleteButton.jqxButton('disabled')) {
   			console.log("delete selected non class date");
   			var item = $("#ddlNonClassDateList").jqxDropDownList('getSelectedItem'); 
   			if (null == item) 
			    alert("please select date from list ");
			else {
				ajaxDeleteNonClassDate(item.value, deleteNonClassDate);
			}
   		}
   	});

	var tmpdiv = $('<div class="InnerDiv" style = "float:left; margin-top:5px; border:0px solid;"/>');
	$('#classCommondiv').append(tmpdiv);

	tmpdiv.append('<label style=" margin-top:0px;"> Total Student : </label>');
	var totalStudent = $('<input style="margin-top:0px; margin-left:5px"/>').attr({type:'text', id:'txtTotalStudent'});
	tmpdiv.append(totalStudent);
	$('#txtTotalStudent').jqxInput({rtl: true, disabled: true, height: 20, width:20, minLength: 1, theme: getTheme() });	
	
	tmpdiv.append('<label style="margin-top:0px; margin-left:10px"> Total Class Fee : </label>');
	var totalClassFee = $('<input style="margin-top:0px; margin-left:5px;"/>').attr({type:'text', id:'txtTotalClassFee'});
	tmpdiv.append(totalClassFee);
	$('#txtTotalClassFee').jqxInput({rtl: true, disabled: true, height: 20, width:100, minLength: 1, theme: getTheme() });	
	
	tmpdiv.append('<label style="margin-top:0px; margin-left:10px"> Total Class Time : </label>');
	var totalClassTime = $('<input style="margin-top:0px; margin-left:5px;"/>').attr({type:'text', id:'txtTotalClassTime'});
	tmpdiv.append(totalClassTime);
	$('#txtTotalClassTime').jqxInput({rtl: true, disabled: true, height: 20, width:20, minLength: 1, theme: getTheme() });	
	
	var label = $('<label id="statuslabel" name="statuslabel" style="margin-top:0px; margin-left:10px;">Class Status : </label>');
	tmpdiv.append(label);

	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="margin-top:0px; margin-left:10px;" />');
	tmpdiv.append(statusLabel);

	var pdiv = $('<div/>').attr({id:'addNonClassDatePopupWindow'});
	$('#classCommondiv').append(pdiv);
	$('#addNonClassDatePopupWindow').append('<div >Add Non Class Date</div> <div style="height:70px; width:300px;" id="addNonClassDatediv"></div>');
    var offset = $("#classCommondiv").offset();
    $("#addNonClassDatePopupWindow").jqxWindow({
    	width: 300, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	$('#classCommondiv').append('<br />');

}

function getClassDetailById(response, request, settings) {
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
	$('#txtLocation').jqxInput('val', data.location);
	if (null != data.classStartTime) {
		$('#divStartTime').val(data.classStartTime);
	}
	if (null != data.classEndTime) {
		$('#divEndTime').val(data.classEndTime);
	}

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

	var nonClassDateSource = getNonClassDateSource(data);
	$('#ddlNonClassDateList').jqxDropDownList({source:nonClassDateSource});
	if (nonClassDateSource.length > 0) 
		$('#ddlNonClassDateList').jqxDropDownList({selectedIndex:0});
}

function showClassSchedularInformation(data) {
	console.log(" in show class schedular information .. ");
	$('#schedularInformationdiv').empty();
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
                
	    editable: false,
	    selectionMode: 'singleRow',
    	showToolbar: true,
    	pageable:true,
    	pagesize:3,
	    altrows: true,
    	ready: function(){},
	    toolbarHeight: 25,
    	renderToolbar: function(toolBar){
    		var toTheme = function (className) {
    			if (getTheme() == "") return className;
	            return className + " " + className + "-" + theme;
    	    }

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
	            	$("#classSchedularDataTable").jqxDataTable('unselectRow', rowIndex);

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

function showClassFeeInformation(data) {
	console.log(" in show class Fee information .. ");
	
	$('#costInformationdiv').empty();
	$('#costInformationdiv').append('<br/>');
	var csdiv = $('<div class="InnerDiv" style="margin-left:80px; border:0px solid;"/>').attr({id:'classFeeDataTable'});	
	$('#costInformationdiv').append(csdiv);
	var pdiv = $('<div/>').attr({id:'addClassFeePopupWindow'});
	$('#costInformationdiv').append(pdiv);
	$('#addClassFeePopupWindow').append('<div >Add Class Fee</div> <div style="height:130px; width:220px;" id="addClassFeediv"></div>');

    var offset = $("#classFeeDataTable").offset();
    $("#addClassFeePopupWindow").jqxWindow({
    	width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'msdClassId', 	type: 'int'},
			{ name: 'feeName',  type: 'string'},
			{ name: 'feeTypeName', 	type: 'string'},
			{ name: 'cost', type: 'number'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
    $("#classFeeDataTable").jqxDataTable({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
                
    	pageable: false,
	    editable: false,
	    selectionMode: 'singleRow',
    	showToolbar: true,
    	pageable:true,
    	pagesize:2,
	    altrows: true,
    	ready: function(){},
	    toolbarHeight: 25,
    	renderToolbar: function(toolBar){
    		var toTheme = function (className) {
    			if (getTheme() == "") return className;
	            return className + " " + className + "-" + theme;
    	    }

        	var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%; margin-top:5px'> <b> Class Fee </b></div>");
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
    	    $("#classFeeDataTable").on('rowSelect', function (event) {
        		var args = event.args;
            	rowIndex = args.index;
	            updateButtons('Select');
    	    });
        	$("#classFeeDataTable").on('rowUnselect', function (event) {
        		updateButtons('Unselect');
	        });
    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
					createAddClassFeeDiv();
				    var offset = $("#classFeeDataTable").offset();
					$("#addClassFeePopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 200 } });
                    $("#addClassFeePopupWindow").jqxWindow('open');
                    
                    $('#btnCancelAddFee').on('click', function () {
						console.log(" cancel add Fee ...");
						$("#addClassFeePopupWindow").jqxWindow('hide');
                    });
                    $('#btnAddFee').on('click', function () {
						console.log(" add new scheduler ...");
                        $("#classFeeDataTable").jqxDataTable('unselectRow', 0);
                        
                        var name = $('#txtFeeName').val();
                        var cost = $('#txtCost').val();
                        var type = $('#costType').jqxDropDownList('getSelectedItem').value;
                        var typename = $('#costType').jqxDropDownList('getSelectedItem').label;
                        var cid = getCurrentClassInClassTab().id;
                        
                        if (null == name || name.length < 1) {
                        	alert("please provide one name ");
                        } else if (null == cost || cost.length < 1) {
                        	alert("please provide fee value ");
                        } else if (null == type || type < 1) {
                        	alert("please select one type from list ");
                        } else {
                            $("#classFeeDataTable").jqxDataTable('selectRow', 0);
							$("#addClassFeePopupWindow").jqxWindow('hide');

							var classfee = {"id":0, "msdClassId":getCurrentClassInClassTab().id, "feeName":name, "cost":cost, "feeTypeName":null, "msdCostTypeId":type};
							ajaxAddNewFee(classfee, addNewFee);
                            $("#classFeeDataTable").jqxDataTable('addRow', null, {"id":0, "msdClassId":getCurrentClassInClassTab().id, "feeName":name, "cost":cost, "feeTypeName":typename}, 'first');
                        }
                    });
                    
                	updateButtons('add');
	            }
    	    });
        	deleteButton.click(function () {
        		if (!deleteButton.jqxButton('disabled')) {
     				var deleterow = $("#classFeeDataTable").jqxDataTable('getSelection');
             		$("#classFeeDataTable").jqxDataTable('deleteRow', rowIndex);
	                updateButtons('delete');
	            	$("#classFeeDataTable").jqxDataTable('unselectRow', rowIndex);

	                ajaxDeleteClassFee(deleterow[0].id, deleteClassFee);
    	        }
        	});
	    },
    	columns: [
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'feeName', width: 250},
			{text: 'Type', datafield: 'feeTypeName', width:250},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
		]
    });

	$('#costInformationdiv').append('<br/>');
}

function deleteClassSchedular(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete class schedular ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete class schedular ... ");
	} else {
		alert("error to delete class schedule ... ");
	}
	$('#btnSearchClass').click();
}

function deleteClassFee(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete class fee ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete class fee ... ");
	} else {
		alert("error to delete class fee ... ");
	}
	$('#btnSearchClass').click();
}

function deleteNonClassDate(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete non class date ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete non class date ... ");
	} else {
		alert("error to delete non class date ... ");
	}
	$('#btnSearchClass').click();
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
	$('#txtStartTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:22} });

	// end time
	var tdiv = $('<div style="margin-top:5px; width:180px;border:0px solid;" align="right" />');
	$('#addClassSchedulerdiv').append(tdiv);
	tdiv.append('<label style="margin-top:2px; margin-left:5px;">End : </label>');
	var etime = $('<input style="margin-left:5px;"/>').attr({type:'text', id:'txtEndTime'});
	tdiv.append(etime);
	$('#txtEndTime').jqxInput({rtl: true, placeHolder: "End Time", height: 20, width:100, minLength: 1, theme: getTheme() });
	$('#txtEndTime').timepicker({showAnim:'blind', minuteText:'Min', minutes: {interval:15}, hours:{starts:8, ends:22} });
	
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

function createAddClassFeeDiv() {
	$('#addClassFeediv').empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	$('#addClassFeediv').append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtFeeName'});
	tdiv.append(name);
	$('#txtFeeName').jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 180, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	$('#addClassFeediv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Fee :</label>');
	var cost = $('<div/>').attr({id:'txtCost'});
	tdiv.append(cost);
	$('#txtCost').jqxNumberInput({ width: '180px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	$('#addClassFeediv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Type :</label>');
	var costType = $('<div/>').attr({id:'costType'});
	tdiv.append(costType);
	$('#costType').jqxDropDownList({selectedIndex: 1, width: '180', height: '20', theme: getTheme(), source: getAllCostType(), selectedIndex: -1, displayMember: "name", valueMember: "id"});

	$('#addClassFeediv').append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	$('#addClassFeediv').append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddFee', value:'Add'});
	atdiv.append(btnadd);
	$('#btnAddFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddFee', value:'Cancel'});
	atdiv.append(btncancel);
	$('#btnCancelAddFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function createAddNonClassDateDiv() {
	$('#addNonClassDatediv').empty();

	var atdiv = $('<div style="margin-top:5px; border:0px solid;" />');
	$('#addNonClassDatediv').append(atdiv);
	atdiv.append('<label style="float:left; margin-top:5px;"> Select Date : </label>');
	var stime = $('<div style="float:left; margin-top:0px; margin-left:10px;"/>').attr({id:'divNewNonClassDate'});
	atdiv.append(stime);
	$('#divNewNonClassDate').jqxDateTimeInput({width: '100px', height: '20px', formatString: 'd', theme: getTheme()});

	// action button
	var atdiv = $('<div style="float:right; margin-top:10px; border:0px solid;" />');
	$('#addNonClassDatediv').append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddNonClassDateValue', value:'Add'});
	atdiv.append(btnadd);
	$('#btnAddNonClassDateValue').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddNonClassDate', value:'Cancel'});
	atdiv.append(btncancel);
	$('#btnCancelAddNonClassDate').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function addNewSchedulars(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class schedulars successfully ... ");
	} else {
		alert('error');
	}
	$('#btnSearchClass').click();
}

function addNewFee(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class fee successfully ... ");
	} else {
		alert('error');
	}
	$('#btnSearchClass').click();
}

function addNewNonClassDate(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add non class date successfully ... ");
	} else {
		alert('error');
	}
	$('#btnSearchClass').click();
}

function saveClassInformation(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class successfully ... ");
		data = $.parseJSON(response.result);
		ajaxGetAllClass(getAllClass);
	} else {
		alert('error');
	}
}

function loadClassNameDropDownListDataSource(data) {
	var activesource = {
		datafields:[
			{ name: 'value',   type: 'int'}, 
			{ name: 'text',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	
	$('#ddlClassSearchName').jqxDropDownList({source:activedataadapter, displayMember: "text", valueMember: "value"});
	
		if (getCurrentFunctionInClassTab() == 'ADD') {
			if (null != getActiveClassNameList() && getActiveClassNameList().length > 0) {
				$('#ddlClassSearchName').jqxDropDownList({selectedIndex: getActiveClassNameList().length });
				$('#btnSearchClass').click();
			}
		} else if (getCurrentFunctionInClassTab() == 'SEARCH') {
			$('#btnSearchClass').click();
		}
} 

function initClassLabelInformation() {
	$('#txtTotalStudent').jqxInput('val', "0");
	$('#txtTotalClassFee').jqxInput('val', "$0");
	$('#txtTotalClassTime').jqxInput('val', "0");
	$('#labelClassStatus').text('N/A');
}

function enableEditClassInformation() {
	setupEditClassInformation(false);
}

function disableEditClassInformation() {
	setupEditClassInformation(true)
}

function setupEditClassInformation(edit) {
	$('#txtClassName').jqxInput({disabled:edit });
	$('#txtLocation').jqxInput({disabled:edit });
	$('#divStartTime').jqxDateTimeInput({ disabled: edit });
	$('#divEndTime').jqxDateTimeInput({ disabled: edit });
	$('#btnSaveClassInformation').jqxButton('disabled', edit);
//	$('#btnAddNonClassDate').jqxButton('disabled', edit);
//	$('#btnDeleteNonClassDate').jqxButton('disabled', edit);
}

function getNonClassDateSource(cdata) {
	var nonClassDateList = [];
	var  data = cdata.nonClassDateList;
	if (null != cdata || null != data || data.length > 0) {
		for (index in data) {
			nonClassDateList.push({text:getFormattedDateToMMDDYYYY(data[index].nonClassDate), value:data[index].id});
		}
	}
	return nonClassDateList;
}

function showClassStatusLabel(data) {
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

