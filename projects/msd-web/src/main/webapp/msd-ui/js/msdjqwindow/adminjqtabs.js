// UI Creature
function initAdminTab() {
	console.log(" init admin tab ... ");
	var acp = $('#adminControlPanel');
	acp.empty();
	
	var btnholddiv = $('<div style="margin-top:10px; margin-left:5px; border:0px solid;" />');
	acp.append(btnholddiv);
	var bholddiv = $('<div style="margin-top:10px; margin-left:5px; border:0px solid;" />');
	acp.append(bholddiv);
	
	var abutton = $('<input />').attr({type:'button', id:'btnStudentAdmin', value:'Student'});
	btnholddiv.append(abutton);
	$('#btnStudentAdmin').jqxButton({ width: '100', theme: getTheme() });
	
	var cbutton = $('<input style="margin-top:10px;" />').attr({type:'button', id:'btnClassAdmin', value:'Class'});
	btnholddiv.append(cbutton);
	$('#btnClassAdmin').jqxButton({width:'100', theme: getTheme() });

	var dbutton = $('<div id="btnCompetitionAdmin"><div style="border: none;" id="btnCompetitionAdminTree"><ul><li>YAGP</li><li>ShowStopper</li><li>IDC</li><li>ADC/ABC</li></ul></div></div>');
	bholddiv.append(dbutton);
	$('#btnCompetitionAdmin').jqxDropDownButton({width:'100', height:'22', theme: getTheme() });
    $('#btnCompetitionAdminTree').on('select', function (event) {
    	onCompetitionDropDownButtonSelect(event);
    	$('#btnCompetitionAdmin').jqxDropDownButton('close')
    });
    $("#btnCompetitionAdminTree").jqxTree({ width: 150, theme:getTheme() });	
   	$("#btnCompetitionAdmin").jqxDropDownButton('setContent', 'Competition');
	$('#adminMainPanel').empty();

};

function addAdminTabsEventListeners() {
	$(document).on('click', '#btnStudentAdmin', handleStudentAdminClick);
	$(document).on('click', '#btnClassAdmin', handleClassAdminClick);

	$(document).on('keypress', '#ddlStudentAdminClassSearchName', handleStudentAdminClassSearchNameKeypress);
	$(document).on('click', '#btnStudentAdminClearClass', handleStudentAdminClearClassClick);
	$(document).on('click', '#btnStudentAdminSearchClass', handleStudentAdminSearchClassClick);
}
function handleClassAdminClick() {
	console.log(' in Class admin click ... ');
   	$("#btnCompetitionAdmin").jqxDropDownButton('setContent', 'Competition');
	$('#adminMainPanel').empty();
}

function handleCompetitionAdminClick() {
	console.log(' in Competittion admin click ... ');
	$('#adminMainPanel').empty();
	showCompetitionAdminPanel();
}

function handleStudentAdminClick() {
	console.log(' in Sudent admin click ... ');
   	$("#btnCompetitionAdmin").jqxDropDownButton('setContent', 'Competition');

	$('#adminMainPanel').empty();
	
	var sdiv = $('<div id="studentAdminSearchDockPanel" style="height:550;"/>');
	$('#adminMainPanel').append(sdiv);

	var ssdiv = $('<div id="studentAdminClassInputPancel" style="border:0px solid;"/>');
	sdiv.append(ssdiv);
	
	var ddldiv = $('<div dock="left" style="margin-top:10px; border:1px solid  #e0e9f5; height:20px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:10px; border:1px solid  #e0e9f5; height:20px;"/>');
	
	$('#studentAdminClassInputPancel').append(ddldiv)
	$('#studentAdminClassInputPancel').append(btndiv)
	ddldiv.append('<label style="float:left; margin-top: 3px; margin-left:5px">Please select class : </label>');
	var ddlcname = $('<div style="margin-left:5px"/>').attr({id:'ddlStudentAdminClassSearchName'});
	ddldiv.append(ddlcname);
	
	var allsource = {
		datafields:[
			{ name: 'value',   type: 'int'}, 
			{ name: 'text',  type: 'string'}
		],
		datatype:'json',
		localdata:getActiveClassNameList()
	}
	var alldataadapter = new $.jqx.dataAdapter(allsource);
	
	$('#ddlStudentAdminClassSearchName').jqxDropDownList({placeHolder: "Please Select Class Name", height: 20, width: 260, dropDownHeight:150, theme: getTheme(), selectedIndex:-1, source:alldataadapter, displayMember: "text", valueMember: "value"});

	var cbutton = $('<input style="float:right; margin-right:10px; margin-left:0px" />').attr({type:'button', id:'btnStudentAdminClearClass', value:'Clear'});
	btndiv.append(cbutton);
	$('#btnStudentAdminClearClass').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-right:10px;" />').attr({type:'button', id:'btnStudentAdminSearchClass', value:'Search'});
	btndiv.append(sbutton);
	$('#btnStudentAdminSearchClass').jqxButton({ width: '75', height: 20, theme: getTheme() });

	$('#studentAdminClassInputPancel').jqxDockPanel({height: 40});

	var sdiv = $('<div id="studentAdminGridDiv" style="border:0px solid;"/>');
	$('#studentAdminSearchDockPanel').append(sdiv);
}

function handleStudentAdminClassSearchNameKeypress(e) {
	console.log(" in handleStudentAdminClassSearchNameKeypress ...");
	if (e.which == 13)
		$('#btnStudentAdminSearchClass').click();
}

function handleStudentAdminSearchClassClick() {
	console.log(" in handleStudentAdminSearchClassClick ... ");
	$('#studentAdminGridDiv').empty();
	var item = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');

	ajaxGetAllStuentSummaryByClassId(null != item ? item.value : 0, getAllStudentSummaryByClassId);
}

function handleStudentAdminClearClassClick() {
	console.log(" in handlesstudentAdminClearClassClick ... ");
	$('#studentAdminGridDiv').empty();
	$('#ddlStudentAdminClassSearchName').jqxDropDownList('selectIndex', -1 ); 
}

function getAllStudentSummaryByClassId(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get students by class id ... ");
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
	var sagdiv = $('#studentAdminGridDiv');
	sagdiv.empty();

	// Create pop up Register Class window
	var p1div = $('<div/>').attr({id:'popupRegisterClassWindow'});
	sagdiv.append(p1div);
	p1div.append('<div >Register Class</div> <div style="height:130px; width:220px;" id="popupReisterClassPaneldiv"></div>');
    p1div.jqxWindow({
    	width: 350, height:130, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	//Create pop up Check In Widow
	var p2div = $('<div/>').attr({id:'popupCheckinClassWindow'});
	sagdiv.append(p2div);
	p2div.append('<div >Check In Class</div> <div style="height:130px; width:220px;" id="popupCheckinClassPaneldiv"></div>');
    p2div.jqxWindow({
    	width: 370, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	//Create pop up Check in Report window
	var p3div = $('<div/>').attr({id:'popupCheckinReportWindow'});
	sagdiv.append(p3div);
	p3div.append('<div> Check In Report</div> <div style="height:500px; width:600px;" id="popCheckinReportPaneldiv"></div>');
	p3div.jqxWindow({
		width:700, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
	});
	
	//Create pop up All check in Report window
	var p4div = $('<div/>').attr({id:'popupAllCheckinReportWindow'});
	sagdiv.append(p4div);
	p4div.append('<div>All Class Check In Report</div> <div style="height:500px; width:600px;" id="popAllCheckinReportPaneldiv"></div>');
	p4div.jqxWindow({
		width:700, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
	});
	
	//Create pop up Add Student Credit panel
	var p5div = $('<div/>').attr({id:'popupAddStudentCreitWindowInAdminTab'});
	sagdiv.append(p5div);
	p5div.append('<div >Add Student Credit</div> <div id="popupAddStudentCreditDivInAdminTab"></div>');
    p5div.jqxWindow({
    	width: 400, height:200, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
		
	var sgrid = $('<div id="studentAdminGrid"/>');
	sagdiv.append(sgrid);

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
    	toolbarheight: 60,
        source: dataAdapter,
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
     	   var me = this;
        	var container1 = $("<div style='margin: 1px; float: right;'></div>");
        	var container2 = $("<div style='margin: 1px; float: right;'></div>");
	        toolbar.append(container1);
	        toolbar.append(container2);
    	    container1.append('<input id="createEmailAddress" type="button" value="Email Address" />');
        	container1.append('<input style="margin-left: 5px;" id="registerNewClass" type="button" value="Register Class" />');
        	container1.append('<input style="margin-left: 5px;" id="changeRegisterClass" type="button" value="Upgreat Class" />');
        	container1.append('<input style="margin-left: 5px;" id="removeRegisterClass" type="button" value="Remove Class" />');
        	container2.append('<input style="margin-left: 5px;" id="allAttendentReport" type="button" value="Attendent Report(all)" />');
        	container2.append('<input style="margin-left: 5px;" id="classAttendentReport" type="button" value="Attendent Report" />');
        	container2.append('<input style="margin-left: 5px;" id="addStudentCredit" type="button" value="Add Credit" />');
        	container2.append('<input style="margin-left: 5px;" id="studentCheckin" type="button" value="Check In" />');

			var item = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');
			var cid = null!= item ? item.value : 0;
			var cname = null != item ? item.label : "";

	        $("#createEmailAddress").jqxButton({theme: getTheme(), width:150});
			$("#createEmailAddress").jqxTooltip({ theme: getTheme(), content: 'Create Selected Student Email Address', position: 'mouse', name: 'movieTooltip'});

    	    $("#registerNewClass").jqxButton({theme: getTheme(), width:150});
			$("#registerNewClass").jqxTooltip({ theme: getTheme(), content: 'Register Selected Student to a New class', position: 'mouse', name: 'movieTooltip'});

    	    $("#changeRegisterClass").jqxButton({theme: getTheme(), width:150});
			$("#changeRegisterClass").jqxTooltip({ theme: getTheme(), content: 'Remove Selected Student From Class ' + cname + ' and register New class', position: 'mouse', name: 'movieTooltip'});

    	    $("#removeRegisterClass").jqxButton({theme: getTheme(), width:150});
			$("#removeRegisterClass").jqxTooltip({ theme: getTheme(), content: 'Remove Selected Student From Class ' + cname, position: 'mouse', name: 'movieTooltip'});

    	    $("#addStudentCredit").jqxButton({theme:getTheme(), width:150});
			$("#addStudentCredit").jqxTooltip({ theme: getTheme(), content: 'Add Credit for Selected Student from System', position: 'mouse', name: 'movieTooltip'});
    	    
    	    $("#allAttendentReport").jqxButton({theme: getTheme(), width:150});
			$("#allAttendentReport").jqxTooltip({ theme: getTheme(), content: 'Show Selected Student Attendent Report for all Class', position: 'mouse', name: 'movieTooltip'});
    	    
    	    $("#classAttendentReport").jqxButton({theme:getTheme(), width:150});
			$("#classAttendentReport").jqxTooltip({ theme: getTheme(), content: 'Show Selected Student Attendent Report for Class :' + cname, position: 'mouse', name: 'movieTooltip'});

    	    $("#studentCheckin").jqxButton({theme:getTheme(), width:150});
			$("#studentCheckin").jqxTooltip({ theme: getTheme(), content: 'Selected Student Check in to Class', position: 'mouse', name: 'movieTooltip'});

			if ((null == cid || cid == 0)) {
    		    $("#changeRegisterClass").jqxButton({disabled: true });
	    	    $("#classAttendentReport").jqxButton({disabled:true});
	    	    $("#removeRegisterClass").jqxButton({disabled:true});
			}
			
			createPopupRegisterClassWindow();
			createPopupCheckinClassWindow();
			createPopupCheckinReportWindow();
			createPopupAllCheckinReportWindow();
			createPopupAddStudentsCreditWindow();
		    var offset = $("#studentAdminGridDiv").offset();
			$("#popupRegisterClassWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
			$("#popupCheckinClassWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
			$("#popupCheckinReportWindow").jqxWindow({ position: { x: parseInt(offset.left) - 40, y:parseInt(offset.top) - 60} });
			$("#popupAllCheckinReportWindow").jqxWindow({ position: { x: parseInt(offset.left) - 40, y:parseInt(offset.top) - 60} });
			$("#popupAddStudentCreitWindowInAdminTab").jqxWindow({ position: { x: parseInt(offset.left) - 40, y:parseInt(offset.top) - 60} });

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
	        
    	    $("#registerNewClass").on('click', function () {
				console.log("change selected student register class ... ");
				setRegisterFunction("Register");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
				$('#classnamediv').jqxDropDownList({selectedIndex: -1});
                $("#popupRegisterClassWindow").jqxWindow('open');
                
	        });
	        
	        $("#changeRegisterClass").on('click', function() {
				console.log("change selected student register class ... ");
				setRegisterFunction("Upgreate");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
				$('#classnamediv').jqxDropDownList({selectedIndex: -1});
                $("#popupRegisterClassWindow").jqxWindow('open');
                
	        });
	        
	        $('#removeRegisterClass').on('click', function() {
				console.log("Remove  selected student register class ... ");
				var item = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');
				var cid = item.value;

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
                
				var sidList = "";

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[i]);
					if (isNotEmpty(row.id)) 
						sidList += row.id + ",";
                    var id = $("#studentAdminGrid").jqxGrid('getrowid', selectedIndex[1]);
                    var commit = $("#studentAdminGrid").jqxGrid('deleterow', id);				
                } 
                
                $('#studentAdminGrid').jqxGrid('clearselection');

				ajaxregisterClassByStudentIdListAndClassId(cid, sidList, "REMOVE", 0, registerClassByStudentIdListAndClassId);
	        });
	        
	        $("#addStudentCredit").on('click', function() {
				console.log("change selected student register class ... ");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
	        	$("#popupAddStudentCreitWindowInAdminTab").jqxWindow('open');
	        });

	        $("#allAttendentReport").on('click', function() {
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length != 1) {
					alert('Please only select one student from the list ...');
					return;
				}
	        	
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[0]);
				var sid = row.id;

				ajaxGetAllStudentCheckinReportByStudentId(sid, getAllStudentCheckinReportByStudentId);
	        });

	        $("#classAttendentReport").on('click', function() {
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length != 1) {
					alert('Please only select one student from the list ...');
					return;
				}

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[0]);
				var sid = row.id;

				var item = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');
				var cid = item.value;
				
				ajaxGetStudentCheckinReportByStudentIdAndClassId(sid, cid, getStudentCheckinReportByStudentIdAndClassId);
	        });

    	    $("#studentCheckin").on('click', function () {
				console.log("selected student check in  ... ");
				setRegisterFunction("CheckIn");
				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select student from the list ...');
					return;
				}
				var item = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');
				var cid = item.value;
				$('#checkinclassnamediv').jqxDropDownList('val', cid);
				$('#checkinclassnamediv').jqxDropDownList({disabled: true});
				$("#checkindatetimediv").jqxDateTimeInput('setDate', new Date());
                $("#popupCheckinClassWindow").jqxWindow('open');
                
	        });
	        
	        $("#btnCancelCheckinReport").on('click', function () {
	        	console.log(" Cancel checkin report ...");
	        	$('#popupCheckinReportWindow').jqxWindow('hide');
	        });
	        
            $('#btnCancelRegisterClass').on('click', function () {
				console.log(" cancel Register class ...");
				$("#popupRegisterClassWindow").jqxWindow('hide');
            });
				                
            $('#btnRegisterClass').on('click', function () {
				console.log(" Register class ...");
	
				var itema = $("#ddlStudentAdminClassSearchName").jqxDropDownList('getSelectedItem');
				var cid = itema.value;
				var item = $("#classnamediv").jqxDropDownList('getSelectedItem'); 
				if (null == item) {
					alert(" Please select class Name from list ... ");
					return;
				} else {
					if (null != cid && cid == item.value) {
						alert(" Please select different Class to register ... ");
						return;
					}
				}
				
				$("#popupRegisterClassWindow").jqxWindow('hide');

				var sidList = "";

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[i]);
					if (isNotEmpty(row.id)) 
						sidList += row.id + ",";
				} 

				var item = $("#classnamediv").jqxDropDownList('getSelectedItem'); 
				console.log(" class name : " + item.value + " student list : " + sidList);
				if ("Register" == getRegisterFunction()) {
					ajaxregisterClassByStudentIdListAndClassId(item.value, sidList, "REGISTER", 0, registerClassByStudentIdListAndClassId);
				}
				if ("Upgreate" == getRegisterFunction()) {
					ajaxregisterClassByStudentIdListAndClassId(item.value, sidList, "UPGREATE", cid, registerClassByStudentIdListAndClassId);
				}
            });
				                
            $('#btnCancelCheckinClass').on('click', function () {
				console.log(" cancel Checkin class ...");
				$("#popupCheckinClassWindow").jqxWindow('hide');
				
            });
				                
            $('#btnCheckinClass').on('click', function () {
				console.log(" Check in class ...");
	
				var item = $("#checkinclassnamediv").jqxDropDownList('getSelectedItem'); 
				if (null == item) {
					alert(" Please select class Name from list ... ");
					return;
				}
				$("#popupCheckinClassWindow").jqxWindow('hide');

				var sidList = "";

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[i]);
					if (isNotEmpty(row.id)) 
						sidList += row.id + ",";
				} 
				
				var checkintime = $('#checkindatetimediv').jqxDateTimeInput('getDate');

				console.log("call to check ");
				console.log(" class name : " + item.value + " student list : " + sidList);
				
				ajaxCheckinClassByStudentIdListAndClassId(item.value, checkintime, sidList, checkinClassByStudentIdListAndClassId);
            });
				                
	        $("#btnCancelAllCheckinReport").on('click', function () {
	        	console.log(" Cancel checkin report ...");
	        	$('#popupAllCheckinReportWindow').jqxWindow('hide');
	        });
	        
	        $('#btnCancelAddNewStudentCreditInAdminTab').on('click', function () {
	        	console.log(" Cancel create student credit ... ");
	        	$("#popupAddStudentCreitWindowInAdminTab").jqxWindow('hide');
	        });

    	    $('#btnAddNewStudentCreditInAdminTab').on('click', function () {
    	    	var credit = $('#txtNewStudentCreditInAdminTab').val();
    	    	if (null == credit || 0 == credit) {
    	    		alert('Please provide credit value');
    	    		return;
    	    	}    	    		
    	    	var note = $('#txtNewStudentCreditNoteInAdminTab').val()
    	    	if (null == note || note.length == 0) {
    	    		alert('Please provide credit note');
    	    		return;
    	    	}
				$('#popupAddStudentCreitWindowInAdminTab').jqxWindow('hide');

				var sidList = "";

				var selectedIndex = $('#studentAdminGrid').jqxGrid('getselectedrowindexes');
				for(i = 0; i < selectedIndex.length; i++) {
					var row = $('#studentAdminGrid').jqxGrid('getrowdata', selectedIndex[i]);
					if (isNotEmpty(row.id)) 
						sidList += row.id + ",";
				} 
				
				ajaxAddStudentCreditToStudents(sidList, credit, note, addStudentCreditToStudents);    	    	
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

function addStudentCreditToStudents (response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't addStudentCreditToStudents ... ");
		alert(" Can not addStudentCreditToStudents ... ");
	} else if (201 == response.code) {
		console.log(" addStudentCreditToStudents ");
		alert ("Successfully add credit to students ");
	} else {
		alert('error');
	}
	$('#btnStudentAdminSearchClass').click();		
}

function checkinClassByStudentIdListAndClassId (response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't checkinClassByStudentIdListAndClassId ... ");
		alert(" Can not checkinClassByStudentIdListAndClassId ... ");
	} else if (201 == response.code) {
		console.log(" checkinClassByStudentIdListAndClassId ");
		alert ("Successfully check in studnets to class ");
	} else {
		alert('error');
	}
	$('#btnStudentAdminSearchClass').click();		
}

function registerClassByStudentIdListAndClassId(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't registerClassByStudentIdListAndClassId ... ");
		alert(" Can not registerClassByStudentIdListAndClassId ... ");
	} else if (201 == response.code) {
		console.log(" registerClassByStudentIdListAndClassId ");
		alert ("Successfully register/unregister studnets to/from class ");
	} else {
		alert('error');
	}
	$('#btnStudentAdminSearchClass').click();		
}

function createPopupRegisterClassWindow() {
	$('#popupReisterClassPaneldiv').empty();
	
	var tdiv = $('<div style="margin-top:10px; border:0px solid;"/>');
	$('#popupReisterClassPaneldiv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Class Name : </label>');
	var classNamediv = $('<div style="margin-left:5px"/>').attr({id:'classnamediv'});
	tdiv.append(classNamediv);
	
	var activesource = {
		datafields:[
			{ name: 'value',   type: 'int'}, 
			{ name: 'text',  type: 'string'}
		],
		datatype:'json',
		localdata:getActiveClassNameList()
	}
	var activedataadapter = new $.jqx.dataAdapter(activesource);
	
	$('#classnamediv').jqxDropDownList({ placeHolder: "Please Select Class Name: ", dropDownHeight:150, source: getAllClassNameList(), selectedIndex: -1, width: '240', height: '20', theme: getTheme(), displayMember: "text", valueMember: "value"});

	$('#popupReisterClassPaneldiv').append('<br/>');

	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	$('#popupReisterClassPaneldiv').append(tdiv);
	var btnregister = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnRegisterClass', value:'Register'});
	tdiv.append(btnregister);
	$('#btnRegisterClass').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCancelRegisterClass', value:'Cancel'});
	tdiv.append(btncancel);
	$('#btnCancelRegisterClass').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function createPopupCheckinClassWindow() {
	$('#popupCheckinClassPaneldiv').empty();
	
	var tdiv = $('<div style="margin-top:10px; border:0px solid;"/>');
	$('#popupCheckinClassPaneldiv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Class Name : </label>');
	var classNamediv = $('<div style="margin-left:5px"/>').attr({id:'checkinclassnamediv'});
	tdiv.append(classNamediv);
	$('#checkinclassnamediv').jqxDropDownList({ placeHolder: "Please Select Class Name: ", dropDownHeight:150, source: getAllClassNameList(), selectedIndex: -1, width: '260', height: '20', theme: getTheme(), displayMember: "text", valueMember: "value"});

	$('#popupCheckinClassPaneldiv').append('<br/>');
	
	var tdiv = $('<div style="margin-top:10px; border:0px solid;"/>');
	$('#popupCheckinClassPaneldiv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">CheckIn Time : </label>');
	var ctdiv = $('<div />').attr({id:'checkindatetimediv'});
	tdiv.append(ctdiv);
	$("#checkindatetimediv").jqxDateTimeInput({ width: '240px', height: '25px',  formatString: 'ddd, MMMM dd, yyyy HH:mm', theme:getTheme() });
	
	$('#popupCheckinClassPaneldiv').append('<br/>');

	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	$('#popupCheckinClassPaneldiv').append(tdiv);
	var btnCheckin = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCheckinClass', value:'Check In'});
	tdiv.append(btnCheckin);
	$('#btnCheckinClass').jqxButton({ width: '80', height: 20, theme: getTheme() });
	var btncheckinCancel = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCancelCheckinClass', value:'Cancel'});
	tdiv.append(btncheckinCancel);
	$('#btnCancelCheckinClass').jqxButton({ width: '80', height: 20, theme: getTheme() });
}

function createPopupCheckinReportWindow() {
	$('#popCheckinReportPaneldiv').empty();
	
	var tdiv = $('<div style="border:0px solid; height: 400;"/>').attr({id:'popupCheckinReportGrid'});
	$('#popCheckinReportPaneldiv').append(tdiv);
	
	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	$('#popCheckinReportPaneldiv').append(tdiv);
	var btncancel = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCancelCheckinReport', value:'Close'});
	tdiv.append(btncancel);
	$('#btnCancelCheckinReport').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function createPopupAllCheckinReportWindow() {
	$('#popAllCheckinReportPaneldiv').empty();
	
	var tdiv = $('<div style="border:0px solid; height: 400;"/>').attr({id:'popupAllCheckinReportGrid'});
	$('#popAllCheckinReportPaneldiv').append(tdiv);
	
	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	$('#popAllCheckinReportPaneldiv').append(tdiv);
	var btncancel = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnCancelAllCheckinReport', value:'Close'});
	tdiv.append(btncancel);
	$('#btnCancelAllCheckinReport').jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function getStudentCheckinReportByStudentIdAndClassId(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't getStudentCheckinReportByStudentIdAndClassId ... ");
		alert(" Can not getStudentCheckinReportByStudentIdAndClassId ... ");
	} else if (302 == response.code) {
		console.log(" getStudentCheckinReportByStudentIdAndClassId ");
		var data = $.parseJSON(response.result);
		showStudentCheckInReport(data);
	} else {
		alert('error');
	}
}

function showStudentCheckInReport(data) {
   	$('#popupCheckinReportWindow').jqxWindow('open');
   	
	var sgrid = $('<div id="studentCheckinReportGrid"/>');
	$('#popupCheckinReportGrid').append(sgrid);

	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}
			,{ name: 'className',  type: 'string'}
			,{ name: 'checkInTime', type: 'date'}
			,{ name: 'registerClass', type: 'bool'}
			,{ name: 'other', type: 'bool'}
			,{ name: 'makeup', type: 'bool'}
			,{ name: 'fiveHoursMoreStduent', type: 'bool'}
			,{ name: 'note',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);

	$('#studentCheckinReportGrid').jqxGrid({
		theme: getTheme(),
    	width: 680,
    	height:450,
        source: dataAdapter,
    	altrows: true,
		pageable: true,
    	pagesize: 15,
		pagesizeoptions: ['15'],
	    columns: [
			{text: 'ID', datafield:'id', hidden:'true'}
        	,{ text: 'Class Name', datafield: 'className', hidden:'true' }
        	,{ text: 'Checkin Time', datafield: 'checkInTime', width: 210, align: 'right', cellsalign: 'right', cellsformat: 'dddd HH:mm MM/dd/yyyy' }
        	,{ text: 'Registered', datafield: 'registerClass', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
    	    ,{ text: 'Make up', datafield: 'makeup', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
    	    ,{ text: '5+ hours', datafield: 'fiveHoursMoreStduent', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
	        ,{ text: 'Other', datafield: 'other', columntype: 'checkbox', width: 50, cellsalign: 'center', align: 'center' }
    	    ,{ text: 'Note', datafield: 'note'}
	    ],
	});	
   	
}

function getAllStudentCheckinReportByStudentId(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't getAllStudentCheckinReportByStudentId ... ");
		alert(" Can not getAllStudentCheckinReportByStudentId ... ");
	} else if (302 == response.code) {
		console.log(" getAllStudentCheckinReportByStudentId ");
		var data = $.parseJSON(response.result);
		showAllStudentCheckInReport(data);
	} else {
		alert('error');
	}
}

function showAllStudentCheckInReport(data) {
	$('#popupAllCheckinReportWindow').jqxWindow('open');
	
	var sgrid = $('<div id="studentAllCheckinReportDataTable"/>');
	$('#popupAllCheckinReportGrid').append(sgrid);

	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}
			,{ name: 'className',  type: 'string'}
			,{ name: 'checkInTime', type: 'date'}
			,{ name: 'registerClass', type: 'bool'}
			,{ name: 'other', type: 'bool'}
			,{ name: 'makeup', type: 'bool'}
			,{ name: 'fiveHoursMoreStduent', type: 'bool'}
			,{ name: 'note',  type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);

	$('#studentAllCheckinReportDataTable').jqxGrid({
		theme: getTheme(),
    	width: 680,
    	height:450,
        source: dataAdapter,
    	altrows: true,
		groupable:true,
	    columns: [
			{text: 'ID', datafield:'id', hidden:'true'}
        	,{ text: 'Class Name', datafield: 'className', hidden:'true' }
        	,{ text: 'Checkin Time', datafield: 'checkInTime', width: 210, align: 'right', cellsalign: 'right', cellsformat: 'dddd HH:mm MM/dd/yyyy' }
        	,{ text: 'Registered', datafield: 'registerClass', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
    	    ,{ text: 'Make up', datafield: 'makeup', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
    	    ,{ text: '5+ hours', datafield: 'fiveHoursMoreStduent', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
	        ,{ text: 'Other', datafield: 'other', columntype: 'checkbox', width: 50, cellsalign: 'center', align: 'center' }
    	    ,{ text: 'Note', datafield: 'note'}
	    ],
	    groups:['className']
	});	
   	
}

function createPopupAddStudentsCreditWindow() {
	var psfdiv = $('#popupAddStudentCreditDivInAdminTab');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">New Credit:</label>');
	var cost = $('<div/>').attr({id:'txtNewStudentCreditInAdminTab'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '260px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var fnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text', id:'txtNewStudentCreditNoteInAdminTab'});
	psfdiv.append(fnote);
	fnote.jqxInput({placeHolder: "Enter Credit Note", height: 20, width:390, minLength:1, theme:getTheme() });

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddNewStudentCreditInAdminTab', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddNewStudentCreditInAdminTab', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });
}

var registerFunction;
function setRegisterFunction(value) {
	registerFunction=value;
}
function getRegisterFunction() {
	return registerFunction;
}
