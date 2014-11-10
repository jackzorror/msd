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
	getStudentNonRegisterCompetition(getCurrentStudent());
}

function createStudentRegisterCompeitionPanel() {
	$('#studentCompetitionDetailContentDiv').empty();
	
	var cdiv = $('<div style="width:600px;"></div>').attr({id:'registeredCompetitionDiv'});
	$('#studentCompetitionDetailContentDiv').append(cdiv);
}

function createStudentNonRegisterCompetitionPanel() {
	$('#studentNonCompetitionDetailContentDiv').empty();
	
	var cdiv = $('<div style="width:600px;"></div>').attr({id:'nonRegisteredCompettionDiv'});
	$('#studentNonCompetitionDetailContentDiv').append(cdiv);
}

function getStudentRegisterCompetition(response, request, settings){ {
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

function showRegisterCompetitionInformationByGrid(data) {
	$('#registeredCompetitionDiv').empty();
	var srcdiv = $('<div style="border:0px solid;"/>').attr({id:'studentRegisteredCompetitionGrid'});	
	$('#registeredCompetitionDiv').append(srcdiv);
	
	if (null == data || data.length < 1)
		return;

	var source = {
		datafields:[
			{ name: 'id', type:'int'},
			{ name: 'competitionDate', type: 'string'},
			{ name: 'location', type: 'string'},
			{ name: 'name', type: 'string'}
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
					var row = $('#studentRegisteredCompeitionGrid').jqxGrid('getrowdata', selectedIndex[i]);
					var id = row.id;
					cidlist += id + ",";
				} 
				var sid = getCurrentStudent().id;
				ajaxDeleteStudentRegisteredCompeitions(sid, cidlist, deleteStudentRegisteredCompetitions);
					
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
		showStudentRegisterCompeition();
		showStudentNonRegisterCompeition();
	} else {
		alert("error to delete student registered competition ... ");
	}
}

getCompetitionDetailByIdInStudentTab (response, request, settings) {
}
