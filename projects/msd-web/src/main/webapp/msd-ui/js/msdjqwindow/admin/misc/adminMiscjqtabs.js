function showMiscAdminPanel() {
	console.log(' in Misc admin Panel ... ');
	$('#adminMainPanel').empty();
	
	var mdiv = $('<div id="miscAdminMainPanel" style="height:550;"/>');
	$('#adminMainPanel').append(mdiv);

	var btndiv = $('<div style="margin-top:10px; border:1px solid  #e0e9f5; height:20px;"/>');
	mdiv.append(btndiv);

	var sbutton = $('<input style="margin-left:20px" />').attr({type:'button', id:'btnSemester', value:'Semester'});
	btndiv.append(sbutton);
	sbutton.jqxButton({ width: '100', height: 20, theme: getTheme() });

	var sbutton = $('<input style="margin-left:20px" />').attr({type:'button', id:'btnMSDType', value:'Type'});
	btndiv.append(sbutton);
	sbutton.jqxButton({ width: '100', height: 20, theme: getTheme() });

	var optiondiv = $('<div id="miscAdminOperationDiv" style="margin-top:0px; border:1px solid  #e0e9f5; "/>');
	mdiv.append(optiondiv);
	
	addMiscAdminEventListeners();
}

function addMiscAdminEventListeners() {
	$(document).on('click', '#btnSemester', handleSemesterClick);
	$(document).on('click', '#btnMSDType', handleMSDTypeClick);
}

function handleSemesterClick() {
	console.log(' In handle Semester Click ... ');
	showSemesterGrid(getSemesterList());
}

function showSemesterGrid(data) {
	var faodiv = $('#miscAdminOperationDiv');
	faodiv.empty();

	// Create pop up add general fee panel
	var pdiv = $('<div/>').attr({id:'popupAddSemesterWindow'});
	faodiv.append(pdiv);
	pdiv.append('<div >Add New Semester</div> <div id="popupAddSemesterDiv"></div>');
    pdiv.jqxWindow({
    	width: 250, height:180, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var gfdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'semesterGridDiv'});	
	faodiv.append(gfdiv);
	
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name',  type: 'string'},
			{ name: 'startDate', 	type: 'date'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	gfdiv.jqxGrid(
	{
		theme: getTheme(),
		width: 560,
	    source: dataAdapter,
        selectionmode:'checkbox',
		autoheight: true,
    	showToolbar: true,
    	pageable:false,
		editable: true,
        editmode: 'click',    	
	    altrows: true,
    	ready: function(){},
    	renderToolbar: function(toolBar){
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolBar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="addNewSemesterbtn" type="button" value="New" />');

		    var offset = gfdiv.offset();
			$("#popupAddSemesterWindow").jqxWindow({ position: { x: parseInt(offset.left), y: parseInt(offset.top) - 80 } });
			createAddSemesterPopupWindow();

        	var addBtn = $("#addNewSemesterbtn");
	        addBtn.jqxButton({theme: getTheme(), width:60, disabled:false});

	        gfdiv.on('rowselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
	        });
		        
	        gfdiv.on('rowunselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
	        });
		        
            addBtn.click(function (event) {
				$("#popupAddSemesterWindow").jqxWindow('open');
            });

            $('#btnCancelAddSemester').on('click', function () {
				console.log(" cancel add Fee ...");
				$("#popupAddSemesterWindow").jqxWindow('hide');
            });
            
            $('#btnAddSemester').on('click', function () {
	            var name = $('#txtSemesterName').val();
                var startdate = $('#txtSemesterStartDate').jqxDateTimeInput('value');

                if (null == name || name.length < 1) {
                   	alert("please provide one name ");
                } else if (null == startdate) {
                  	alert("please provide select start date ");
                }  else {
					$("#popupAddSemesterWindow").jqxWindow('hide');

					var semester = {"id":0, "semesterName":name, "startDate":startdate};
					ajaxAddSemester(semester, addSemester);
                }
            });
  	    },
    	columns: [
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'name', editable: true},
			{text: 'Start Date', datafield: 'startDate', width:300, editable: false}
		]
	});
}

function createAddSemesterPopupWindow() {
	var psfdiv = $('#popupAddSemesterDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtSemesterName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Semester Name", height: 20, width: 180, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Start Date :</label>');
	var startdate = $('<div/>').attr({id:'txtSemesterStartDate'});
	tdiv.append(startdate);
	startdate.jqxDateTimeInput({ width: '180px', height: '20px', theme: getTheme()});

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddSemester', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddSemester', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function addSemester(response, request, settings){
	console.log(" return from add semester ... ");
	if (404 == response.code) {
		console.log(" Error to add semester ... ");
	} else if (302 == response.code) {
		console.log("successfully add semester ... ");
		ajaxGetSemesterList(getAllSemesterListinAdminMisc);
	} else {
		alert("error to add general fee ... ");
	}
}
/*
function updateSemester(response, request, settings){
	console.log(" return from update semester ... ");
	if (404 == response.code) {
		console.log(" Error to update semester ... ");
	} else if (302 == response.code) {
		console.log("successfully update semester ... ");
		ajaxGetSemesterList(getAllSemesterListinAdminMisc);
	} else {
		alert("error to update semester ... ");
	}
}
*/
function getAllSemesterListinAdminMisc(response, request, settings){
	console.log(" get semester after update semseter... ");
	if (404 == response.code) {
		console.log(" Can't get semester after update semester ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all semseter list after update semseter ");
		setSemesterList(data);
	} else {
		alert('error');
	}
	showSemesterGrid(getSemesterList());
}

function handleMSDTypeClick() {
	console.log(' In handle MSD Type click ... ');
	showMSDTypeGrid(getAllType());
}

function showMSDTypeGrid(data) {
	var faodiv = $('#miscAdminOperationDiv');
	faodiv.empty();

	// Create pop up add general fee panel
	var pdiv = $('<div/>').attr({id:'popupAddMSDTypeWindow'});
	faodiv.append(pdiv);
	pdiv.append('<div >Add New Type</div> <div id="popupAddMSDTypeDiv"></div>');
    pdiv.jqxWindow({
    	width: 250, height:180, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var tgdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'typeGridDiv'});	
	faodiv.append(tgdiv);
	
	var source = {
		datafields:[
			{ name: 'id', type: 'int'}, 
			{ name: 'name', type: 'string'},
			{ name: 'type', type: 'string'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	tgdiv.jqxGrid(
	{
		theme: getTheme(),
		width: 560,
	    source: dataAdapter,
        selectionmode:'checkbox',
		autoheight: true,
    	showToolbar: true,
    	pageable:false,
		editable: true,
        editmode: 'click',    	
	    altrows: true,
    	ready: function(){},
    	renderToolbar: function(toolBar){
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolBar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="addNewMSDTypebtn" type="button" value="New" />');

		    var offset = tgdiv.offset();
			$("#popupAddMSDTypeWindow").jqxWindow({ position: { x: parseInt(offset.left), y: parseInt(offset.top) - 80 } });
			createAddMSDTypePopupWindow();

        	var addBtn = $("#addNewMSDTypebtn");
	        addBtn.jqxButton({theme: getTheme(), width:60, disabled:false});

	        tgdiv.on('rowselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
	        });
		        
	        tgdiv.on('rowunselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
	        });
		        
            addBtn.click(function (event) {
				$("#popupAddMSDTypeWindow").jqxWindow('open');
            });

            $('#btnCancelAddSemester').on('click', function () {
				console.log(" cancel add Fee ...");
				$("#popupAddMSDTypeWindow").jqxWindow('hide');
            });
            
            $('#btnAddMSDType').on('click', function () {
	            var name = $('#txtMSDTypeName').val();
                var type = $('#txtMSDTypeType').val();

                if (null == name || name.length < 1) {
                   	alert("please provide one name ");
                } else if (null == type) {
                  	alert("please provide type ");
                }  else {
					$("#popupAddMSDTypeWindow").jqxWindow('hide');

					var dto = {"id":0, "typeName":name, "typeString":type};
					ajaxAddMSDType(dto, AddMSDType);
                }
            });
  	    },
    	columns: [
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'name', editable: false},
			{text: 'Type', datafield: 'type', width:200, editable: false}
		]
	});
}

function createAddMSDTypePopupWindow() {
	var psfdiv = $('#popupAddMSDTypeDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtMSDTypeName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Type Name", height: 20, width: 180, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Type :</label>');
	var typename = $('<input/>').attr({type:'text',id:'txtMSDTypeType'});
	tdiv.append(typename);
	typename.jqxInput({placeHolder: "Enter Type ",  width: '180px', height: '20px', theme: getTheme()});

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddMSDType', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddMSDType', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });

}

function AddMSDType(response, request, settings) {
	console.log(" return from add type ... ");
	if (404 == response.code) {
		console.log(" Error to add type ... ");
	} else if (302 == response.code) {
		console.log("successfully add type ... ");
		ajaxGetAllMSDTypes(getAllMSDTypeListinAdminMisc);
	} else {
		alert("error to add general fee ... ");
	}

}

function getAllMSDTypeListinAdminMisc(response, request, settings){
	getAllMSDTypes(response);
	showMSDTypeGrid(getAllType());
}
