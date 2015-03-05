// UI Creature
function initClassTab() {
	console.log(" init class tab ... ");

	var ccp = $('#classControlPanel');
	ccp.empty();
	
	var scpdiv = $('<div style="border:0px solid;"/>').attr({id:'classControldiv'});
	ccp.append(scpdiv);

	var ddldiv = $('<div style="margin-top:0px; border:0px solid  #ccc; height:30px;"/>');
	var btndiv = $('<div style="margin-top:0px; border:0px solid  #ccc; height:20px;"/>');
	scpdiv.append(ddldiv);
	scpdiv.append(btndiv);

	var sddldiv = $('<div style="width: 200px; border: 0px solid #ccc;"/>');
	var tddldiv = $('<div style="width: 220px; border: 0px solid #ccc;"/>');
	var nddldiv = $('<div style="border: 0px solid #ccc;"/>');
	ddldiv.append(sddldiv);
	ddldiv.append(tddldiv);
	ddldiv.append(nddldiv);

	sddldiv.append('<label style="float:left; margin-top:8px; margin-left:5px">Semester : </label>');
	var snameddl = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlSemesterNameInClassTab'});
	sddldiv.append(snameddl);
	snameddl.jqxDropDownList({placeHolder: "Select Semester", height: 20, width: 120, dropDownHeight: 100, theme: getTheme()});

	tddldiv.append('<label style="float:left; margin-top:8px; margin-left:5px">Class Type : </label>');
	var tnameddl = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlClassTypeNameInClassTab'});
	tddldiv.append(tnameddl);
	tnameddl.jqxDropDownList({placeHolder: "Select Type", height: 20, width: 120, dropDownHeight: 100, theme: getTheme()});

	nddldiv.append('<label style="float:left; margin-top:8px; margin-left:10px">Class Name : </label>');
	var cnameddl = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlClassNameInClassTab'});
	nddldiv.append(cnameddl);
	cnameddl.jqxDropDownList({placeHolder: "Select Class Name", height: 20, width: 220, dropDownHeight: 200, theme: getTheme()});

	var abutton = $('<input style="float:right;margin-top:0px; margin-left:3px; margin-right:10px" />').attr({type:'button', id:'btnAddClass', value:'Add'});
	btndiv.append(abutton);
	$('#btnAddClass').jqxButton({ width: '65', height: 20, theme: getTheme() });
	
	var cbutton = $('<input style="float:right;margin-top:0px; margin-left:3px" />').attr({type:'button', id:'btnClearClass', value:'Clear'});
	btndiv.append(cbutton);
	$('#btnClearClass').jqxButton({ width: '65', height: 20, theme: getTheme() });

	ddldiv.jqxDockPanel({height: 40});
	sddldiv.attr('dock', 'left');
	tddldiv.attr('dock', 'left');
	nddldiv.attr('dock', 'left');

	$('classMainPanel').empty();

	addClassTabsEventListeners();
};

function addClassTabsEventListeners() {
	$(document).on('click', '#btnClearClass', handleClearClassClick);
	$(document).on('click', '#btnAddClass', handleAddClassClick);
	
	$(document).on('click', '#btnEditClassInformation', handleEditClassClick);
	$(document).on('click', '#btnSaveClassInformation', handleSaveClassClick);
	
	$(document).on('change', '#ddlSemesterNameInClassTab', handleSemesterSearchNameDropdownChange);
	$(document).on('change', '#ddlClassTypeNameInClassTab', handleClassTypeSearchNameDropdownChange);
	$(document).on('change', '#ddlClassNameInClassTab', handleClassearchNameDropdownChange);
}

// Event handle
function handleClassearchNameDropdownChange() {
	console.log(" in handle search ... ");
	if ($('#ddlClassNameInClassTab').jqxDropDownList('selectedIndex') == -1) return;

	var item = $('#ddlClassNameInClassTab').jqxDropDownList('getSelectedItem');

	setCurrentFunctionInClassTab("SEARCH");

	ajaxGetClassDetailById(item.value, getClassDetailById);
};

function handleClearClassClick() {
	$('#classMainPanel').empty();
	$('#ddlSemesterNameInClassTab').jqxDropDownList('val', getCurrentSemester().id);
	$('#ddlClassTypeNameInClassTab').jqxDropDownList({selectedIndex:0});
	$('#ddlClassNameInClassTab').jqxDropDownList({selectedIndex:-1});
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
	var id = (null != getCurrentClassInClassTab() ? getCurrentClassInClassTab().id : 0);
	var isActive = (null != getCurrentClassInClassTab() ? getCurrentClassInClassTab().isactive : true);
	var cname = $('#txtClassName').val();
	var sdate = $('#divStartTime').jqxDateTimeInput('value');
	var edate = $('#divEndTime').jqxDateTimeInput('value');
	var ncdate = $("#ddlNonClassDateList").jqxDropDownList('getItems'); 
	var sid = 0;
	var tid = 0;
	if ("ADD" == getCurrentFunctionInClassTab()) {
		var semester = $('#ddlSemesterNameInClassTabForAdd').jqxDropDownList('getSelectedItem');
		sid = null != semester ? semester.value : 0; 
		var type = $('#ddlClassTypeNameInClassTabForAdd').jqxDropDownList('getSelectedItem');
		tid = null != type ? type.value : 0; 
		id = 0;
	} else {
		sid = getCurrentClassInClassTab().semester;
		tid = getCurrentClassInClassTab().typeid;
	}
	if (null == sid || sid == 0) {
		alert("Please select semester from this list");
		return;
	}
	if (null == tid || tid == 0) {
		alert("Please select class type from this list");
		return;
	}
	ajaxSaveClassInformation(id, cname, sid, tid, sdate, edate, isActive, saveClassInformation);
}

function handleAddClassClick() {
	console.log(" in handle add ... ");

	setCurrentFunctionInClassTab("ADD");
	showClassInformation(null);
	setCurrentClassInClassTab(null);
	enableEditClassInformation();
	$('#ddlClassNameInClassTab').jqxDropDownList({selectedIndex: -1});
	$('#txtClassName').focus();
	$('#btnEditClassInformation').val("Cancel");

	initClassLabelInformation();
}

function showClassInformation(data) {

	createClassInformationDiv();

	$('#txtClassName').jqxInput('val', null != data ? data.name : "");
	if ("SEARCH" == getCurrentFunctionInClassTab()) {
		$('#txtSemesterName').jqxInput('val', null != data ? data.semesterName : "");
		$('#txtClassTypeName').jqxInput('val', null != data ? data.typeName : "");
	} else {
		var semester = $('#ddlSemesterNameInClassTab').jqxDropDownList('getSelectedItem');
		$('#ddlSemesterNameInClassTabForAdd').jqxDropDownList('val', null != semester ? semester.value : -1);
		var type = $('#ddlClassTypeNameInClassTab').jqxDropDownList('getSelectedItem');
		$('#ddlClassTypeNameInClassTabForAdd').jqxDropDownList('val', null != type ? type.value : -1);
		$('#btnEditClassInformation').val("Cancel");
		$('#ddlClassTypeNameInClassTabForAdd').jqxDropDownList({ disabled: true });
		$('#ddlSemesterNameInClassTabForAdd').jqxDropDownList({ disabled: true });
	}
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
		if (data.typeid != 10)

		showClassFeeInformation(data.classFeeList)
	}
	
}

function createClassInformationDiv() {

	var cmp = $('#classMainPanel')
	cmp.empty();

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:10px; border:0px solid; height:120px;"/>').attr({id:'classCommondiv'});
	cmp.append(ccdiv);
	
	var sidiv = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'schedularInformationdiv'});
	cmp.append(sidiv);	

	var fidiv = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'feeInformationdiv'});
	cmp.append(fidiv);	

	ccdiv.empty();
	sidiv.empty();
	fidiv.empty();
	
	var tmpdiv = $('<div class="InnerDiv" style = "margin-top:5px; border:0px solid;"/>');
	ccdiv.append(tmpdiv);

	var ldiv = $('<div style="margin-top:5px; border:0px solid  #ccc; width:500px;"/>');
	var btndiv = $('<div style="margin-top:5px; border:0px solid  #ccc; height:20px;"/>');
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
	ldiv.attr('dock', 'left');
	btndiv.attr('dock', 'left');

	if ("SEARCH" == getCurrentFunctionInClassTab()) {
		ccdiv.append('<label style="margin-top:10px;"> Class Name : </label>');
		var cname = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtClassName'});
		ccdiv.append(cname);
		cname.jqxInput({placeHolder: "Class Name", height: 20, width:150, minLength: 1, theme: getTheme() });	
	
		ccdiv.append('<label style="margin-left:10px;margin-top:10px">Semester : </label>');
		var semesterName = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtSemesterName'});
		ccdiv.append(semesterName);
		semesterName.jqxInput({disabled:true, placeHolder: "Class Semester", height: 20, width:120, minLength: 1, theme: getTheme() });

		ccdiv.append('<label style="margin-left:10px;margin-top:10px">Class Type : </label>');
		var typeName = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtClassTypeName'});
		ccdiv.append(typeName);
		typeName.jqxInput({disabled:true, placeHolder: "Class Type", height: 20, width:120, minLength: 1, theme: getTheme() });
	} else {
		var ddldiv = $('<div style="margin-top:0px; border:0px solid  #ccc;"/>');
		ccdiv.append(ddldiv);

		var sddldiv = $('<div style="width: 200px; border: 0px solid #ccc;"/>');
		var tddldiv = $('<div style="width: 220px; border: 0px solid #ccc;"/>');
		var nddldiv = $('<div style="border: 0px solid #ccc;"/>');
		ddldiv.append(sddldiv);
		ddldiv.append(tddldiv);
		ddldiv.append(nddldiv);

		sddldiv.append('<label style="float:left; margin-top:10px; margin-left:5px">Semester : </label>');
		var snameddl = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlSemesterNameInClassTabForAdd'});
		sddldiv.append(snameddl);
		snameddl.jqxDropDownList({placeHolder: "Select Semester", height: 20, width: 120, dropDownHeight: 100, theme: getTheme()});
		var activesource = {
			datafields:[
				{ name: 'id',   type: 'int'}, 
				{ name: 'name',  type: 'string'}
			],
			datatype:'json',
			localdata:getSemesterList()
		}
		var activedataadapter = new $.jqx.dataAdapter(activesource);
		snameddl.jqxDropDownList({source:activedataadapter, displayMember: "name", valueMember: "id"});

		tddldiv.append('<label style="float:left; margin-top:10px; margin-left:5px">Class Type : </label>');
		var tnameddl = $('<div style="margin-top:5px; margin-left:5px"/>').attr({id:'ddlClassTypeNameInClassTabForAdd'});
		tddldiv.append(tnameddl);
		tnameddl.jqxDropDownList({placeHolder: "Select Type", height: 20, width: 120, dropDownHeight: 100, theme: getTheme()});
		var activesource = {
			datafields:[
				{ name: 'id',   type: 'int'}, 
				{ name: 'name',  type: 'string'}
			],
			datatype:'json',
			localdata:getAllClassType()
		}
		var activedataadapter = new $.jqx.dataAdapter(activesource);
		tnameddl.jqxDropDownList({source:activedataadapter, displayMember: "name", valueMember: "id"});

		nddldiv.append('<label style="float:left; margin-top:10px; margin-left:10px">Class Name : </label>');
		var cname = $('<input style="margin-top:5px;"/>').attr({type:'text', id:'txtClassName'});
		nddldiv.append(cname);
		cname.jqxInput({placeHolder: "Class Name", height: 20, width:200, minLength: 1, theme: getTheme() });	

		ddldiv.jqxDockPanel({height: 30});
		sddldiv.attr('dock', 'left');
		tddldiv.attr('dock', 'left');
		nddldiv.attr('dock', 'left');

	}
	
	var tmpdiv = $('<div class="InnerDiv" style = "float:left; margin-top:5px; border:0px solid;"/>').attr({id:'tmpdiv'});
	ccdiv.append(tmpdiv);

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
	ccdiv.append(tmpdiv);

	tmpdiv.append('<label style=" margin-top:0px;"> Total Student : </label>');
	var totalStudent = $('<input style="margin-top:0px; margin-left:5px"/>').attr({type:'text', id:'txtTotalStudent'});
	tmpdiv.append(totalStudent);
	$('#txtTotalStudent').jqxInput({rtl: true, disabled: true, height: 20, width:40, minLength: 1, theme: getTheme() });	

	tmpdiv.append('<label style="margin-top:0px; margin-left:10px"> Total Class Fee : </label>');
	var totalClassFee = $('<input style="margin-top:0px; margin-left:5px;"/>').attr({type:'text', id:'txtTotalClassFee'});
	tmpdiv.append(totalClassFee);
	$('#txtTotalClassFee').jqxInput({rtl: true, disabled: true, height: 20, width:100, minLength: 1, theme: getTheme() });	

	tmpdiv.append('<label style="margin-top:0px; margin-left:10px"> Total Class Time : </label>');
	var totalClassTime = $('<input style="margin-top:0px; margin-left:5px;"/>').attr({type:'text', id:'txtTotalClassTime'});
	tmpdiv.append(totalClassTime);
	$('#txtTotalClassTime').jqxInput({rtl: true, disabled: true, height: 20, width:40, minLength: 1, theme: getTheme() });	
	
	var label = $('<label id="statuslabel" name="statuslabel" style="margin-top:0px; margin-left:10px;">Class Status : </label>');
	tmpdiv.append(label);

	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="margin-top:0px; margin-left:10px;" />');
	tmpdiv.append(statusLabel);

	var pdiv = $('<div/>').attr({id:'addNonClassDatePopupWindow'});
	ccdiv.append(pdiv);
	$('#addNonClassDatePopupWindow').append('<div >Add Non Class Date</div> <div style="height:70px; width:300px;" id="addNonClassDatediv"></div>');
    var offset = $("#classCommondiv").offset();
    $("#addNonClassDatePopupWindow").jqxWindow({
    	width: 300, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	ccdiv.append('<br />');

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
	$('#txtSemesterName').jqxInput('val', data.semesterName);
	$('#txtClassTypeName').jqxInput('val', data.typeName);
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
	var sidiv = $('#schedularInformationdiv');
	sidiv.empty();
	
	sidiv.append('<br/>');
	var csdiv = $('<div class="InnerDiv" style="margin-left:80px; border:0px solid;"/>').attr({id:'classSchedularGrid'});	
	sidiv.append(csdiv);
	var pdiv = $('<div/>').attr({id:'addClassSchedularPopupWindow'});
	sidiv.append(pdiv);
	$('#addClassSchedularPopupWindow').append('<div >Add Weekday Class Scheduler</div> <div style="height:130px; width:220px;" id="addClassSchedulerdiv"></div>');

    var offset = csdiv.offset();
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
	
    csdiv.jqxGrid({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
	    editable: false,
	    selectionMode: 'singlerow',
    	showToolbar: true,
    	pageable:false,
    	autoHeight:true,
	    altrows: true,
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
	        deleteButton.jqxButton({ cursor: "pointer", disabled: false, enableDefault: false,  height: 25, width: 25 });
    	    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
        	deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});

    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
					createAddClassSchedularDiv();
				    var offset = csdiv.offset();
					$("#addClassSchedularPopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 20 } });
                    $("#addClassSchedularPopupWindow").jqxWindow('open');
                    
                    $('#btnCancelAddSchedular').on('click', function () {
						console.log(" cancel add scheduler ...");
						$("#addClassSchedularPopupWindow").jqxWindow('hide');
                    });
                    $('#btnAddSchedular').on('click', function () {
						console.log(" add new scheduler ...");
                        csdiv.jqxGrid('unselectRow', 0);
						
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
								weekdaystrs.push(weekday);
							});
                            csdiv.jqxGrid('selectRow', 0);
							$("#addClassSchedularPopupWindow").jqxWindow('hide');

							newschedular = {"id":0, "msdClassId":getCurrentClassInClassTab().id, "startTime":stime, "endTime":etime, "weekdays":weekdaystrs};
	
							ajaxDddNewSchedulars(newschedular, addNewSchedulars);
						}
                    });
	            }
    	    });
        	deleteButton.click(function () {
        		if (!deleteButton.jqxButton('disabled')) {
     				var deleterowindex = csdiv.jqxGrid('getselectedrowindex');
     				if (deleterowindex < 0) {
     					alert("Please select one to delete");
     					return;
     				}
	            	var deleterow = csdiv.jqxGrid('getrowdata', deleterowindex);
	                ajaxDeleteClassSchedular(deleterow.id, deleteClassSchedular);
    	        }
        	});
	    },
    	columns: [
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Weekday', datafield: 'weekdayStr'},
			{text: 'Start Time', datafield: 'startTime', width:180},
			{text: 'End Time', datafield: 'endTime', width:180}
		]
    });

	sidiv.append('<br/>');
}

function showClassFeeInformation(data) {
	console.log(" in show class Fee information .. ");
	var fidiv = $('#feeInformationdiv');
	
	fidiv.empty();
	fidiv.append('<br/>');
	var cfdiv = $('<div class="InnerDiv" style="margin-left:80px; border:0px solid;"/>').attr({id:'classFeeGrid'});	
	fidiv.append(cfdiv);
	var pdiv = $('<div/>').attr({id:'addClassFeePopupWindow'});
	fidiv.append(pdiv);
	$('#addClassFeePopupWindow').append('<div >Add Class Fee</div> <div style="height:280px; width:350px;" id="addClassFeediv"></div>');

    var offset = cfdiv.offset();
    $("#addClassFeePopupWindow").jqxWindow({
    	width: 500, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
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
	
    cfdiv.jqxGrid({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
                
    	pageable: false,
	    editable: false,
	    selectionMode: 'singleRow',
    	showToolbar: true,
		autoHeight: true,
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
	        deleteButton.jqxButton({ cursor: "pointer", disabled: false, enableDefault: false,  height: 25, width: 25 });
    	    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
        	deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
	        var rowIndex = null;

    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
					createAddClassFeeDiv();
				    var offset = cfdiv.offset();
					$("#addClassFeePopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 200 } });
                    $("#addClassFeePopupWindow").jqxWindow('open');
                    
                    $('#btnCancelAddFee').on('click', function () {
						console.log(" cancel add Fee ...");
						$("#addClassFeePopupWindow").jqxWindow('hide');
                    });
                    $('#btnAddFee').on('click', function () {
						console.log(" add new class fee ...");
                        cfdiv.jqxDataTable('unselectRow', 0);
                        
                        var name = $('#txtFeeName').val();
                        var cost = $('#txtCost').val();
                        var type = $('#costType').jqxDropDownList('getSelectedItem').value;
                        var opay = $('#txtOneTimePay') != null ? $('#txtOneTimePay').val() : 0;
                        var mpay = $('#txtMonthlyPay') != null ? $('#txtMonthlyPay').val() : 0;
                        var wpay = $('#txtWeeklyPay') != null ? $('#txtWeeklyPay').val() : 0;
                        var dpay = $('#txtDailyPay') != null ? $('#txtDailyPay').val() : 0;

                        var cid = getCurrentClassInClassTab().id;
                        
                        if (null == name || name.length < 1) {
                        	alert("please provide one name ");
                        } else if (null == cost || cost.length < 1) {
                        	alert("please provide fee value ");
                        } else if (null == type || type < 1) {
                        	alert("please select one type from list ");
                        } else {
                            cfdiv.jqxDataTable('selectRow', 0);
							$("#addClassFeePopupWindow").jqxWindow('hide');

							var classfee = {"id":0, "msdClassId":getCurrentClassInClassTab().id, 
								"feeName":name, "cost":cost, "feeTypeName":null, "msdCostTypeId":type, 
								"oneTimePay":opay, "monthlyPay":mpay, "weeklyPay":wpay, "dailyPay": dpay};
							ajaxAddNewFee(classfee, addNewFee);
                        }
                    });
	            }
    	    });
        	deleteButton.click(function () {
        		if (!deleteButton.jqxButton('disabled')) {
     				var deleterowindex = cfdiv.jqxGrid('getselectedrowindex');
     				if (deleterowindex < 0) {
     					alert("Please select one to delete");
     					return;
     				}
	            	var deleterow = cfdiv.jqxGrid('getrowdata', deleterowindex);
	                ajaxDeleteClassFee(deleterow.id, deleteClassFee);
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

	fidiv.append('<br/>');
}

function deleteClassSchedular(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete class schedular ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete class schedular ... ");
	} else {
		alert("error to delete class schedule ... ");
	}
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
}

function deleteClassFee(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete class fee ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete class fee ... ");
	} else {
		alert("error to delete class fee ... ");
	}
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
}

function deleteNonClassDate(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete non class date ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete non class date ... ");
	} else {
		alert("error to delete non class date ... ");
	}
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
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
	createAddClassFeeDetailDiv();
}
function createAddClassFeeDetailDiv() {
	var acfdiv = $('#addClassFeediv');
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Class Fee Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtFeeName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 350, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Type :</label>');
	var costType = $('<div/>').attr({id:'costType'});
	tdiv.append(costType);
	costType.jqxDropDownList({selectedIndex: 1, width: '350', height: '20', theme: getTheme(), source: getAllFeeType(), selectedIndex: -1, displayMember: "name", valueMember: "id"});

	$('#addClassFeediv').append('<br/>');

	if (getCurrentClassInClassTab().typeName == 'Private Class') {
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Class Fee List:</label>');
	var privateClassFee = $('<div/>').attr({id:'privateClassFee'});
	tdiv.append(privateClassFee);
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'feeName',  type: 'string'},
			{ name: 'cost', type: 'number'}
		],
		datatype:'json',
		localdata:getAllPrivateClassFee()
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
	    autoBind: true,
    	beforeLoadComplete: function (records) {
        	var data = new Array();
	        // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
    	    for (var i = 0; i < records.length; i++) {
        	    var employee = records[i];
            	employee.showItem = "$" + employee.cost + " - " + employee.feeName;
    	        data.push(employee);
        	}
	        return data;
    	}
	});
	privateClassFee.jqxDropDownList({selectedIndex: 1, width: '350', height: '20', theme: getTheme(), source: dataAdapter, selectedIndex: -1, displayMember: "showItem", valueMember: "id"});
	}
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Fee :</label>');
	var cost = $('<div/>').attr({id:'txtCost'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '350px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	if (getCurrentClassInClassTab().typeName == 'Private Class') {
		var tdiv = $('<div style="float:right; width:500px; margin-top:5px; border:0px solid;"/>');
		acfdiv.append(tdiv);
	
		var mdiv = $('<div style="margin-top: 0px; width: 200px; border:0px solid;" />');
		var ldiv = $('<div style="margin-top: 0px; width: 150px; border:0px solid;" />');
		var rdiv = $('<div style="margin-top: 0px; width: 150px; border:0px solid;" />');
	
		tdiv.append(mdiv);
		tdiv.append(rdiv);
		tdiv.append(ldiv);

		var bsdiv = $('<div style="margin-top: 0px; border:0px solid;" id="paybysemester"> Pay By Semester </div>');
		ldiv.append(bsdiv);
		var bmdiv = $('<div style="margin-top: 0px; border:0px solid;" id="paybymonth"> Pay By Month </div>');
		rdiv.append(bmdiv);
	
		tdiv.jqxDockPanel({height: 20});
		ldiv.attr('dock', 'left');
		mdiv.attr('dock', 'left');
		rdiv.attr('dock', 'left');

	    bsdiv.jqxRadioButton({ width: 150, height: 20, checked: true, theme: getTheme()});
    	bmdiv.jqxRadioButton({ width: 100, height: 20, theme: getTheme()});
	}
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">One Time Pay :</label>');
	var oneTimePay = $('<div/>').attr({id:'txtOneTimePay'});
	tdiv.append(oneTimePay);
	oneTimePay.jqxNumberInput({ width: '350px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	acfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Monthly Pay :</label>');
	var monthlyPay = $('<div/>').attr({id:'txtMonthlyPay'});
	tdiv.append(monthlyPay);
	monthlyPay.jqxNumberInput({ width: '350px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	if (getCurrentClassInClassTab().typeName != 'Private Class') {
		var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
		acfdiv.append(tdiv);
		tdiv.append('<label style="float:left; margin-top:2px;">Weekly Pay :</label>');
		var weeklyPay = $('<div/>').attr({id:'txtWeeklyPay'});
		tdiv.append(weeklyPay);
		weeklyPay.jqxNumberInput({ width: '350px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

		var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
		acfdiv.append(tdiv);
		tdiv.append('<label style="float:left; margin-top:2px;">Daily Pay :</label>');
		var dailypay = $('<div/>').attr({id:'txtDailyPay'});
		tdiv.append(dailypay);
		dailypay.jqxNumberInput({ width: '350px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	} else {
		privateClassFee.on('change', function (event){     
		    var args = event.args;
    		if (args) {
		    	// index represents the item's index.                      
	    		var index = args.index;
		    	var item = args.item;
	    		// get item's label and value.
		    	var label = item.label;
	    		var value = item.value;
    			$('#txtCost').jqxNumberInput('val', item.originalItem.cost);
    			$('#txtMonthlyPay').jqxNumberInput('val', item.originalItem.cost);
			} 
		});
    	$('#paybysemester').on('checked', function (event) {
			monthlyPay.jqxNumberInput({ disabled: true});
			oneTimePay.jqxNumberInput({ disabled: false});
    	}); 
    	$('#paybymonth').on('checked', function (event) {
			monthlyPay.jqxNumberInput({ disabled: false});
			oneTimePay.jqxNumberInput({ disabled: true});
    	}); 
		$('#paybymonth').jqxRadioButton('check');
	}
/*	
	if (getCurrentClassInClassTab().typeName != 'Private Class') {
		privateClassFee.jqxDropDownList({disabled: true});
		cost.jqxNumberInput({ disabled: true});
	} else {
		dailypay.jqxNumberInput({ disabled: true});
		weeklyPay.jqxNumberInput({ disabled: true});
	}
*/
	
	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	acfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddFee', value:'Add'});
	atdiv.append(btnadd);
	$('#btnAddFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddFee', value:'Cancel'});
	atdiv.append(btncancel);
	$('#btnCancelAddFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function creatAddSpecialClassFeeDiv() {
}

function createAddCampClassFeeDiv() {
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
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
}

function addNewFee(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class fee successfully ... ");
	} else {
		alert('error');
	}
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
}

function addNewNonClassDate(response, request, settings) {
	var data = null;
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add non class date successfully ... ");
		data = $.parseJSON(response.result);
	} else {
		alert('error');
	}
	ajaxGetClassDetailById(getCurrentClassInClassTab().id, getClassDetailById);
}

function saveClassInformation(response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add class successfully ... ");
		data = $.parseJSON(response.result);
	    var sid = $('#ddlSemesterNameInClassTab').jqxDropDownList('getSelectedItem').value;
	    var tid = $('#ddlClassTypeNameInClassTab').jqxDropDownList('getSelectedItem').value;
	    if 	("ADD" == getCurrentFunctionInClassTab()) {

		    var sources = $('#ddlClassNameInClassTab').jqxDropDownList('source');
		    if (null != sources) { 
		    	var index = $('#ddlClassNameInClassTab').jqxDropDownList('source').records.length;
		    	$('#ddlClassNameInClassTab').jqxDropDownList('insertAt', {text:data.name + ' - ' + data.semesterName, value:data.id}, index - 1);
				$('#ddlClassNameInClassTab').jqxDropDownList('val', data.id);
			}
		} else {
			$('#ddlClassNameInClassTab').jqxDropDownList('updateItem', {text:data.name + ' - ' + data.semesterName, value:data.id}, data.id);
	    }
		setCurrentFunctionInClassTab("SEARCH");
		ajaxGetClassDetailById(data.id, getClassDetailById);
	} else {
		alert('error');
	}
	
}

function loadClassTabClassDropDownListDataSource(data) {
	if (null == data) {
		$('#ddlClassNameInClassTab').jqxDropDownList({source:null});
		return;
	}
	
	var activesource = {
		datafields:[
			{ name: 'value',   type: 'int'}, 
			{ name: 'text',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	
	$('#ddlClassNameInClassTab').jqxDropDownList({source:activedataadapter, displayMember: "text", valueMember: "value"});
} 

function loadClassTabSemesterDropDownListDataSource(data) {
	var activesource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	
	$('#ddlSemesterNameInClassTab').jqxDropDownList({source:activedataadapter, displayMember: "name", valueMember: "id"});
	
	var sid = getCurrentSemester().id;
	
	$('#ddlSemesterNameInClassTab').jqxDropDownList('selectItem',sid);
} 

function loadClassTabTypeDropDownListDataSource(data) {
	var activesource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	
	$('#ddlClassTypeNameInClassTab').jqxDropDownList({source:activedataadapter, displayMember: "name", valueMember: "id"});
	$('#ddlClassTypeNameInClassTab').jqxDropDownList('selectIndex', 0 );
}

function handleSemesterSearchNameDropdownChange(event) {
    var args = event.args;
    if (args) {
	    var item = args.item;

		if (null != item) {
	    	var label = item.label;
		    var value = item.value;
	    
    		$('#classMainPanel').empty();
			$('#ddlClassNameInClassTab').jqxDropDownList({selectedIndex: -1});
			$('#ddlClassTypeNameInClassTab').jqxDropDownList({selectedIndex: 0});
	    }
    }
}

function handleClassTypeSearchNameDropdownChange(event) {
    var args = event.args;
    if (args) {
	    var item = args.item;

		if (null != item) {
			if (null == item) return;
		
    		var label = item.label;
	    	var tid = item.value;
		    var sid = $('#ddlSemesterNameInClassTab').jqxDropDownList('getSelectedItem').value;
	    
    		$('#classMainPanel').empty();
			$('#ddlClassNameInClassTab').jqxDropDownList({selectedIndex: -1});
		    ajaxGetClassBySemesterIdAndTypeIdAndStatus(sid, tid, 'ALL', getAllClassForClassTab);
	    }
    }
}

function getAllClassForClassTab(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get all summary class by smemseter id ... ");
		loadClassTabClassDropDownListDataSource(null);
		setAllClassNameList(null);
		setActiveClassNameList(null);
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get active summary class  list by semester id  ");
		var activeClassName = [];
		var allClassName = [];
		var newDataSource = [];
		for (index in data) {
			allClassName.push({text:data[index].name, value:data[index].id});
			if (data[index].isactive) {
				activeClassName.push({text:data[index].name, value:data[index].id});
			}
		}
		loadClassTabClassDropDownListDataSource(activeClassName);
		setAllClassNameListInClassTab(allClassName);
		setActiveClassNameListInClassTab(activeClassName);
	} else {
		alert('error');
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
	$('#divStartTime').jqxDateTimeInput({ disabled: edit });
	$('#divEndTime').jqxDateTimeInput({ disabled: edit });
	$('#btnSaveClassInformation').jqxButton('disabled', edit);
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

var allClassNameListInClassTab;
function getAllClassNameListInClassTab() {
	return allClassNameListInClassTab;
}
function setAllClassNameListInClassTab(data) {
	allClassNameListInClassTab = data;
}

var activeClassNameListInClassTab;
function getActiveClassNameListInClassTab() {
	return activeClassNameListInClassTab;
}
function setActiveClassNameListInClassTab(data) {
	activeClassNameListInClassTab = data;
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