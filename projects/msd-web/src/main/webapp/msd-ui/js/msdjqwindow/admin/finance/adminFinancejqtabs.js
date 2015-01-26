function showFinanceAdminPanel() {
	console.log(' in Finance admin Panel ... ');
	$('#adminMainPanel').empty();
	
	var fdiv = $('<div id="financeAdminMainPanel" style="height:550;"/>');
	$('#adminMainPanel').append(fdiv);

	var btndiv = $('<div style="margin-top:10px; border:1px solid  #e0e9f5; height:20px;"/>');
	fdiv.append(btndiv);

	var gfbutton = $('<input style="margin-left:20px" />').attr({type:'button', id:'btnGeneralFee', value:'General Fee'});
	btndiv.append(gfbutton);
	gfbutton.jqxButton({ width: '100', height: 20, theme: getTheme() });
/*	
	var cfbutton = $('<input style="margin-left:10px;" />').attr({type:'button', id:'btnClassFee', value:'Class Fee'});
	btndiv.append(cfbutton);
	cfbutton.jqxButton({ width: '100', height: 20, theme: getTheme() });
*/	
	var optiondiv = $('<div id="financeAdminOperationDiv" style="margin-top:0px; border:1px solid  #e0e9f5; "/>');
	fdiv.append(optiondiv);
	
	addFinanceAdminEventListeners();
}

function addFinanceAdminEventListeners() {
	$(document).on('click', '#btnGeneralFee', handleGeneralFeeClick);
//	$(document).on('click', '#btnClassFee', handleClassFeeClick);
}

function handleGeneralFeeClick() {
	console.log(' In handle General Fee Click ... ');
	ajaxGetAllGeneralFee(getAllGeneralFeeListinAdminFinance);
}

function getAllGeneralFeeListinAdminFinance(response, request, settings){
	console.log(" get general fee ... ");
	if (404 == response.code) {
		console.log(" Can't get all general fee ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all general fee list ");
		setAllGeneralFee(data);
	} else {
		alert('error');
	}
	showGeneralFeeGird(getAllGeneralFee());
}

function showGeneralFeeGird(data) {
	var faodiv = $('#financeAdminOperationDiv');
	faodiv.empty();

	// Create pop up add general fee panel
	var pdiv = $('<div/>').attr({id:'popupAddGeneralFeeWindow'});
	faodiv.append(pdiv);
	pdiv.append('<div >Add New General Fee</div> <div id="popupAddGeneralFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 250, height:180, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var gfdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'generalFeeGridDiv'});	
	faodiv.append(gfdiv);
	
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'feeName',  type: 'string'},
			{ name: 'feeTypeName', 	type: 'string'},
			{ name: 'cost', type: 'number'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	gfdiv.jqxGrid(
	{
		theme: getTheme(),
		width: 560,
		height: 400,
	    source: dataAdapter,
                
        selectionmode:'checkbox',
	    autoRowHeight: false,
    	showToolbar: true,
    	pageable:true,
		editable: true,
        editmode: 'click',    	
        pagesize:10,
	    altrows: true,
    	ready: function(){},
    	renderToolbar: function(toolBar){
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolBar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="addNewGeneralFeebtn" type="button" value="New" />');
//        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="editGeneralFeebtn" type="button" value="Disable" />');

		    var offset = gfdiv.offset();
			$("#popupAddGeneralFeeWindow").jqxWindow({ position: { x: parseInt(offset.left), y: parseInt(offset.top) - 80 } });
			createAddGeneralFeePopupWindow();

        	var addBtn = $("#addNewGeneralFeebtn");
	        addBtn.jqxButton({theme: getTheme(), width:60, disabled:false});
//        	var selectBtn = $('#editGeneralFeebtn');
//	        selectBtn.jqxButton({theme: getTheme(), width:60, disabled:true});

	        gfdiv.on('rowselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
/*				
				if (selectedIndex.length == 1) {
	    		    $("#editGeneralFeebtn").jqxButton({theme: getTheme(), disabled:false});
				} else {
	    		    $("#editGeneralFeebtn").jqxButton({theme: getTheme(), disabled:true});
				}
*/		        	
	        });
		        
	        gfdiv.on('rowunselect', function (event) {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
/*				
				if (selectedIndex.length == 1) {
	    		    $("#editGeneralFeebtn").jqxButton({theme: getTheme(), disabled:false});
				} else {
	    		    $("#editGeneralFeebtn").jqxButton({theme: getTheme(), disabled:true});
				}
*/		        	
	        });
		        
            addBtn.click(function (event) {
				$("#popupAddGeneralFeeWindow").jqxWindow('open');
            });
/*            
            selectBtn.click(function () {
				var selectedIndex = gfdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length != 1) {
					alert('Please select one general fee from the list ...');
					return;
				}

				var row = gfdiv.jqxGrid('getrowdata', selectedIndex[0]);
				
            });
*/
            $('#btnCancelAddGeneralFee').on('click', function () {
				console.log(" cancel add Fee ...");
				$("#popupAddGeneralFeeWindow").jqxWindow('hide');
            });
            
            $('#btnAddGeneralFee').on('click', function () {
	            var name = $('#txtGeneralFeeName').val();
                var cost = $('#txtGeneralCost').val();
                var type = $('#GeneralFeeType').jqxDropDownList('getSelectedItem').value;
                var typename = $('#GeneralFeeType').jqxDropDownList('getSelectedItem').label;
                        
                if (null == name || name.length < 1) {
                   	alert("please provide one name ");
                } else if (null == cost || cost.length < 1) {
                  	alert("please provide fee value ");
                } else if (null == type || type < 1) {
                   	alert("please select one type from list ");
                } else {
					$("#popupAddGeneralFeeWindow").jqxWindow('hide');

					var generalfee = {"id":0, "feeName":name, "cost":cost, "feeTypeName":null, "costTypeId":type};
					ajaxAddGeneralFee(generalfee, addGeneralFee);
                }
            });
  	    },
    	columns: [
			{text: 'ID', datafield:'id', hidden:'true'},
			{text: 'Name', datafield: 'feeName', editable: true},
			{text: 'Type', datafield: 'feeTypeName', width:170, editable: false},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2', editable: false}
		]
	});
    gfdiv.on('cellendedit', function (event) {
	    var args = event.args;
		var data = gfdiv.jqxGrid('getrowdata', args.rowindex);
		
		console.log(" update row id is : " + data.id + " old value : " + data.feeName + " new value : " + args.value);
		ajaxUpdateGeneralFeeNameByID(data.id, args.value, updateGeneralFeeNameByID);
    });
}

function createAddGeneralFeePopupWindow() {
	var psfdiv = $('#popupAddGeneralFeeDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtGeneralFeeName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 180, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Fee :</label>');
	var cost = $('<div/>').attr({id:'txtGeneralCost'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '180px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Type :</label>');
	var costType = $('<div/>').attr({id:'GeneralFeeType'});
	tdiv.append(costType);
	costType.jqxDropDownList({selectedIndex: 1, width: '180', height: '20', theme: getTheme(), source: getAllCostType(), selectedIndex: -1, displayMember: "name", valueMember: "id"});

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddGeneralFee', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddGeneralFee', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function addGeneralFee(response, request, settings){
	console.log(" return from add General fee ... ");
	if (404 == response.code) {
		console.log(" Error to add general fee ... ");
	} else if (302 == response.code) {
		console.log("successfully add general fee ... ");
		ajaxGetAllGeneralFee(getAllGeneralFeeListinAdminFinance);
	} else {
		alert("error to add general fee ... ");
	}
}

function updateGeneralFeeNameByID(response, request, settings){
	console.log(" return from update General fee Name ... ");
	if (404 == response.code) {
		console.log(" Error to update general fee Name ... ");
	} else if (201 == response.code) {
		console.log("successfully update general fee Name ... ");
		ajaxGetAllGeneralFee(getAllGeneralFeeListAfterUpdateGeneralFeeName);
	} else {
		alert("error to add general fee ... ");
	}
}

function getAllGeneralFeeListAfterUpdateGeneralFeeName(response, request, settings){
	console.log(" get general fee after update general fee name... ");
	if (404 == response.code) {
		console.log(" Can't get all general fee after update general fee name ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all general fee list after update general fee nme ");
		setAllGeneralFee(data);
	} else {
		alert('error');
	}
}
/*
function handleClassFeeClick() {
	console.log(' In handle Class Fee Click ... ');
}
*/