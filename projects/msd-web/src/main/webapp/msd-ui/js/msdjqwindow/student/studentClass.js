function showStudentRegisteredClassesInfo() {
	console.log(" In Show Student Registered Classes Information ... ");
	var smp = $('#studentMainPanel');
	
	smp.empty();

	var srctdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid; height:40px;"/>').attr({id:'studentRegisteredClassesInfoDiv'});
	smp.append(srctdiv);
	
	var srcdiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentRegisteredClassInfoDiv'});
	smp.append(srcdiv);
	
	var surcdiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentUnRegisteredClassInfoDiv'});
	smp.append(surcdiv);
	
	showStudentRegisteredClassesTitlePanel();
	showStudentRegisteredClassesInformationPanel(getCurrentSemester().id);
	showStudentUnRegisteredClassesInformationPanel(getCurrentSemester().id);
}

function showStudentRegisteredClassesTitlePanel() {
	console.log(" show student Registered classes title panel ");
	var sfbdiv = $('#studentRegisteredClassesInfoDiv');
	sfbdiv.empty();

	var scpdiv = $('<div style="border:0px solid;"/>').attr({id:'studentRegisteredClassesInfoDockPanel'});
	sfbdiv.append(scpdiv);

	var ddldiv = $('<div dock="left" style="margin-top:5px; border:0px solid  #ccc; height:20px; width:200px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:5px; border:0px solid  #ccc; height:20px;"/>');
	scpdiv.append(ddldiv);
	scpdiv.append(btndiv);
	
	ddldiv.append('<label style="float:left; margin-top:5px; margin-left:5px">Semester : </label>');
	var sname = $('<div style="margin-top:2px; margin-left:5px"/>').attr({id:'ddlSemesterSearchNameForStudentClass'});
	ddldiv.append(sname);
	sname.jqxDropDownList({placeHolder: "Select Semester", height: 20, width: 120, dropDownHeight: 100, theme: getTheme()});

	var data = getSemesterList();
	var activesource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	sname.jqxDropDownList({source:activedataadapter, displayMember: "name", valueMember: "id"});
	var sid = getCurrentSemester().id;
	sname.jqxDropDownList('selectItem',sid);
	
	$(document).on('change', '#ddlSemesterSearchNameForStudentClass', handleSemesterSearchNameDropdownForStudentClassChange);

	scpdiv.jqxDockPanel({height: 40});
}

function handleSemesterSearchNameDropdownForStudentClassChange(event) {
    var args = event.args;
    if (args) {
	    var item = args.item;

    	var label = item.label;
	    var value = item.value;
	    
	    setCurrentSemesterForStudentClassId(value);
		showStudentRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
		showStudentUnRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
    }
}

function showStudentRegisteredClassesInformationPanel(semesterid) {
	console.log(" show student registered class panel ");
	var sfidiv = $('#studentRegisteredClassInfoDiv');
	sfidiv.empty();

	var ctdiv = $('<div style="height:30px;" />').attr({id:'studentRegisteredClassesInformationTitleDiv'});
	ctdiv.append('<label style="float:left; margin-top:10px; margin-right:5px;"><b>Student Registered Classes </b></label>');
	
	var ccdiv = $('<div style="background:#e0e9f5;"/>').attr({id:'studentRegisteredClassesInformationContentDiv'});
	sfidiv.append(ctdiv);
	sfidiv.append(ccdiv);

	ajaxGetStudentRegisteredClassesByStudentIdSemesterId(getCurrentStudent().id, semesterid, getStudentRegisteredClassesByStudentIdSemesterId);
}

function getStudentRegisteredClassesByStudentIdSemesterId(response, request, settings){
	console.log(" get student registered classes ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no registered classes for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
	} else {
		alert("error to find student registered classes ... ");
	}
	showStudentRegisteredClassesGridDiv(data);
}

function showStudentRegisteredClassesGridDiv(data) {
	var srcicdiv = $('#studentRegisteredClassesInformationContentDiv');
	srcicdiv.empty();
	
	var srcdiv = $('<div style="border:0px solid;"/>').attr({id:'studentRegisteredClassGrid'});	
	srcicdiv.append(srcdiv);
	
	var source = {
		datafields:[
			{ name: 'id', type:'int'},
			{ name: 'schedule', type: 'string'},
			{ name: 'name', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	srcdiv.jqxGrid({
		theme: getTheme(),
		source:dataAdapter,
		pageable: false,
		autoHeight: true,
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins: 0px;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px;" id="removeRegisteredClass" type="button" value="Remove" />');
	        $("#removeRegisteredClass").jqxButton({theme: getTheme()});
	        $('#removeRegisteredClass').jqxButton({disabled:true});
		        
	        srcdiv.on('rowselect', function (event) {
				var selectedIndex = srcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $('#removeRegisteredClass').jqxButton({disabled:true});
				} else {
			        $('#removeRegisteredClass').jqxButton({disabled:false});
				}
		        	
	        });
		        
	        srcdiv.on('rowunselect', function (event) {
				var selectedIndex = srcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $('#removeRegisteredClass').jqxButton({disabled:true});
				} else {
			        $('#removeRegisteredClass').jqxButton({disabled:false});
				}
		        	
	        });
		        
        	$("#removeRegisteredClass").on('click', function () {
				console.log("Remove registered class ... ");
				var selectedIndex = srcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select class from the list ...');
					return;
				}
				var cidlist = "";
					
				for(i = 0; i < selectedIndex.length; i++) {
					var row = srcdiv.jqxGrid('getrowdata', selectedIndex[i]);
					var id = row.id;
					cidlist += id + ",";
				} 
				var sid = getCurrentStudent().id;
				ajaxDeleteStudentRegisteredClasses(sid, cidlist, deleteStudentRegisteredClasses);
					
    	    });
		},
		selectionmode: 'checkbox',
		columns:[
			{text: 'Class ID', datafield:'id', hidden:'true'},
			{text: 'Class Name', datafield:'name', width:150},
			{text: 'Class Scheduler', datafield:'schedule', width:360},
			{text: '', datafield: 'Detail', width:60, columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentRegisteredClassGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetClassDetailById(id, getClassDetailByIdInStudentTab);
				}
			}
		]
	});
}

function deleteStudentRegisteredClasses (response, request, settings) {
	console.log(" remove registered class from student student ... ");
	if (404 == response.code) {
		alert(" Can't delete registered class ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
	} else {
		alert("error to delete student registered class ... ");
	}

	showStudentRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
	showStudentUnRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
}

function showStudentUnRegisteredClassesInformationPanel(semesterid) {
	console.log(" show student Un registered class panel ");
	var sfidiv = $('#studentUnRegisteredClassInfoDiv');
	sfidiv.empty();

	var ctdiv = $('<div style="height:30px;" />').attr({id:'studentUnRegisteredClassesInformationTitleDiv'});
	ctdiv.append('<label style="float:left; margin-top:10px; margin-right:5px;"><b>Student Un Registered Classes </b></label>');
	
	var ccdiv = $('<div style="background:#e0e9f5;"/>').attr({id:'studentUnRegisteredClassesInformationContentDiv'});
	sfidiv.append(ctdiv);
	sfidiv.append(ccdiv);

	ajaxGetStudentUnRegisteredClassesByStudentIdSemesterId(getCurrentStudent().id, semesterid, getStudentUnRegisteredClassesByStudentIdSemesterId);
}

function getStudentUnRegisteredClassesByStudentIdSemesterId(response, request, settings){
	console.log(" get student Un registered classes ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no Un registered classes for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
	} else {
		alert("error to find student un registered classes ... ");
	}
	showStudentUnRegisteredClassesGridDiv(data);
}

function showStudentUnRegisteredClassesGridDiv(data) {
	var surcicdiv = $('#studentUnRegisteredClassesInformationContentDiv');
	surcicdiv.empty();
	var nrcdiv = $('<div style="border:0px solid;"/>').attr({id:'studentNonRegisteredClassGrid'});
	surcicdiv.append(nrcdiv);

	var source = {
		datafields:[
			{ name: 'id', type:'int'},
			{ name: 'schedule', type: 'string'},
			{ name: 'name', type: 'string'},
			{ name: 'classTypeName', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	nrcdiv.jqxGrid({
		theme: getTheme(),
		source:dataAdapter,
		autoHeight: true,
		pageable: false,
		groupable: true,
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins: 0px;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px;" id="addNonRegisteredClass" type="button" value="Register" />');
	        $("#addNonRegisteredClass").jqxButton({theme: getTheme()});
	        $('#addNonRegisteredClass').jqxButton({disabled:true});
		        
	        nrcdiv.on('rowselect', function (event) {
				var selectedIndex = nrcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $('#addNonRegisteredClass').jqxButton({disabled:true});
				} else {
			        $('#addNonRegisteredClass').jqxButton({disabled:false});
				}
		        	
	        });
		        
	        nrcdiv.on('rowunselect', function (event) {
				var selectedIndex = nrcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $('#addNonRegisteredClass').jqxButton({disabled:true});
				} else {
			        $('#addNonRegisteredClass').jqxButton({disabled:false});
				}
		        	
	        });
		        
        	$("#addNonRegisteredClass").on('click', function () {
				console.log("Add Non registered class ... ");
				var selectedIndex = nrcdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select class from the list ...');
					return;
				}
				var cidlist = "";
					
				for(i = 0; i < selectedIndex.length; i++) {
					var row = nrcdiv.jqxGrid('getrowdata', selectedIndex[i]);
					var id = row.id;
					cidlist += id + ","
				} 
				sid = getCurrentStudent().id;
				ajaxStudentRegisterClasses(sid, cidlist, studentRegisterClasses);
    	    });
		},
		selectionmode: 'checkbox',
		groups: ['classTypeName'],
		showgroupsheader: false,
		columns:[
			{text: 'Class ID', datafield:'id', hidden:'true'},
			{test: 'Type', datafield:'classTypeName', hidden:'true'},
			{text: 'Class Name', datafield:'name', width:150},
			{text: 'Class Scheduler', datafield:'schedule'},
			{text: '', datafield: 'Detail', width:60, columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentNonRegisteredClassGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetClassDetailById(id, getClassDetailByIdInStudentTab);
				}
			}
		]
	});
}

function studentRegisterClasses (response, request, settings) {
	console.log(" get student ... ");
	if (404 == response.code) {
		alert(" Can't register class ... ");
	} else if (201 == response.code) {
		var data = $.parseJSON(response.result);
		$('#studentMainPanel').empty();
	} else {
		alert("error to register student ... ");
	}

	showStudentRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
	showStudentUnRegisteredClassesInformationPanel(getCurrentSemesterForStudentClassId());
}


function getClassDetailByIdInStudentTab(response, request, settings){
	console.log(" get class ... ");
	if (404 == response.code) {
		alert(" Can't get class ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showClassDetail(data);
	} else {
		alert("error to get class ... ");
	}
}

function showClassDetail(data) {
	console.log(" this will pop up window to show detail about class ");
	
	if (0 == $('#msdclassdetailpopupdiv').length) {
	    $('#studentMainPanel').append('<div id="msdclassdetailpopupdiv" />');

		$('#msdclassdetailpopupdiv').append('<div >Class Detail Information</div> <div id="studentclassdetaildiv"></div>');
		$('#msdclassdetailpopupdiv').jqxWindow({showCollapseButton: false, isModal: true, resizable: false, height: 500, width: 500, theme: theme, position: { x: 250, y: 150}});
	
		var cdiv = $('<div style = "width:480px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'studentclassInformationdiv'});
		$('#studentclassdetaildiv').append(cdiv);
	
		var odiv = $('<div style = "width:480px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'classOtherInformationdiv'});
		$('#studentclassdetaildiv').append(odiv);
	
		var sdiv = $('<div style = "width:480px; margin-top: 10px; margin-left:10px; border:0px solid;"/>').attr({id:'studentClassSchedularInformationdiv'});
		$('#studentclassdetaildiv').append(sdiv);

		var fdiv = $('<div style = "width:480px; margin-top: 10px; margin-left:10px; border:0px solid;"/>').attr({id:'studentClassFeeInformationdiv'});
		$('#studentclassdetaildiv').append(fdiv);
	}
	
	if (false == $('#msdclassdetailpopupdiv').jqxWindow('isOpen')) {
		$('#msdclassdetailpopupdiv').jqxWindow('open');
	}

	createClassDetailDiv();

	$('#txtStudentClassName').jqxInput({disabled:true });
	$('#txtStudentClassName').jqxInput('val', data.name);
	
	
	$('#txtStudentClassLocation').jqxInput({disabled:true });
	$('#txtStudentClassLocation').jqxInput('val', data.location);
	
	if (null != data.classStartTime) {
		$('#txtStudentClassStartTime').jqxInput('val', getFormattedDateToMMDDYYYY(data.classStartTime));
	}
	$('#txtStudentClassStartTime').jqxInput({ disabled: true });
	
	if (null != data.classEndTime) {
		$('#txtStudentClassEndTime').jqxInput('val', getFormattedDateToMMDDYYYY(data.classEndTime));
	}
	$('#txtStudentClassEndTime').jqxInput({ disabled: true });

	if (null != data.classStatus) {
		if ("ACTIVE" == data.classStatus) {
			$('#txtStudentClassStatus').text(data.classStatus);
			$('#txtStudentClassStatus').css("color", "green");
		} else if ("INACTIVE" == data.classStatus) {
			$('#txtStudentClassStatus').text(data.classStatus);
			$('#txtStudentClassStatus').css("color", "blue");
		} else {
			$('#txtStudentClassStatus').text(data.classStatus);
			$('#txtStudentClassStatus').css("color", "red");
		}
	}
	
	$('#txtTotalStudentInStudentTab').jqxInput({disabled:true });
	if (null != data && null != data.totalNumberStudent)
		$('#txtTotalStudentInStudentTab').jqxInput('val', data.totalNumberStudent);
	else 
		$('#txtTotalStudentInStudentTab').jqxInput('val', "0");
	
	$('#txtClassFeeInStudentTab').jqxInput({disabled:true });
	if (null != data && null != data.totalClassFee)
		$('#txtClassFeeInStudentTab').jqxInput('val', '$ ' + data.totalClassFee);
	else 
		$('#txtClassFeeInStudentTab').jqxInput('val', '$ 0');

	$('#txtTotalClassTimeInStudentTab').jqxInput({disabled:true});
	if (null != data && null != data.totalClassCount)
		$('#txtTotalClassTimeInStudentTab').jqxInput('val', data.totalClassCount);
	else
		$('#txtTotalClassTimeInStudentTab').jqxInput('val', "0");
		
	showClassDetailSchedular(data.classSchedularList);
	showClassDetailFee(data.classFeeList);

}

function createClassDetailDiv() {
	$('#studentclassInformationdiv').empty();
	
	$('#studentclassInformationdiv').append('<label> Class Name : </label>');
	var cname = $('<input/>').attr({type:'text', id:'txtStudentClassName'});
	$('#studentclassInformationdiv').append(cname);
	$('#txtStudentClassName').jqxInput({placeHolder: "Class Name", height: 20, width:100, minLength: 1, theme: getTheme() });	
	
	$('#studentclassInformationdiv').append('<label style="margin-left:10px;">Location : </label>');
	var location = $('<input/>').attr({type:'text', id:'txtStudentClassLocation'});
	$('#studentclassInformationdiv').append(location);
	$('#txtStudentClassLocation').jqxInput({placeHolder: "Class Location", height: 20, width:200, minLength: 1, theme: getTheme() });
	$('#studentclassInformationdiv').append('<br/>');
	
	$('#studentclassInformationdiv').append('<label style="margin-top:10px;"> Start : </label>');
	var stime = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtStudentClassStartTime'});
	$('#studentclassInformationdiv').append(stime);
	$('#txtStudentClassStartTime').jqxInput({placeHolder: "Start date", width: 90, height: 20, minLength: 1, theme: getTheme() });

	$('#studentclassInformationdiv').append('<label style="margin-top:10px; margin-left:10px;"> End : </label>');
	var etime = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtStudentClassEndTime'});
	$('#studentclassInformationdiv').append(etime);
	$('#txtStudentClassEndTime').jqxInput({placeHolder:"End date", width: 90, height: 20, minLength: 1, theme: getTheme() });
	
	$('#studentclassInformationdiv').append('<label> Total Class : </label>');
	var ctotalclasstime = $('<input/>').attr({type:'text', id:'txtTotalClassTimeInStudentTab'});
	$('#studentclassInformationdiv').append(ctotalclasstime);
	$('#txtTotalClassTimeInStudentTab').jqxInput({placeHolder: "Total Class Time", rtl: true, height: 20, width:40, minLength: 1, theme: getTheme() });	

	$('#classOtherInformationdiv').empty();

	$('#classOtherInformationdiv').append('<label> Total Student : </label>');
	var ctotalstudent = $('<input/>').attr({type:'text', id:'txtTotalStudentInStudentTab'});
	$('#classOtherInformationdiv').append(ctotalstudent);
	$('#txtTotalStudentInStudentTab').jqxInput({placeHolder: "Total Student", rtl: true, height: 20, width:40, minLength: 1, theme: getTheme() });	
	
	$('#classOtherInformationdiv').append('<label> Total Class Fee : </label>');
	var cClassFee = $('<input/>').attr({type:'text', id:'txtClassFeeInStudentTab'});
	$('#classOtherInformationdiv').append(cClassFee);
	$('#txtClassFeeInStudentTab').jqxInput({placeHolder: "$0", rtl: true, height: 20, width:100, minLength: 1, theme: getTheme() });	
	
	var statusLabel = $('<label id="txtStudentClassStatus" name="txtStudentClassStatus" style="margin-top:10px; margin-left:20px;" />');
	$('#classOtherInformationdiv').append(statusLabel);

}

function showClassDetailSchedular(data) {
	console.log(" in show class schedular information .. ");
	$('#studentClassSchedularInformationdiv').empty();
	$('#studentClassSchedularInformationdiv').append('<label style="margin-top:10px;"> Class Schedular ... </label>');
	var csdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:45px;"/>').attr({id:'classSchedularDetailGrid'});	
	$('#studentClassSchedularInformationdiv').append(csdiv);
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
	$('#classSchedularDetailGrid').jqxGrid(
	{
		source:dataAdapter,
		width: 350,
	    autoheight:true,
		theme: getTheme(),
		columns:[
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Weekday', datafield: 'weekdayStr', width: 100, align:'center', cellsalign:'center'},
			{text: 'Start Time', datafield: 'startTime', width:100, align:'right', cellsalign:'right'},
			{text: 'End Time', datafield: 'endTime', width:100, align:'right', cellsalign:'right'}
		]
	});
	
}

function showClassDetailFee(data) {
	console.log(" in show class fee information .. ");
	$('#studentClassFeeInformationdiv').empty();
	$('#studentClassFeeInformationdiv').append('<label style="margin-top:10px;"> Class Fee ... </label>');
	var csdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'classFeeDetailGrid'});	
	$('#studentClassFeeInformationdiv').append(csdiv);
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
	$('#classFeeDetailGrid').jqxGrid(
	{
		source:dataAdapter,
		width: 400,
	    autoheight:true,
		theme: getTheme(),
		columns:[
			{text: 'Class ID', datafield:'msdClassId', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'feeName', width: 180},
			{text: 'Type', datafield: 'feeTypeName', width:120},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
		]
	});
	
}

var currentSemesterForStudentClassId;
function setCurrentSemesterForStudentClassId(data) {
	currentSemesterForStudentClassId = data;
}
function getCurrentSemesterForStudentClassId() {
	return currentSemesterForStudentClassId;
}


