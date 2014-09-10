// UI Creature
function initAdminTab() {
	console.log(" init admin tab ... ");

	$('#adminControlPanel').empty();

	var abutton = $('<input style="float:left; margin-top:10px; margin-left:5px;" />').attr({type:'button', id:'btnStudentAdmin', value:'Student'});
	$('#adminControlPanel').append(abutton);
	$('#btnStudentAdmin').jqxButton({ width: '100', theme: getTheme() });
	
	var cbutton = $('<input style="float:left; margin-top:10px; margin-left:5px;" />').attr({type:'button', id:'btnClassAdmin', value:'Class'});
	$('#adminControlPanel').append(cbutton);
	$('#btnClassAdmin').jqxButton({width:'100', theme: getTheme() });

	$('#adminMainPanel').empty();

};

function addAdminTabsEventListeners() {
	$(document).on('click', '#btnStudentAdmin', handleStudentAdminClick);

	$(document).on('keypress', '#txtStudentAdminClassSearchName', handleStudentAdminClassSearchNameKeypress);
	$(document).on('click', '#btnStudentAdminClearClass', handleStudetnAdminClearClassClick);
	$(document).on('click', '#btnStudentAdminSearchClass', handleStudentAdminSearchClassClick);
	$(document).on('click', '#btnStudentAdminClearClass', handlesstudentAdminClearClassClick);
}

function handleStudentAdminClick() {
	console.log(' in Sudent admin click ... ');
	$('#adminMainPanel').empty();
	
	var sdiv = $('<div id="studentAdminSearchDockPanel" style="height:550;"/>');
	$('#adminMainPanel').append(sdiv);

	var ssdiv = $('<div id="studentAdminClassInputPancel" style="height:50px; border:0px solid;"/>');
	sdiv.append(ssdiv);

	$('#studentAdminClassInputPancel').append('<label style="margin-top:10px; margin-left:5px">Please select class : </label>');
	var cname = $('<input style="margin-top:10px; margin-left:5px"/>').attr({type:'text', id:'txtStudentAdminClassSearchName'});
	$('#studentAdminClassInputPancel').append(cname);
	$('#txtStudentAdminClassSearchName').jqxInput({placeHolder: "Class Name", height: 20, width: 300, minLength: 1, theme: getTheme(), source:getAllClassNameList() });

	var cbutton = $('<input style="float:right;margin-top:11px; margin-left:0px" />').attr({type:'button', id:'btnStudentAdminClearClass', value:'Clear'});
	$('#studentAdminClassInputPancel').append(cbutton);
	$('#btnStudentAdminClearClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-top:11px;" />').attr({type:'button', id:'btnStudentAdminSearchClass', value:'Search'});
	$('#studentAdminClassInputPancel').append(sbutton);
	$('#btnStudentAdminSearchClass').jqxButton({ width: '75', height: 20, theme: getTheme() });

	var sdiv = $('<div id="studentAdminGridDiv" style="border:0px solid;"/>');
	$('#studentAdminSearchDockPanel').append(sdiv);
}


function handleStudentAdminClassSearchNameKeypress(e) {
	console.log(" in handleStudentAdminClassSearchNameKeypress ...");
	if (e.which == 13)
		$('#btnStudentAdminSearchClass').click();
}

function handleStudetnAdminClearClassClick() {
	console.log (" in handleStudetnAdminClearClassClick ... ");
}

function handleStudentAdminSearchClassClick() {
	console.log(" in handleStudentAdminSearchClassClick ... ");
	$('#studentAdminGridDiv').empty();
	var cname = $.trim($('#txtStudentAdminClassSearchName').val());

	if ((null == cname || cname.length == 0)) {
	    cname='All';
	}
	ajaxGetAllStuentSummaryByClassName(cname, getAllStudentSummaryByClassName);
}

function handlesstudentAdminClearClassClick() {
	console.log(" in handlesstudentAdminClearClassClick ... ");
	$('#studentAdminGridDiv').empty();
	$('#txtStudentAdminClassSearchName').val('');
}

function getAllStudentSummaryByClassName(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get students by class name ... ");
		alert(" There is no student register in this class ... ");
	} else if (302 == response.code) {
		console.log(" get students by class name");
		var data = $.parseJSON(response.result);
		showSelectedStudents(data);
	} else {
		alert('error');
	}
}

function showSelectedStudents(data) {
	$('#studentAdminGridDiv').empty();
	
	var sgrid = $('<div id="studentAdminGrid"/>');
	$('#studentAdminGridDiv').append(sgrid);

	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'firstName',  type: 'string'},
			{ name: 'lastName', type: 'string'},
			{ name: 'emailAddress', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$("#studentAdminGrid").jqxGrid({
		theme: getTheme(),
    	width: 640,
    	height:500,
        source: dataAdapter,
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
     	   var me = this;
        	var container = $("<div style='margin: 5px;'></div>");
	        toolbar.append(container);
    	    container.append('<input id="createEmailAddress" type="button" value="Email Address" />');
        	container.append('<input style="margin-left: 5px;" id="changeRegisterClass" type="button" value="Register Class" />');
        	container.append('<input style="margin-left: 5px;" id="deactivateStudent" type="button" value="deActivate Student" />');
	        $("#createEmailAddress").jqxButton({theme: getTheme()});
    	    $("#changeRegisterClass").jqxButton({theme: getTheme()});
    	    $("#deactivateStudent").jqxButton({theme:getTheme()});
        	$("#createEmailAddress").on('click', function () {
				console.log("create selected student email address list ... ");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
				var text = "";
				
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[i]);
					if (isNotEmpty(row.emailAddress)) 
						text += row.emailAddress + ";";
				} 
				window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
	        });
    	    $("#changeRegisterClass").on('click', function () {
				console.log("change selected student register class ... ");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
	        });
	        $("#deactivateStudent").on('click', function() {
				console.log("change selected student register class ... ");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
	        	
	        });
		},
	    selectionmode: 'checkbox',
    	altrows: true,
        pageable:true,
    	pagesize: 15,
    	pagesizeoptions:['10', '15', '20'],
	    columns: [
			{text: 'ID', datafield:'id', hidden:'true'},
        	{ text: 'First Name', datafield: 'firstName', width: 180 },
	        { text: 'Last Name', datafield: 'lastName', width: 180 },
    	    { text: 'Email Address', datafield: 'emailAddress'}
	    ]
    });
}