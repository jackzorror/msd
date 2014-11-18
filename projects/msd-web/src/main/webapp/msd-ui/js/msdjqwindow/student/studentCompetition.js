function showStudentCompetitionInfo() {
	console.log(" In Show Student Competition Information ... ");

	$('#studentMainPanel').empty();
	showStudentRegisterCompetition();
	showStudentNonRegisterCompetition();
}

function showStudentRegisterCompetition() {
	// student register competition information
	var cdiv = $('<div class="accord" style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentCompetitionDetailDiv'});
	var ctdiv = $('<div class="title">Student Register Competition Information </div>').attr({id:'studentCompetitionDetailTitleDiv'});
	var ccdiv = $('<div class="content" style="background:#e0e9f5;"></div>').attr({id:'studentCompetitionDetailContentDiv'});
	
	$('#studentMainPanel').append(cdiv);
	$('#studentCompetitionDetailDiv').append(ctdiv);
	$('#studentCompetitionDetailDiv').append(ccdiv);
	
	$('#studentCompetitionDetailDiv').raaccordion();
	createStudentRegisterCompeitionPanel();	
	var sid = getCurrentStudent().id;
	ajaxGetStudentRegisterCompeition(sid, getStudentRegisterCompetition);
}

function showStudentNonRegisterCompetition() {
	// student non register class information
	var cdiv = $('<div class="accord" style="margin-left:10px;margin-right:10px;margin-top:10px;" />').attr({id:'studentNonCompetitionDetailDiv'});
	var ctdiv = $('<div class="title">Student Non Register Competition Information </div>').attr({id:'studentNonCompeitionDetailTitleDiv'});
	var ccdiv = $('<div class="content" style="background:#e0e9f5;"></div>').attr({id:'studentNonCompetitionDetailContentDiv'});
	
	$('#studentMainPanel').append(cdiv);
	$('#studentNonCompetitionDetailDiv').append(ctdiv);
	$('#studentNonCompetitionDetailDiv').append(ccdiv);
	
	$('#studentNonCompetitionDetailDiv').raaccordion();
	createStudentNonRegisterCompetitionPanel();	
	var sid = getCurrentStudent().id;
	ajaxGetStudentNonRegisterCompetition(sid, getStudentNonRegisterCompetition);
}

function createStudentRegisterCompeitionPanel() {
	$('#studentCompetitionDetailContentDiv').empty();
	
	var cdiv = $('<div style="width:600px;"></div>').attr({id:'registeredCompetitionDiv'});
	$('#studentCompetitionDetailContentDiv').append(cdiv);
}

function createStudentNonRegisterCompetitionPanel() {
	$('#studentNonCompetitionDetailContentDiv').empty();
	
	var cdiv = $('<div style="width:600px;"></div>').attr({id:'nonRegisteredCompetitionDiv'});
	$('#studentNonCompetitionDetailContentDiv').append(cdiv);
}

function getStudentRegisterCompetition(response, request, settings){
	console.log(" get student register competition ... ");
	if (404 == response.code) {
		console.log(" There is no register competition for this student ... ");
		$('#compeitionInformation').empty();
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showRegisterCompetitionInformationByGrid(data);
	} else {
		alert("error to find register competition ... ");
	}
}

function getStudentNonRegisterCompetition(response, request, settings){
	console.log(" get student non register competition ... ");
	if (404 == response.code) {
		console.log(" There is no non register competition for this student ... ");
		$('#compeitionInformation').empty();
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showNonRegisterCompetitionInformationByGrid(data);
	} else {
		alert("error to find non register competition ... ");
	}
}

function showRegisterCompetitionInformationByGrid(data) {
	$('#registeredCompetitionDiv').empty();
	var srcdiv = $('<div style="border:0px solid;"/>').attr({id:'studentRegisteredCompetitionGrid'});	
	$('#registeredCompetitionDiv').append(srcdiv);
	
	if (null == data || data.length < 1)
		return;

	var source = {
		datafields:[
			{ name: 'id', type:'int'},
			{ name: 'competitiondate', type: 'string'},
			{ name: 'name', type: 'string'},
			{ name: 'isactive', type: 'bool'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$('#studentRegisteredCompetitionGrid').jqxGrid(
	{
		theme: getTheme(),
		source:dataAdapter,
		height: 350,
		pageable: true,
		pagesizeoptions: ['10'],
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins: 0px;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px;" id="removeRegisteredCompetition" type="button" value="Remove" />');
	        $("#removeRegisteredCompetition").jqxButton({theme: getTheme()});
        	$("#removeRegisteredCompetition").on('click', function () {
				console.log("Remove registered competition ... ");
				var selectedIndex = $('#studentRegisteredCompetitionGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select competition from the list ...');
					return;
				}
				var cidlist = "";
					
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentRegisteredCompetitionGrid').jqxGrid('getrowdata', selectedIndex[i]);
					var id = row.id;
					cidlist += id + ",";
				} 
				var sid = getCurrentStudent().id;
				ajaxDeleteStudentRegisteredCompetitions(sid, cidlist, deleteStudentRegisteredCompetitions);
					
    	    });
		},
		selectionmode: 'checkbox',
		columns:[
			{text: 'Competition ID', datafield:'id', hidden:'true'},
			{text: 'Competition Name', datafield:'name', width:150},
			{text: 'Competition Date', datafield:'competitiondate', width:360},
			{text: 'Is Active', datafield:'isactive', hidden:'true'},
			{text: '', datafield: 'Detail', width:60, columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentRegisteredCompetitionGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetCompetitionDetailById(id, getCompetitionDetailByIdInStudentTab);
				}
			}
		]
	});
}

function showNonRegisterCompetitionInformationByGrid(data) {
	$('#nonRegisteredCompetitionDiv').empty();
	var srcdiv = $('<div style="border:0px solid;"/>').attr({id:'studentNonRegisteredCompetitionGrid'});	
	$('#nonRegisteredCompetitionDiv').append(srcdiv);
	
	if (null == data || data.length < 1)
		return;

	var source = {
		datafields:[
			{ name: 'id', type:'int'},
			{ name: 'competitiondate', type: 'string'},
			{ name: 'name', type: 'string'},
			{ name: 'isactive', type: 'bool'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$('#studentNonRegisteredCompetitionGrid').jqxGrid(
	{
		theme: getTheme(),
		source:dataAdapter,
		height: 350,
		pageable: true,
		pagesizeoptions: ['10'],
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins: 0px;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px;" id="addRegisteredCompetition" type="button" value="Register" />');
	        $("#addRegisteredCompetition").jqxButton({theme: getTheme()});
        	$("#addRegisteredCompetition").on('click', function () {
				console.log("Add registered competition ... ");
				var selectedIndex = $('#studentNonRegisteredCompetitionGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select competition from the list ...');
					return;
				}
				var cidlist = "";
					
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentNonRegisteredCompetitionGrid').jqxGrid('getrowdata', selectedIndex[i]);
					var id = row.id;
					cidlist += id + ",";
				} 
				var sid = getCurrentStudent().id;
				ajaxAddStudentRegisteredCompetitions(sid, cidlist, addStudentRegisteredCompetitions);
					
    	    });
		},
		selectionmode: 'checkbox',
		columns:[
			{text: 'Competition ID', datafield:'id', hidden:'true'},
			{text: 'Competition Name', datafield:'name', width:150},
			{text: 'Competition Date', datafield:'competitiondate', width:360},
			{text: 'Is Active', datafield:'isactive', hidden:'true'},
			{text: '', datafield: 'Detail', width:60, columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentNonRegisteredCompetitionGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetCompetitionDetailById(id, getCompetitionDetailByIdInStudentTab);
				}
			}
		]
	});
}

function deleteStudentRegisteredCompetitions (response, request, settings) {
	console.log(" un register competition ... ");
	if (404 == response.code) {
		alert(" Can't un registered competition ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		$('#studentMainPanel').empty();
		showStudentRegisterCompetition();
		showStudentNonRegisterCompetition();
	} else {
		alert("error to delete student registered competition ... ");
	}
}

function addStudentRegisteredCompetitions (response, request, settings) {
	console.log(" register competition ... ");
	if (404 == response.code) {
		alert(" Can't registered competition ... ");
	} else if (201 == response.code) {
		var data = $.parseJSON(response.result);
		$('#studentMainPanel').empty();
		showStudentRegisterCompetition();
		showStudentNonRegisterCompetition();
	} else {
		alert("error to student registered competition ... ");
	}
}

function getCompetitionDetailByIdInStudentTab (response, request, settings) {
	console.log(" getCompetitionDetailByIdInStudentTab ... ");
	if (404 == response.code) {
		alert(" Can't get Competition detail in student tab ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showCompetitionDetail(data);
	} else {
		alert("error to get competition detail in student tab ... ");
	}	
}

function showCompetitionDetail(data) {
	console.log(" this will pop up window to show detail about competition ");
	
	if (0 == $('#msdcopmetitiondetailpopupdiv').length) {
	    $('#studentMainPanel').append('<div id="msdcopmetitiondetailpopupdiv" />');

		$('#msdcopmetitiondetailpopupdiv').append('<div >Competition Detail Information</div> <div id="studentcompetitiondetaildiv"></div>');
		$('#msdcopmetitiondetailpopupdiv').jqxWindow({showCollapseButton: false, draggable:false,  resizable: false, height: 500, width: 500, theme: theme, position: { x: 350, y: 150}});
	
		var cdiv = $('<div style = "width:480px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'studentcompetitionInformationdiv'});
		$('#studentcompetitiondetaildiv').append(cdiv);
	}
	
	if (false == $('#msdcopmetitiondetailpopupdiv').jqxWindow('isOpen')) {
		$('#msdcopmetitiondetailpopupdiv').jqxWindow('open');
	}

	createCompetitionDetailDiv();
	
	bindingDataToCompetitionDetailDiv(data);

	showCompetitionDetailFee(data.competitionFeeList);
}

function createCompetitionDetailDiv() {
	$('#studentcompetitionInformationdiv').empty();

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:5px; border:0px solid; height:140px;"/>').attr({id:'competitionCommondivInStudentTab'});
	$('#studentcompetitionInformationdiv').append(ccdiv);
	
	var ccdivfee = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'competitionFeeInformationdiv'});
	$('#studentcompetitionInformationdiv').append(ccdivfee);	

	ccdiv.empty();
	ccdivfee.empty();
	
	var tmpdiv = $('<div class="InnerDiv" style="margin-top:0px; border:0px solid;"/>');
	ccdiv.append(tmpdiv);

	tmpdiv.append('<label style="margin-top:8px;margin-left:15px">Name : </label>');
	var cname = $('<input style="margin-top:5px;margin-left:1px;"/>').attr({type:'text', id:'txtCompetitionNameInStudentTab'});
	tmpdiv.append(cname);
	cname.jqxInput({placeHolder: "Competition Name", disabled: true, height: 20, width:370, minLength: 1, theme: getTheme() });	
	
	tmpdiv.append('<br/>');
	
	tmpdiv.append('<label style="margin-left:0px;margin-top:8px">Location : </label>');
	var location = $('<input style="margin-top:5px;margin-left=5px;"/>').attr({type:'text', id:'txtCompetitionLocationInStudentTab'});
	tmpdiv.append(location);
	location.jqxInput({placeHolder: "Competition Location", disabled: true, height: 20, width:370, minLength: 1, theme: getTheme(), source:ClassLocation });

	var tempdiv = $('<div class="InnerDiv" style="float:left; margin-top:0px; border:0px solid;"/>')
	ccdiv.append(tempdiv);

	tempdiv.append('<label style="float:left; margin-top:8px;"> Competition Date : </label>');
	var stime = $('<input style="float:left; margin-top:5px; margin-left:5px;"/>').attr({type:'text', id:'txtCompetitionStartInStudentTab'});
	tempdiv.append(stime);
	stime.jqxInput({placeHolder: "Start date", disabled: true, height: 20, width:150, minLength: 1, theme: getTheme() });	

	tempdiv.append('<label style="float:left; margin-top:8px; margin-left:3px;"> To </label>');
	var stime = $('<input style="float:left; margin-top:5px; margin-left:5px;"/>').attr({type:'text', id:'txtCompetitionEndInStudentTab'});
	tempdiv.append(stime);
	stime.jqxInput({placeHolder: "End date", disabled: true, height: 20, width:150, minLength: 1, theme: getTheme() });	

	tmpdiv.append('<br/>');

	tempdiv.append('<label style="float:left; margin-top:8px; margin-left:0px;"> Register Deadline : </label>');
	var etime = $('<input style="float:left; margin-top:5px; margin-left:5px;" />').attr({type:'text', id:'txtCompetitionRegisterDeadTimeInStudentTab'});
	tempdiv.append(etime);
	etime.jqxInput({placeHolder: "Register deadline", disabled: true, height: 20, width:150, minLength: 1, theme: getTheme() });	

	tempdiv.append('<label style="float:left; margin-top:8px; margin-left:7px;">Type: </label>');
	var ctname = $('<input style="float:left; margin-top:5px; margin-left:5px"/>').attr({type:'text', id:'txtCompetitionTypeNameInStudentTab'});
	tempdiv.append(ctname);
	ctname.jqxInput({placeHolder: "Competition Type", disabled: true, height: 20, width:125, minLength: 1, theme: getTheme() });	

	var tdiv = $('<div class="InnerDiv" style="float:left; margin-top:0px; border:0px solid;"/>')
	ccdiv.append(tdiv);

	tdiv.append('<label style="float:left; margin-top:8px;margin-left:0px;">Total Student : </label>');
	var totalStudent = $('<input style="float:left; margin-top:5px;margin-left:5px;"/>').attr({type:'text', id:'txtTotalCompetitionStudentInStudentTab'});
	tdiv.append(totalStudent);
	totalStudent.jqxInput({rtl: true, disabled:true, height: 20, width:30, minLength: 1, theme: getTheme() });	
	
	tdiv.append('<label style="float:left; margin-left:10px;margin-top:8px">Total Fee : </label>');
	var totalFee = $('<input style="float:left; margin-top:5px;margin-left:5px;"/>').attr({type:'text', id:'txtTotalCompetitionFeeInStudentTab'});
	tdiv.append(totalFee);
	totalFee.jqxInput({rtl: true, disabled:true, height: 20, width:60, minLength: 1, theme: getTheme() });

	var statusLabel = $('<label id="labelCompetitionStatusInStudentTab" style="float:left; margin-top:8px; margin-left:15px;">N/A</label>');
	tdiv.append(statusLabel);

}

function bindingDataToCompetitionDetailDiv(data) {
	$('#txtCompetitionNameInStudentTab').jqxInput('val', null != data ? data.name : "");
	$('#txtCompetitionLocationInStudentTab').jqxInput('val', null != data ? data.location : "");
	$('#txtCompetitionStartInStudentTab').jqxInput('val', getFormattedDateToMMDDYYYY(data.startDate));
	$('#txtCompetitionEndInStudentTab').jqxInput('val', getFormattedDateToMMDDYYYY(data.endDate));
	$('#txtCompetitionRegisterDeadTimeInStudentTab').jqxInput('val', getFormattedDateToMMDDYYYY(data.registerDeadline));
	$('#txtCompetitionTypeNameInStudentTab').jqxInput('val', getCompetitionTypeName(data.competitionTypeId));
	$('#txtTotalCompetitionStudentInStudentTab').jqxInput('val', (null != data && null != data.totalStudent) ? data.totalStudent : "0");
	$('#txtTotalCompetitionFeeInStudentTab').jqxInput('val', (null != data && null != data.totalFee ) ? '$ ' + data.totalFee : "$0");

	showCompetitionStatusLabelInStudentTab(data);
}

function showCompetitionStatusLabelInStudentTab(data) {
	var lcs = $('#labelCompetitionStatusInStudentTab');
	if (null != data && null != data.competitionStatus) {
		if ("ACCEPTREGISTER" == data.competitionStatus) {
			lcs.text(data.competitionStatus);
			lcs.css("color", "green");
		} else if ("PASSEDREGISTERDEADLINE" == data.competitionStatus || "COMPETITION" == data.competitionStatus) {
			lcs.text(data.competitionStatus);
			lcs.css("color", "blue");
		} else {
			lcs.text(data.competitionStatus);
			lcs.css("color", "red");
		}
	} else {
		lcs.text("NA");
		lcs.css("color", "grey");
	}
}

function getCompetitionTypeName(id) {
	if (null == id) return "";
	
	var ctypes = getAllCompetitionType();
	
	for (var i in ctypes)  {
		if (id == ctypes[i].id)
			return ctypes[i].name;
	}
}


function showCompetitionDetailFee(data) {
	console.log(" in show class fee information .. ");

	var cfidiv = $('#competitionFeeInformationdiv');
	cfidiv.empty();
	cfidiv.append('<label style="margin-top:10px;"> Competition Fee ... </label>');
	var csdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'competitionFeeDetailGridInStudentTab'});	
	cfidiv.append(csdiv);
	
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'msdCompetitionId', 	type: 'int'},
			{ name: 'feeName',  type: 'string'},
			{ name: 'feeTypeName', 	type: 'string'},
			{ name: 'cost', type: 'number'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	csdiv.jqxGrid(
	{
		source:dataAdapter,
		width: 400,
	    autoheight:true,
		theme: getTheme(),
    	columns: [
			{text: 'Class ID', datafield:'msdCompetition', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'feeName', width: 180},
			{text: 'Type', datafield: 'feeTypeName', width:120},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
		]
	});
}
