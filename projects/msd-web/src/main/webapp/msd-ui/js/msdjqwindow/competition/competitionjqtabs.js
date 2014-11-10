// UI Creature
function initCompetitionTab() {
	console.log(" init competition tab ... ");

	$('#competitionControlPanel').empty();

	var scpdiv = $('<div style="border:0px solid;"/>').attr({id:'competitionControldiv'});
	$('#competitionControlPanel').append(scpdiv);

	var ddldiv = $('<div dock="left" style="margin-top:10px; border:0px solid  #ccc; height:20px; width:500px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:10px; border:0px solid  #ccc; height:20px;"/>');
	scpdiv.append(ddldiv);
	scpdiv.append(btndiv);
	
	ddldiv.append('<label style="float:left; margin-top:8px; margin-left:20px">Please Select name : </label>');
	var cname = $('<div style="margin-top:5px; margin-left:20px"/>').attr({id:'ddlCompetitionSearchName'});
	ddldiv.append(cname);
	$('#ddlCompetitionSearchName').jqxDropDownList({placeHolder: "Please Select Competition Name", height: 20, width: 300, dropDownHeight: 150, theme: getTheme()});

	var abutton = $('<input style="float:right;margin-top:5px; margin-left:3px; margin-right:10px" />').attr({type:'button', id:'btnAddCompetition', value:'Add'});
	btndiv.append(abutton);
	$('#btnAddCompetition').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var cbutton = $('<input style="float:right;margin-top:5px; margin-left:3px" />').attr({type:'button', id:'btnClearCompetition', value:'Clear'});
	btndiv.append(cbutton);
	$('#btnClearCompetition').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	var sbutton = $('<input style="float:right; margin-top:5px;" />').attr({type:'button', id:'btnSearchCompetition', value:'Search'});
	btndiv.append(sbutton);
	$('#btnSearchCompetition').jqxButton({ width: '75', height: 20, theme: getTheme() });
	
	$('#competitionControldiv').jqxDockPanel({height: 40});

	$('competitionMainPanel').empty();

};

function competitionTabLoadddlCompetitionSearchNameDataSource() {
	$('#ddlCompetitionSearchName').jqxDropDownList({source: getActiveCompetitionNameList(), selectedIndex: -1, displayMember: "text", valueMember: "value"});
}

function addCompetitionTabsEventListeners() {

	$(document).on('click', '#btnSearchCompetition', handleSearchCompetitionClick);
	$(document).on('keypress', '#ddlCompetitionSearchName', handleCompetitionSearchNameKeypress);
	$(document).on('click', '#btnClearCompetition', handleClearCompetitionClick);
	$(document).on('click', '#btnAddCompetition', handleAddCompetitionClick);
	
	$(document).on('click', '#btnEditCompetitionInformation', handleEditCompetitionClick);
	$(document).on('click', '#btnSaveCompetitionInformation', handleSaveCompetitionClick);
}

// Event handle
function handleSearchCompetitionClick() {
	console.log(" in handle search ... ");

	var item = $('#ddlCompetitionSearchName').jqxDropDownList('getSelectedItem');

	if (null == item) {
	    alert("Please select competition name from list ... ");
	} else {
		console.log (" call ajax to get competition ... ");
		var cid = item.value;
		if (null == cid || cid == 0) 
			alert("Please select competition from list ... ");
		else 
			ajaxGetCompetitionDetailById(cid, getCompetitionDetailById);
	}

	setCurrentFunctionInCompetitionTab("SEARCH");
};

function handleCompetitionSearchNameKeypress(e) {
	if (e.which == 13)
		$('#btnSearchCompetition').click();
}

function handleClearCompetitionClick() {
	$('#competitionMainPanel').empty();
	$('#ddlCompetitionSearchName').jqxDropDownList({selectedIndex:-1});
}

function handleEditCompetitionClick() {
	if ("SEARCH" == getCurrentFunctionInCompetitionTab()) {
		if ("Edit" == $('#btnEditCompetitionInformation').val()) {
			$('#competitionCommondiv :text').prop("disabled", false);
			$('#txtCompetitionName').focus();
			$('#btnEditCompetitionInformation').val("Cancel");
			$('#btnSaveCompetitionInformation').jqxButton('disabled', false);
			$('#divCompetitionTime').jqxDateTimeInput({ disabled: false });
			$('#divCompetitionRegisterDeadTime').jqxDateTimeInput({ disabled: false });
			$('#ddlCompetitionTypeName').jqxDropDownList({ disabled: false }); 
		} else if ("Cancel" == $('#btnEditCompetitionInformation').val()) {
			console.log (" cancel edit competition information ... ");
			cancelUpdateCompetitionInformation();
			
			$('#classCommondiv :text').prop("disabled", true);
			$('#divCompetitionTime').jqxDateTimeInput({ disabled: true });
			$('#divCompetitionRegisterDeadTime').jqxDateTimeInput({ disabled: true });
			$('#btnEditCompetitionInformation').val("Edit");
			$('#btnSaveCompetitionInformation').jqxButton('disabled', true);
			$('#ddlCompetitionTypeName').jqxDropDownList({ disabled: true }); 
		}
	} else if ("ADD" == getCurrentFunctionInCompetitionTab()) {
		$('#btnClearCompetition').click();
	}
};

function handleSaveCompetitionClick() {
	var id = (null != getCurrentCompetitionInCompetitionTab() ? getCurrentCompetitionInCompetitionTab().id : null);
	var isActive = (null != getCurrentCompetitionInCompetitionTab() ? getCurrentCompetitionInCompetitionTab().isActive : true);
	var cname = $('#txtCompetitionName').val();
	var clocation  = $('#txtCompetitionLocation').val();
	var range = $("#divCompetitionTime").jqxDateTimeInput('getRange');
	var sdate = range.from;
	var edate = range.to;
	var deadline = $('#divCompetitionRegisterDeadTime').jqxDateTimeInput('getDate');
	var type = $('#ddlCompetitionTypeName').jqxDropDownList('getSelectedItem').value;
	console.log(" new competition : " + cname + " -> " + clocation + " time : " + sdate  + " ~ " + edate + "deadline : " + deadline);
	
	var competition = {"id":id, "description":"","location":clocation, "endDate":edate, "startDate":sdate, "isActive":isActive,"name":cname,"registerDeadline":deadline,"competitionTypeId":type};
	
	ajaxSaveCompetitionInformation(competition, saveCompeitionInformation);
}

function handleAddCompetitionClick() {
	console.log(" in handle add ... ");
	
	setCurrentFunctionInCompetitionTab("ADD");
	showCompetitionInformation(null);
	setCurrentCompetitionInCompetitionTab(null);

	$('#ddlCompetitionSearchName').jqxDropDownList({selectedIndex: -1});
	$('#competitionCommondiv :text').prop("disabled", false);
	$('#txtCompetitionName').focus();
	$('#btnEditCompetitionInformation').val("Cancel");
	$('#btnSaveCompetitionInformation').jqxButton('disabled', false);
	$('#divCompetitionTime').jqxDateTimeInput({ disabled: false });
	$('#divCompetitionRegisterDeadTime').jqxDateTimeInput({ disabled: false });
	$('#ddlCompetitionTypeName').jqxDropDownList({ disabled:false, selectedIndex: -1 });

}

function saveCompeitionInformation(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't save competition  ... ");
	} else if (302 == response.code) {
		console.log(" save competition ...");
		var data = $.parseJSON(response.result);
		showCompetitionInformation(data);
		setCurrentCompetitionInCompetitionTab(data);
	} else {
		alert('error');
	}
}

function getCompetitionDetailById(response, request, settings) {
	if (404 == response.code) {
		console.log(" Can't get competition detail by competition name ... ");
	} else if (302 == response.code) {
		console.log(" get competition detail by competition name");
		var data = $.parseJSON(response.result);
		showCompetitionInformation(data);
		setCurrentCompetitionInCompetitionTab(data);
	} else {
		alert('error');
	}
}

function showCompetitionInformation(data) {

	createCompetitionInformationDiv();

	bindCompetitionCommonData(data);

	if (null != data) {
		ajaxGetCompetitionFeeByCompetitionId(data.id, getCompetitionFeeByComptitionId);
	}
}

function createCompetitionInformationDiv() {

	$('#competitionMainPanel').empty();

	var ccdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:5px; margin-top:10px; border:0px solid; height:150px;"/>').attr({id:'competitionCommondiv'});
	$('#competitionMainPanel').append(ccdiv);
	
	var ccdiv = $('<div class="InnerDiv" style = "margin-top: 10px; margin-left:5px; margin-right:5px; border:0px solid;"/>').attr({id:'competitionFeeInformationdiv'});
	$('#competitionMainPanel').append(ccdiv);	

	$('#competitionCommondiv').empty();
	$('#competitionFeeInformationdiv').empty();
	
	$('#competitionCommondiv').append('<br/>');

	var tmpdiv = $('<div class="InnerDiv" style = "margin-top:0px; border:0px solid;"/>');
	$('#competitionCommondiv').append(tmpdiv);

	var ldiv = $('<div dock="left" style="border:0px solid; width:500px;"/>');
	var btndiv = $('<div dock="right" style="border:0px solid;"/>');
	tmpdiv.append(ldiv);
	tmpdiv.append(btndiv);
	
	ldiv.append('<label style="margin-top:5; margin-left:0px;"><b>Competition Information ... </b></label>');

	var savebtn = $('<input style="float:right; margin-top:3px;margin-right:5px"/>').attr({type:'button', id:'btnSaveCompetitionInformation', value:'Save' });
	btndiv.append(savebtn);
	$('#btnSaveCompetitionInformation').jqxButton({ width: 60, height: 20, theme: getTheme() });

	var editbtn = $('<input style="float:right; margin-top:3px; margin-right:10px;"/>').attr({type:'button', id:'btnEditCompetitionInformation', value:'Edit' });
	btndiv.append(editbtn);
	$('#btnEditCompetitionInformation').jqxButton({ width: 60, height: 20, theme: getTheme() });

	tmpdiv.jqxDockPanel({height: 25});

	$('#competitionCommondiv').append('<br/>');

	var tmpdiv = $('<div class="InnerDiv" style="margin-top:5px; border:0px solid;"/>');
	$('#competitionCommondiv').append(tmpdiv);

	tmpdiv.append('<label style="margin-top:0px;">Name : </label>');
	var cname = $('<input style="margin-top:0px;margin-left:5px;"/>').attr({type:'text', id:'txtCompetitionName'});
	tmpdiv.append(cname);
	$('#txtCompetitionName').jqxInput({placeHolder: "Competition Name", height: 20, width:150, minLength: 1, theme: getTheme() });	
	
	tmpdiv.append('<label style="margin-left:10px;margin-top:0px">Location : </label>');
	var location = $('<input style="margin-top:0px;margin-left=5px;"/>').attr({type:'text', id:'txtCompetitionLocation'});
	tmpdiv.append(location);
	$('#txtCompetitionLocation').jqxInput({placeHolder: "Competition Location", height: 20, width:400, minLength: 1, theme: getTheme(), source:ClassLocation });

	var tempdiv = $('<div class="InnerDiv" style="float:left; margin-top:10px; border:0px solid;"/>')
	$('#competitionCommondiv').append(tempdiv);

	tempdiv.append('<label style="float:left; margin-top:3px;"> Competition Date : </label>');
	var stime = $('<div style="float:left; margin-top:0px; margin-left:5px;"/>').attr({id:'divCompetitionTime'});
	tempdiv.append(stime);
	$('#divCompetitionTime').jqxDateTimeInput({width: '200px', height: '20px', theme: getTheme(), selectionMode: 'range', formatString: 'd'});

	tempdiv.append('<label style="float:left; margin-top:3px; margin-left:20px;"> Register Deadline: </label>');
	var etime = $('<div style="float:left; margin-top:0px; margin-left:5px;" />').attr({id:'divCompetitionRegisterDeadTime'});
	tempdiv.append(etime);
	$('#divCompetitionRegisterDeadTime').jqxDateTimeInput({width: '150px', height: '20px', formatString: 'd', theme: getTheme()});

	var tdiv = $('<div class="InnerDiv" style="float:left; margin-top:10px; border:0px solid;"/>')
	$('#competitionCommondiv').append(tdiv);

	tdiv.append('<label style="float:left; margin-top:3px; margin-left:0px;"> Competition Type: </label>');
	var ctname = $('<div style="float:left; margin-top:0px; margin-left:5px"/>').attr({id:'ddlCompetitionTypeName'});
	tdiv.append(ctname);
	$('#ddlCompetitionTypeName').jqxDropDownList({placeHolder: "Please Select Competition Type", height: 20, width: 150, dropDownHeight: 150, theme: getTheme(), source: getAllCompetitionType(), selectedIndex: -1, displayMember: "name", valueMember: "id"});

	tdiv.append('<label style="float:left; margin-top:3px;margin-left:10px;">Total Student : </label>');
	var totalStudent = $('<input style="float:left; margin-top:0px;margin-left:5px;"/>').attr({type:'text', id:'txtTotalStudent'});
	tdiv.append(totalStudent);
	$('#txtTotalStudent').jqxInput({placeHolder: "Total Student", height: 20, width:30, minLength: 1, theme: getTheme() });	
	
	tdiv.append('<label style="float:left; margin-left:10px;margin-top:3px">Total Fee : </label>');
	var totalFee = $('<input style="float:left; margin-top:0px;margin-left:5px;"/>').attr({type:'text', id:'txtTotalFee'});
	tdiv.append(totalFee);
	$('#txtTotalFee').jqxInput({placeHolder: "Total Fee", height: 20, width:50, minLength: 1, theme: getTheme(), source:ClassLocation });

	var label = $('<label id="competitionstatuslabel" name="competitionstatuslabel" style="float:left; margin-top:3px; margin-left:10px;">Status : </label>');
	tdiv.append(label);

	var statusLabel = $('<label id="labelCompetitionStatus" name="labelCompetitionStatus" style="float:left; margin-top:3px; margin-left:5px;">N/A</label>');
	tdiv.append(statusLabel);


//	$('#competitionCommondiv').append('<br/>');

}

function cancelUpdateCompetitionInformation() {
	var data = getCurrentCompetitionInCompetitionTab();
	bindCompetitionCommonData(data);
}

function getCompetitionFeeByComptitionId(response, request, settings) {
	console.log(" in get competition fee by id ... ");
	if (404 == response.code) {
		console.log(" Can't find competition fee by id : " + getCurrentCompetitionInCompetitionTab().id);
		showCompetitionFeeInformation(null);
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get competition fee by id ");
		showCompetitionFeeInformation(data);
	} else {
		alert('error');
	}
}

function showCompetitionFeeInformation(data) {
	console.log(" in show competition Fee information .. ");
	
	$('#competitionFeeInformationdiv').empty();
	$('#competitionFeeInformationdiv').append('<br/>');
	var csdiv = $('<div class="InnerDiv" style="margin-left:80px; border:0px solid;"/>').attr({id:'competitionFeeDataTable'});	
	$('#competitionFeeInformationdiv').append(csdiv);
	var pdiv = $('<div/>').attr({id:'addCompetitionFeePopupWindow'});
	$('#competitionFeeInformationdiv').append(pdiv);
	$('#addCompetitionFeePopupWindow').append('<div >Add Competition Fee</div> <div style="height:130px; width:220px;" id="addCompetitionFeediv"></div>');

    var offset = $("#competitionFeeDataTable").offset();
    $("#addCompetitionFeePopupWindow").jqxWindow({
    	width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

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
	
    $("#competitionFeeDataTable").jqxDataTable({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
                
    	pageable: false,
	    editable: false,
	    selectionMode: 'singleRow',
    	showToolbar: true,
    	pageable:true,
    	pagesize:4,
	    altrows: true,
    	ready: function(){},
	    toolbarHeight: 25,
    	renderToolbar: function(toolBar){
    		var toTheme = function (className) {
    			if (getTheme() == "") return className;
	            return className + " " + className + "-" + theme;
    	    }

        	var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%; margin-top:5px'> <b> Competition Fee </b></div>");
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
    	    $("#competitionFeeDataTable").on('rowSelect', function (event) {
        		var args = event.args;
            	rowIndex = args.index;
	            updateButtons('Select');
    	    });
        	$("#competitionFeeDataTable").on('rowUnselect', function (event) {
        		updateButtons('Unselect');
	        });
    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
					createAddCompetitionFeeDiv();
				    var offset = $("#competitionFeeDataTable").offset();
					$("#addCompetitionFeePopupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 130, y: parseInt(offset.top) - 20 } });
                    $("#addCompetitionFeePopupWindow").jqxWindow('open');
                    
                    $('#btnCancelAddCompetitionFee').on('click', function () {
						console.log(" cancel add Fee ...");
						$("#addCompetitionFeePopupWindow").jqxWindow('hide');
                    });
                    $('#btnAddCompetitionFee').on('click', function () {
						console.log(" add new fee ...");
                        $("#competitionFeeDataTable").jqxDataTable('unselectRow', 0);
                        
                        var name = $('#txtCompetitionFeeName').val();
                        var cost = $('#txtCompetitionCost').val();
                        var type = $('#CompetitionCostType').jqxDropDownList('getSelectedItem').value;
                        var typename = $('#CompetitionCostType').jqxDropDownList('getSelectedItem').label;
                        var cid = getCurrentCompetitionInCompetitionTab().id;
                        
                        if (null == name || name.length < 1) {
                        	alert("please provide one name ");
                        } else if (null == cost || cost.length < 1) {
                        	alert("please provide fee value ");
                        } else if (null == type || type < 1) {
                        	alert("please select one type from list ");
                        } else {
                            $("#competitionFeeDataTable").jqxDataTable('selectRow', 0);
							$("#addCompetitionFeePopupWindow").jqxWindow('hide');

							var competitionfee = {"id":0, "msdCompetitionId":getCurrentCompetitionInCompetitionTab().id, "feeName":name, "cost":cost, "feeTypeName":null, "msdCostTypeId":type};
							ajaxAddCompetitionFee(competitionfee, addCompetitionFee);
                            $("#competitionFeeDataTable").jqxDataTable('addRow', null, {"id":0, "msdCompetitionId":getCurrentCompetitionInCompetitionTab().id, "feeName":name, "cost":cost, "feeTypeName":typename}, 'first');
                        }
                    });
                    
                	updateButtons('add');
	            }
    	    });
        	deleteButton.click(function () {
        		if (!deleteButton.jqxButton('disabled')) {
     				var deleterow = $("#competitionFeeDataTable").jqxDataTable('getSelection');
             		$("#competitionFeeDataTable").jqxDataTable('deleteRow', rowIndex);
	                updateButtons('delete');
	            	$("#competitionFeeDataTable").jqxDataTable('unselectRow', rowIndex);

	                ajaxDeleteCcompetitionFee(deleterow[0].id, deleteCompetitionFee);
    	        }
        	});
	    },
    	columns: [
			{text: 'Class ID', datafield:'msdCompetition', hidden:'true'},
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'feeName', width: 250},
			{text: 'Type', datafield: 'feeTypeName', width:250},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
		]
    });

	$('#competitionFeeInformationdiv').append('<br/>');
}

function createAddCompetitionFeeDiv() {
	$('#addCompetitionFeediv').empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	$('#addCompetitionFeediv').append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtCompetitionFeeName'});
	tdiv.append(name);
	$('#txtCompetitionFeeName').jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 180, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	$('#addCompetitionFeediv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Fee :</label>');
	var cost = $('<div/>').attr({id:'txtCompetitionCost'});
	tdiv.append(cost);
	$('#txtCompetitionCost').jqxNumberInput({ width: '180px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	$('#addCompetitionFeediv').append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Type :</label>');
	var costType = $('<div/>').attr({id:'CompetitionCostType'});
	tdiv.append(costType);
	$('#CompetitionCostType').jqxDropDownList({selectedIndex: 1, width: '180', height: '20', theme: getTheme(), source: getAllCostType(), selectedIndex: -1, displayMember: "name", valueMember: "id"});

	$('#addCompetitionFeediv').append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	$('#addCompetitionFeediv').append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddCompetitionFee', value:'Add'});
	atdiv.append(btnadd);
	$('#btnAddCompetitionFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddCompetitionFee', value:'Cancel'});
	atdiv.append(btncancel);
	$('#btnCancelAddCompetitionFee').jqxButton({ width: '60', height: 20, theme: getTheme() });
}


function addCompetitionFee (response, request, settings) {
	if (500 == response.code) {
		alert("Internal Error, Please check service. ");
	} else if (302 == response.code) {
		console.log(" add competition fee successfully ... ");
	} else {
		alert('error');
	}
}

function deleteCompetitionFee(response, request, settings) {
	if (404 == response.code) {
		alert(" Can't delete Competition fee ... ");
	} else if (302 == response.code) {
		console.log(" successfully delete Competition fee ... ");
	} else {
		alert("error to delete Competition fee ... ");
	}
}

function bindCompetitionCommonData(data) {
	$('#txtCompetitionName').jqxInput({disabled:true });
	$('#txtCompetitionName').jqxInput('val', null != data ? data.name : "");
	
	$('#txtCompetitionLocation').jqxInput({disabled:true });
	$('#txtCompetitionLocation').jqxInput('val', null != data ? data.location : "");

	$('#divCompetitionTime').jqxDateTimeInput({ disabled: true });
	$("#divCompetitionTime").jqxDateTimeInput('setRange', null != data && null != data.startDate ? data.startDate : null, 
														  null != data && null != data.endDate ? data.endDate : null);

	$('#divCompetitionRegisterDeadTime').jqxDateTimeInput({ disabled: true });
	$('#divCompetitionRegisterDeadTime').val(null != data && null != data.registerDeadline ? data.registerDeadline : null);

	$('#btnSaveCompetitionInformation').jqxButton({ disabled:true });

	$('#ddlCompetitionTypeName').jqxDropDownList({ disabled:true });
	if (null != data && null != data.competitionTypeId && 0 != data.competitionTypeId) {
		var item = $('#ddlCompetitionTypeName').jqxDropDownList('getItemByValue', data.competitionTypeId);
		$("#ddlCompetitionTypeName").jqxDropDownList('selectItem', item ); 
	} else {
		$('#ddlCompetitionTypeName').jqxDropDownList({selectedIndex: -1 });
	}
}

var currentFunctionInCompetitionTab;
function setCurrentFunctionInCompetitionTab(status) {
	currentFunctionInCompetitionTab = status;
}
function getCurrentFunctionInCompetitionTab() {
	return currentFunctionInCompetitionTab;
}

var currentCompetitionInCompetitionTab;
function getCurrentCompetitionInCompetitionTab(){
	return currentCompetitionInCompetitionTab;
}
function setCurrentCompetitionInCompetitionTab(value) {
	currentCompetitionInCompetitionTab = value;
}