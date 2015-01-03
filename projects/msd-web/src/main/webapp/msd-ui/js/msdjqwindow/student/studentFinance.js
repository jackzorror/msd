function showStudentFinanceInfo() {
	console.log(" In Show Student Finance Information ... ");

	$('#studentMainPanel').empty();

	var sfbdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid; height:30px;"/>').attr({id:'studentFinanceInfoDiv'});
	$('#studentMainPanel').append(sfbdiv);
	
	var sfidiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentFeeInfoDiv'});
	$('#studentMainPanel').append(sfidiv);
	
	var scidiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentCreditInfoDiv'});
	$('#studentMainPanel').append(scidiv);
	
	showStudentFinanceButtonPanel();
	showStudentFeeInformationPanel();
	showStudentCreditInformationPanel();
}

function showStudentFinanceButtonPanel() {
	console.log(" show student finance button panel ");
	var sfbdiv = $('#studentFinanceInfoDiv');
	sfbdiv.empty();

	var sbalance = $('<input style="float:right; margin-top:5px; margin-right:10px"/>').attr({type:'text', id:'txtStudentBalance'});
	sfbdiv.append(sbalance);
	sbalance.jqxInput({placeHolder: "Student Balance", disabled:true, rtl:true, height: 20, width:150, minLength: 1, theme: getTheme() });	
	sfbdiv.append('<label style="float:right;margin-top:8px; margin-right:5px" > Student Balance : </label>');
	
	ajaxGetStudentFinanceBalance(getCurrentStudent().id, getStudentFinanceBalance);
}

function getStudentFinanceBalance(response, request, settings){
	console.log(" get student finance balance ... ");
	if (404 == response.code) {
		console.log(" There is balance for this student ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		var sbalance = $('#txtStudentBalance');
		sbalance.jqxInput('val', '$ ' + data.balance);
		if (data.balance > 0)
			sbalance.css("color", "Red");
		else if (data.balance == 0) 
			sbalance.css("color", "Gray");
		else 
			sbalance.css("color", "Green");
	} else {
		alert("error to find student balance ... ");
	}
}

function showStudentFeeInformationPanel() {
	console.log(" show student Fee panel ");
	var sfidiv = $('#studentFeeInfoDiv');
	sfidiv.empty();

	var cdiv = $('<div class="accord"/>').attr({id:'studentFeeInformationDiv'});
	var ctdiv = $('<div class="title">Student Fee Information </div>').attr({id:'studentFeeInformationTitleDiv'});
	var ccdiv = $('<div class="content" style="background:#e0e9f5;"/>').attr({id:'studentFeeInformationContentDiv'});
	
	sfidiv.append(cdiv);
	cdiv.append(ctdiv);
	cdiv.append(ccdiv);
	
	cdiv.raaccordion();

	ajaxGetStudentFeeByStudentId(getCurrentStudent().id, getStudentFeeByStudentId);
}

function getStudentFeeByStudentId(response, request, settings){
	console.log(" get student fee ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no fee for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
	} else {
		alert("error to find student fee ... ");
	}
	showStudentFeeGridDiv(data);
}

function showStudentFeeGridDiv(data) {
	console.log(" show student Fee Grid panel ");
	var ccdiv = $('#studentFeeInformationContentDiv');
	ccdiv.empty();
	
	// Create pop up pay panel
	var pdiv = $('<div/>').attr({id:'popupStudentFeePayWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Pay Student Fee</div> <div id="popupPayStudentFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 400, height:250, resizable: false,  draggable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	//Create pop up waive panel
	var pdiv = $('<div/>').attr({id:'popupStudentFeeWaiveWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Waive Student Fee</div> <div id="popupWaiveStudentFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 400, height:250, resizable: false, draggable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	//Create pop up Add Student Fee panel
	var pdiv = $('<div/>').attr({id:'popupAddStudentFeeWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Add Student Fee</div> <div id="popupAddStudentFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 600, height:500, resizable: false,  draggable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var sfgdiv = $('<div style="border:0px solid;"/>').attr({id:'studentFeeGrid'});
	ccdiv.append(sfgdiv);
	
	var source = {
		datafields:[
			{ name: 'id', type: 'int'},
			{ name: 'feeObjectName', type: 'string'},
			{ name: 'feeName', type: 'string'},
			{ name: 'cost', type: 'number'},
			{ name: 'isPaid', type: 'bool'},
			{ name: 'isWaiver', type: 'bool'},
			{ name: 'payTime', type: 'date'}
		],
		datatype:'json',
		localdata:data
	}
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	sfgdiv.jqxGrid({
		theme: getTheme(),
		source:dataAdapter,
    	width: 610,
		pageable: true,
		pagesizeoptions: ['10'],
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:0px; margin-right:10px;" id="payStudentFeebtn" type="button" value="Pay Fee" />');
        	container.append('<input style="margin-left: 5px; margin-top:0px; margin-right:10px;" id="waiveStudentFeebtn" type="button" value="Waive Fee" />');
        	container.append('<input style="margin-left: 5px; margin-top:0px; margin-right:5px;" id="addStudentFeebtn" type="button" value="Add Fee" />');
	        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
	        $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
	        $('#addStudentFeebtn').jqxButton({theme:getTheme(), disabled:false});

		    var offset = sfgdiv.offset();
			$("#popupStudentFeePayWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createPayPopupPanel();
			$("#popupStudentFeeWaiveWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createWaivePopupPanel();
			$("#popupAddStudentFeeWindow").jqxWindow({ position: { x: parseInt(offset.left) - 50, y: parseInt(offset.top) - 30 } });
	        createAddStudentFeePopupPanel();
	        
	        sfgdiv.on('rowselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
				}
		        	
	        });
		        
	        sfgdiv.on('rowunselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
				}
		        	
	        });
		        
        	$("#payStudentFeebtn").on('click', function () {
				console.log("Pay student fee ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select from the list ...');
					return;
				}
				var totalFee = 0.0;
				var fidList = "";
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					totalFee += row.cost;
					fidList += row.id + ",";
					if (row.isPaid || row.isWaiver) {
						alert('Please select one without paid or waived fee to process');
						return;
					}
				} 

				showPayPopupPanel(totalFee);
				$('#popupStudentFeePayWindow').jqxWindow('open');
				
    	    });
    	    $('#waiveStudentFeebtn').on('click', function () {
				console.log("Pay student fee ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length != 1) {
					alert('Please select one from the list ...');
					return;
				}
				var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[0]);
				if (row.isPaid || row.isWaiver) {
					alert('Please select one without paid or waived fee to process');
					return;
				}

				showWaivePopupPanel(row.cost);
				$('#popupStudentFeeWaiveWindow').jqxWindow('open');
				
    	    });
        	$("#addStudentFeebtn").on('click', function () {
				console.log("Add student fee ... ");
				showAddStudentFeePopupPanel(getAllGeneralFee());
				$('#popupAddStudentFeeWindow').jqxWindow('open');
    	    });
    	    
    	    $('#btnCancelPayStudentFee').on('click', function () {
				$('#popupStudentFeePayWindow').jqxWindow('hide');
    	    });
    	    $('#btnCancelWaiveStudentFee').on('click', function() {
				$('#popupStudentFeeWaiveWindow').jqxWindow('hide');
    	    });
    	    $('#btnPayStudentFee').on('click', function () {
    	    	console.log(" Pay student fee click ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				var totalfee = 0.0;
				var feeidlist = "";
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					totalfee += row.cost;
					feeidlist += row.id + ",";
				} 

				var tfee = $('#txtTotalPayCost').jqxNumberInput('val');	    	
				if (tfee != totalfee) {
					alert(" total fee are not match ... ");
					return;
				}

				$('#popupStudentFeePayWindow').jqxWindow('hide');
				
				var paytype = $('#txtPayType').jqxInput('val');
				var paytime = $('#paydatetimediv').jqxDateTimeInput('getDate');
				var paynote = $('#txtPayNote1').jqxInput('val') + $('#txtPayNote2').jqxInput('val');

				ajaxPayStudentFees(getCurrentStudent().id, feeidlist, totalfee, paytype, paytime, paynote, payStudentFees);
				
    	    });
    	    $('#btnWaiveStudentFee').on('click', function () {
    	    	console.log(" Waive student fee click ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[0]);

				var tfee = $('#txtTotalWaiveCost').jqxNumberInput('val');	    	
				if (tfee != row.cost) {
					alert(" fee are not match ... ");
					return;
				}

				$('#popupStudentFeeWaiveWindow').jqxWindow('hide');
				
				var paytime = $('#waivedatetimediv').jqxDateTimeInput('getDate');
				var paynote = $('#txtWaiveNote1').jqxInput('val') + $('#txtWaiveNote2').jqxInput('val');

				ajaxPayStudentFees(getCurrentStudent().id, row.id, row.cost, 'WAIVESTUDENTFEE', paytime, paynote, waiveStudentFee);
				
    	    });
		},
		selectionmode: 'checkbox',
    	altrows: true,
		columns:[
			{text: 'ID', datafield:'id', hidden:'true'}
        	,{ text: 'Object Name', datafield: 'feeObjectName'}
        	,{ text: 'Name', datafield: 'feeName', width:150 }
        	,{ text: 'Fee', datafield: 'cost', width:80, cellsalign: 'right', cellsformat: 'c2' }
        	,{ text: 'Paid', datafield: 'isPaid', columntype: 'checkbox', width: 60, cellsalign: 'center', align: 'center' }
    	    ,{ text: 'Waiver', datafield: 'isWaiver', columntype: 'checkbox', width: 60, cellsalign: 'center', align: 'center' }
			,{ text: 'Detail', datafield: 'Detail',width: 65,  columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentFeeGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetStudentFeeDetailById(id, getStudentFeeDetailByIdInStudentTab);
				}
			}
		],
	});
}

function createPayPopupPanel() {
	var psfdiv = $('#popupPayStudentFeeDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:5px;">Total Cost : </label>');
	var tcost = $('<div />').attr({id:'txtTotalPayCost'});
	tdiv.append(tcost);
	tcost.jqxNumberInput({ width: '100px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	tdiv.append('<label style="margin-top:5px; margin-right:5px">Pay Type : </label>');
	var ptype = $('<input style="margin-top:5px; margin-left:2px"/>').attr({type:'text', id:'txtPayType'});
	tdiv.append(ptype);
	ptype.jqxInput({ placeHolder: "Cash or Check", height: 20, width: 100, minLength:1, theme:getTheme() });
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:10px;">Pay Time : </label>');
	var ctdiv = $('<div/>').attr({id:'paydatetimediv'});
	tdiv.append(ctdiv);
	ctdiv.jqxDateTimeInput({ width: '240px', height: '25px',  formatString: 'ddd, MMMM dd, yyyy HH:mm', theme:getTheme() });
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:5px;">Please using the following field to add Pay note : </label>');
	tdiv.append('<br/>');
	var note1 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtPayNote1'});
	tdiv.append(note1);
	note1.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	var note2 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtPayNote2'});
	tdiv.append(note2);
	note2.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	psfdiv.append('<br/>');
	
	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	psfdiv.append(tdiv);
	var btnPayStudentFee = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnPayStudentFee', value:'Pay'});
	tdiv.append(btnPayStudentFee);
	btnPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
	var btnCancelPayStudentFee = $('<input style="margin-right:20px;"/>').attr({type:'button', id:'btnCancelPayStudentFee', value:'Cancel'});
	tdiv.append(btnCancelPayStudentFee);
	btnCancelPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
}

function createWaivePopupPanel() {
	var psfdiv = $('#popupWaiveStudentFeeDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:5px;">Total Cost : </label>');
	var tcost = $('<div />').attr({id:'txtTotalWaiveCost'});
	tdiv.append(tcost);
	tcost.jqxNumberInput({ width: '100px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:10px;">Waive Time : </label>');
	var ctdiv = $('<div/>').attr({id:'waivedatetimediv'});
	tdiv.append(ctdiv);
	ctdiv.jqxDateTimeInput({ width: '240px', height: '25px',  formatString: 'ddd, MMMM dd, yyyy HH:mm', theme:getTheme() });
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:5px;">Please using the following field to add Waive note : </label>');
	tdiv.append('<br/>');
	var note1 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtWaiveNote1'});
	tdiv.append(note1);
	note1.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	var note2 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtWaiveNote2'});
	tdiv.append(note2);
	note2.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	psfdiv.append('<br/>');
	
	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	psfdiv.append(tdiv);
	var btnPayStudentFee = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnWaiveStudentFee', value:'Waive'});
	tdiv.append(btnPayStudentFee);
	btnPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
	var btnCancelPayStudentFee = $('<input style="margin-right:20px;"/>').attr({type:'button', id:'btnCancelWaiveStudentFee', value:'Cancel'});
	tdiv.append(btnCancelPayStudentFee);
	btnCancelPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
}

function createAddStudentFeePopupPanel() {
	var psfdiv = $('#popupAddStudentFeeDiv');
	psfdiv.empty();

	var tdiv = $('<div style="margin-top:0px; border:1px solid;"/>');
	psfdiv.append(tdiv);
	
	tdiv.append('<label style="margin-top:5px; margin-right:5px;">Please select fee from the following list </label>');
	
	var asfdiv = $('<div style="border:1px solid;"/>').attr({id:'addStudentFeeGridPanel'});	
	psfdiv.append(asfdiv);
}

function showWaivePopupPanel(totalcost) {
	$('#txtTotalWaiveCost').jqxNumberInput('val', totalcost);
	$('#waivedatetimediv').jqxDateTimeInput('setDate', new Date());
	$('#txtWaiveNote1').jqxInput('value', null);
	$('#txtWaiveNote2').jqxInput('value', null);
}

function showPayPopupPanel(totalcost) {
	$('#txtTotalPayCost').jqxNumberInput('val', totalcost);
	$('#txtPayType').jqxInput('val', null);
	$('#paydatetimediv').jqxDateTimeInput('setDate', new Date());
	$('#txtPayNote1').jqxInput('value', null);
	$('#txtPayNote2').jqxInput('value', null);
}

function showAddStudentFeePopupPanel(data) {
	var asfdiv = $('#addStudentFeeGridPanel');
	asfdiv.empty();
	
	// Create pop up add general fee panel
	var pdiv = $('<div/>').attr({id:'popupAddGeneralFeeWindow'});
	asfdiv.append(pdiv);
	pdiv.append('<div >Add New General Fee</div> <div id="popupAddGeneralFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 250, height:180, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	// Create pop up add new Student fee panel
	var pdiv = $('<div/>').attr({id:'popupAddNewStudentFeeWindow'});
	asfdiv.append(pdiv);
	pdiv.append('<div >Add New Student Fee</div> <div id="popupAddNewStudentFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 410, height:200, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	
	var fdiv = $('<div style="border:0px solid; margin-top:10px; margin-left:10px"/>').attr({id:'addStudentFeeGridDiv'});	
	asfdiv.append(fdiv);
	
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
	
	fdiv.jqxGrid(
	{
		theme: getTheme(),
		width: 560,
		height: 400,
	    source: dataAdapter,
                
        selectionmode:'checkbox',
	    autoRowHeight: false,
    	showToolbar: true,
    	pageable:true,
    	pagesize:10,
	    altrows: true,
    	ready: function(){},
    	renderToolbar: function(toolBar){
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolBar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="addNewGeneralFeebtn" type="button" value="New" />');
        	container.append('<input style="margin-left: 5px; margin-top:5px; margin-right:10px;" id="selectNewGeneralFeebtn" type="button" value="Add" />');

		    var offset = fdiv.offset();
			$("#popupAddGeneralFeeWindow").jqxWindow({ position: { x: parseInt(offset.left), y: parseInt(offset.top) - 80 } });
			createAddGeneralFeePopupWindow();

			$("#popupAddNewStudentFeeWindow").jqxWindow({ position: { x: parseInt(offset.left), y: parseInt(offset.top) - 80 } });
			createAddNewStudentFeePopupWindow();

        	var addBtn = $("#addNewGeneralFeebtn");
        	var selectBtn = $('#selectNewGeneralFeebtn');
	        addBtn.jqxButton({theme: getTheme(), width:60, disabled:false});
	        selectBtn.jqxButton({theme: getTheme(), width:60, disabled:true});

	        fdiv.on('rowselect', function (event) {
				var selectedIndex = fdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length == 1) {
	    		    $("#selectNewGeneralFeebtn").jqxButton({theme: getTheme(), disabled:false});
				} else {
	    		    $("#selectNewGeneralFeebtn").jqxButton({theme: getTheme(), disabled:true});
				}
		        	
	        });
		        
	        fdiv.on('rowunselect', function (event) {
				var selectedIndex = fdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length == 1) {
	    		    $("#selectNewGeneralFeebtn").jqxButton({theme: getTheme(), disabled:false});
				} else {
	    		    $("#selectNewGeneralFeebtn").jqxButton({theme: getTheme(), disabled:true});
				}
		        	
	        });
		        
            addBtn.click(function (event) {
				$("#popupAddGeneralFeeWindow").jqxWindow('open');
            });
            
            selectBtn.click(function () {
				var selectedIndex = fdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length != 1) {
					alert('Please select one general fee from the list ...');
					return;
				}

				var row = fdiv.jqxGrid('getrowdata', selectedIndex[0]);

				bindAddNewStudentFeePopupWindow(row);

				$("#popupAddNewStudentFeeWindow").jqxWindow('open');
				
            });
            $('#btnCancelAddNewStudentFee').on('click', function () {
            	console.log(" Cancel add New Student Fee ... ");
				$("#popupAddNewStudentFeeWindow").jqxWindow('hide');
            });
            $('#btnAddNewStudentFee').on('click', function () {
				var fnote = $('#txtNewStudentFeeNote').val();
				
				if (null == fnote || fnote.length < 1) {
					alert("please provide fee note ");
					return;
				}
				$("#popupAddNewStudentFeeWindow").jqxWindow('hide');

				var selectedIndex = fdiv.jqxGrid('getselectedrowindexes');
				var row = fdiv.jqxGrid('getrowdata', selectedIndex[0]);
				
				var sid = getCurrentStudent().id;
				
				ajaxAddGeneralFeeToStudentFee(sid, row.id, fnote, addGeneralFeeToStuentFee);
				
				fdiv.jqxGrid('clearselection');
            });
            
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
			{text: 'Name', datafield: 'feeName'},
			{text: 'Type', datafield: 'feeTypeName', width:170},
			{text: 'Fee', datafield: 'cost', width:100, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
		]
	});
}

function payStudentFees(response, request, settings){
	console.log(" return from pay student fees ... ");
	if (404 == response.code) {
		console.log(" Error to pay student fees ... ");
	} else if (201 == response.code) {
		console.log("successfully pay student fees ... ");
	} else {
		alert("error to pay student fees ... ");
	}
	showStudentFinanceInfo();
}

function waiveStudentFee(response, request, settings){
	console.log(" return from waive student fee ... ");
	if (404 == response.code) {
		console.log(" Error to waive student fee ... ");
	} else if (201 == response.code) {
		console.log("successfully waive student fee ... ");
	} else {
		alert("error to waive student fee ... ");
	}
	showStudentFinanceInfo();
}

function addGeneralFee(response, request, settings){
	console.log(" return from add General fee ... ");
	if (404 == response.code) {
		console.log(" Error to add general fee ... ");
	} else if (302 == response.code) {
		console.log("successfully add general fee ... ");
		ajaxGetAllGeneralFee(getAllGeneralFeeListinStudentFinance);
	} else {
		alert("error to add general fee ... ");
	}
}

function getAllGeneralFeeListinStudentFinance(response, request, settings){
	console.log(" get student fee detail ... ");
	if (404 == response.code) {
		console.log(" Can't get all general fee ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all general fee list ");
		setAllGeneralFee(data);
	} else {
		alert('error');
	}
	showAddStudentFeePopupPanel(getAllGeneralFee());
}

function getStudentFeeDetailByIdInStudentTab(response, request, settings){
	console.log(" get student fee detail ... ");
	if (404 == response.code) {
		console.log(" There is no fee for this student ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showStudentFeeDetailPopup(data);
	} else {
		alert("error to find student fee ... ");
	}
}

function showStudentFeeDetailPopup(data) {
	console.log(" this will pop up window to show detail about student fee ");
	
	if (0 == $('#msdStudentFeeDetailPopupPanel').length) {
	
	    $('#studentMainPanel').append('<div id="msdStudentFeeDetailPopupPanel" />');

		var cdpdiv = $('#msdStudentFeeDetailPopupPanel');

		cdpdiv.append('<div >Student Fee Detail Information</div> <div id="studentFeeDetailPopupDiv"></div>');
		cdpdiv.jqxWindow({showCollapseButton: false, isModal: true, draggable:true,  resizable: false, height: 400, width: 400, theme: theme, position: { x: 350, y: 150}});
	
		var cdiv = $('<div style = "width:480px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'studentFeeDetailInformationDiv'});
		$('#studentFeeDetailPopupDiv').append(cdiv);
	}
	
	var cdpdiv = $('#msdStudentFeeDetailPopupPanel');

	if (false == cdpdiv.jqxWindow('isOpen')) {
		cdpdiv.jqxWindow('open');
	}

	createStduentFeeDetailDiv(data);
}

function createStduentFeeDetailDiv(data) {
	var sfddiv = $('#studentFeeDetailInformationDiv');
	sfddiv.empty();

	sfddiv.append('<label style="">Fee Object Name : </label>');
	var foname = $('<input style=""/>').attr({type:'text'});
	sfddiv.append(foname);
	foname.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
	foname.jqxInput('val', data.feeObjectName);
	
	sfddiv.append('<br/>');
	sfddiv.append('<label style="margin-top:5px">Fee Name : </label>');
	var fname = $('<input style="margin-top:5px; margin-left:47px"/>').attr({type:'text'});
	sfddiv.append(fname);
	fname.jqxInput({rtl: true, disabled:true, height: 20, width: 200, minLength:1, theme:getTheme() });
	fname.jqxInput('val', data.feeName);
	
	sfddiv.append('<br/>');
	sfddiv.append('<label style="margin-top:5px">Fee : </label>');
	var fcost = $('<input style="margin-top:5px; margin-left:90px; margin-botton:20px;"/>').attr({type:'text'});
	sfddiv.append(fcost);
	fcost.jqxInput({disabled:true, height: 20, width: 200, rtl:true, minLength:1, theme:getTheme() });
	fcost.jqxInput('val', '$ ' + data.cost);
	
	sfddiv.append('<br/>');
	if (data.isPaid == true || data.isWaiver == true) {
		if (data.isPaid == true) {
			sfddiv.append('<label style="margin-top:5px">Paid at : </label>');
			var ptime = $('<input style="margin-top:5px;margin-left:68px;"/>').attr({type:'text'});
			sfddiv.append(ptime);
			ptime.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
			ptime.jqxInput('val', data.payTime);
		}
		else {
			sfddiv.append('<label style="margin-top:5px">Wavied at : </label>');
			var ptime = $('<input style="margin-top:5px;margin-left:48px;"/>').attr({type:'text'});
			sfddiv.append(ptime);
			ptime.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
			ptime.jqxInput('val', data.payTime);
		}
		
		if (data.isPaid == true) {
			sfddiv.append('<br/>');
		
			sfddiv.append('<label style="margin-top:5px">Pay Type : </label>');
			var ptype = $('<input style="margin-top:5px;margin-left:52px;"/>').attr({type:'text'});
			sfddiv.append(ptype);
			ptype.jqxInput({rtl:true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
			ptype.jqxInput('val', data.payType);
		
		}	
		sfddiv.append('<br/>');
		
		var pnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text'});
		sfddiv.append(pnote);
		pnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		pnote.jqxInput('val', data.payNote);
	} else {
		var pnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text'});
		sfddiv.append(pnote);
		pnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		pnote.jqxInput('val', "This Fee is not pay off");
		pnote.css("color", "red");
	}

	if (null != data.feeNote) {
		var fnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text'});
		sfddiv.append(fnote);
		fnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		fnote.jqxInput('val', data.feeNote);
	
	}
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

function createAddNewStudentFeePopupWindow() {
	var psfdiv = $('#popupAddNewStudentFeeDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">New Fee Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtNewStudentFeeName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 260, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">New Fee:</label>');
	var cost = $('<div/>').attr({id:'txtNewStudentFeeCost'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '260px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var fnote = $('<input style="float:right; margin-top:5px;margin-left:0px;"/>').attr({type:'text', id:'txtNewStudentFeeNote'});
	psfdiv.append(fnote);
	fnote.jqxInput({placeHolder: "Enter Fee Note", height: 20, width:390, minLength:1, theme:getTheme() });

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddNewStudentFee', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddNewStudentFee', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function bindAddNewStudentFeePopupWindow(data) {
	$('#txtNewStudentFeeName').jqxInput('val', data.feeName);
	$('#txtNewStudentFeeCost').jqxNumberInput('val', data.cost);
}

function addGeneralFeeToStuentFee(response, request, settings) {
	console.log(" add general fee to student fee ... ");
	if (404 == response.code) {
		alert(" Can't add general fee to student fee ... ");
	} else if (302 == response.code) {
		console.log(" successfully add general fee to student fee ... ");
	} else {
		alert("error to delete student registered competition ... ");
	}
	showStudentFinanceInfo();
}

function showStudentCreditInformationPanel() {
	console.log(" show student Credit panel ");
	var scidiv = $('#studentCreditInfoDiv');
	scidiv.empty();

	var cdiv = $('<div class="accord"/>').attr({id:'studentCreditInformationDiv'});
	var ctdiv = $('<div class="title">Student Credit Information </div>').attr({id:'studentCreditInformationTitleDiv'});
	var ccdiv = $('<div class="content" style="background:#e0e9f5;"/>').attr({id:'studentCreditInformationContentDiv'});
	
	scidiv.append(cdiv);
	cdiv.append(ctdiv);
	cdiv.append(ccdiv);
	
	cdiv.raaccordion();

	ajaxGetStudentCreditByStudentId(getCurrentStudent().id, getStudentCreditByStudentId);
}

function getStudentCreditByStudentId(response, request, settings){
	console.log(" get student credit ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no credit for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
	} else {
		alert("error to find student credit ... ");
	}
	showStudentCrediteGridDiv(data);
}

function showStudentCrediteGridDiv(data) {
	console.log(" show student Credit Grid panel ");
	var ccdiv = $('#studentCreditInformationContentDiv');
	ccdiv.empty();
	
	// Create pop up Consume panel
	var pdiv = $('<div/>').attr({id:'popupStudentCreditConsumeWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Consume Student Credit</div> <div id="popupConsumeStudentCreditDiv"></div>');
    pdiv.jqxWindow({
    	width: 400, height:250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });

	//Create pop up Add Student Credit panel
	var pdiv = $('<div/>').attr({id:'popupAddStudentCreitWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Add Student Credit</div> <div id="popupAddStudentCreditDiv"></div>');
    pdiv.jqxWindow({
    	width: 410, height:200, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var sfgdiv = $('<div style="border:0px solid;"/>').attr({id:'studentCreditGrid'});
	ccdiv.append(sfgdiv);

	var source = {
		datafields:[
			{ name: 'id', type: 'int'},
			{ name: 'creditNote', type: 'string'},
			{ name: 'credit', type: 'number'},
			{ name: 'isConsumed', type: 'bool'},
			{ name: 'isActive', type: 'bool'},
		],
		datatype:'json',
		localdata:data
	}
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	sfgdiv.jqxGrid({
		theme: getTheme(),
		source:dataAdapter,
    	width: 610,
		pageable: true,
		pagesizeoptions: ['10'],
		showtoolbar:true,
		rendertoolbar:function (toolbar) {
			var container = $("<div style = 'float: right; margins-right: 0px; border:0px solid;'></div>");
			toolbar.append(container);
        	container.append('<input style="margin-left: 5px; margin-top:0px; margin-right:10px;" id="consumeStudentCreditbtn" type="button" value="Consume Credit" />');
        	container.append('<input style="margin-left: 5px; margin-top:0px; margin-right:5px;" id="addStudentCreditbtn" type="button" value="Add Credit" />');
	        $("#consumeStudentCreditbtn").jqxButton({theme: getTheme(), disabled:true});
	        $('#addStudentCreditbtn').jqxButton({theme:getTheme(), disabled:false});

		    var offset = sfgdiv.offset();
			$("#popupStudentCreditConsumeWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createConsumeCreditPopupPanel();
			$("#popupAddStudentCreitWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createAddCreditPopupPanel();
	        
	        sfgdiv.on('rowselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
	    		    $("#consumeStudentCreditbtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#consumeStudentCreditbtn").jqxButton({theme: getTheme(), disabled:false});
				}
		        	
	        });
		        
	        sfgdiv.on('rowunselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
	    		    $("#consumeStudentCreditbtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#consumeStudentCreditbtn").jqxButton({theme: getTheme(), disabled:false});
				}
		        	
	        });
		        
        	$("#consumeStudentCreditbtn").on('click', function () {
				console.log("Consume student Credit ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
					alert('Please select from the list ...');
					return;
				}
				var totalCredit = 0.0;
				var fidList = "";
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					totalCredit += row.credit;
					fidList += row.id + ",";
					if (row.isConsumed) {
						alert('Please select one without consume to process');
						return;
					}
				} 

				showConsumeCreditPopupPanel(totalCredit);
				$('#popupStudentCreditConsumeWindow').jqxWindow('open');
				
    	    });
    	    $('#btnCancelConsumeStudentCredit').on('click', function () {
				$('#popupStudentCreditConsumeWindow').jqxWindow('hide');
    	    });
    	    $('#btnConsumeStudentCredit').on('click', function () {
    	    	console.log(" Consume student Credit click ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				var totalcredit = 0.0;
				var feeidlist = "";
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					totalcredit += row.credit;
					feeidlist += row.id + ",";
				} 

				var tfee = $('#txtTotalConsumeCredit').jqxNumberInput('val');	    	
				if (tfee != totalcredit) {
					alert(" total credit are not match ... ");
					return;
				}

				$('#popupStudentCreditConsumeWindow').jqxWindow('hide');
				
				var consumetime = $('#consumedatetimediv').jqxDateTimeInput('getDate');
				var consumenote = $('#txtConsumeNote1').jqxInput('val') + $('#txtConsumeNote2').jqxInput('val');

				ajaxConsumeStudentCredits(getCurrentStudent().id, feeidlist, consumetime, consumenote, ConsumeStudentCredits);
				
    	    });
    	    
        	$("#addStudentCreditbtn").on('click', function () {
				console.log("Add student Credit ... ");
				$('#popupAddStudentCreitWindow').jqxWindow('open');
    	    });
    	    $('#btnCancelAddNewStudentCredit').on('click', function () {
				$('#popupAddStudentCreitWindow').jqxWindow('hide');
    	    });
    	    $('#btnAddNewStudentCredit').on('click', function () {
    	    	var credit = $('#txtNewStudentCredit').val();
    	    	if (null == credit || 0 == credit) {
    	    		alert('Please provide credit value');
    	    		return;
    	    	}    	    		
    	    	var note = $('#txtNewStudentCreditNote').val()
    	    	if (null == note || note.length == 0) {
    	    		alert('Please provide credit note');
    	    		return;
    	    	}
				$('#popupAddStudentCreitWindow').jqxWindow('hide');
				ajaxAddStudentCredit(getCurrentStudent().id, credit, note, addStudentCredit);    	    	
    	    });
		},
		selectionmode: 'checkbox',
    	altrows: true,
		columns:[
			{text: 'ID', datafield:'id', hidden:'true'}
        	,{ text: 'Note', datafield: 'creditNote'}
        	,{ text: 'Credit', datafield: 'credit', width:80, cellsalign: 'right', cellsformat: 'c2' }
        	,{ text: 'Consumed', datafield: 'isConsumed', columntype: 'checkbox', width: 80, cellsalign: 'center', align: 'center' }
			,{ text: 'Detail', datafield: 'Detail',width: 60,  columntype:'button', cellsrenderer:function(){
					return "Detail";
				}, buttonclick:function(row) {
					var id = $('#studentCreditGrid').jqxGrid('getcellvalue', row, 'id');
					ajaxGetStudentCreditDetailById(id, getStudentCreditDetailByIdInStudentTab);
				}
			}
		],
	});
}

function ConsumeStudentCredits(response, request, settings){
	console.log(" return from consume student Credits ... ");
	if (404 == response.code) {
		console.log(" Error to consume student credits ... ");
	} else if (201 == response.code) {
		console.log("successfully consume student credits ... ");
	} else {
		alert("error to consume student credits ... ");
	}
	showStudentFinanceInfo();
}

function createConsumeCreditPopupPanel() {
	var psfdiv = $('#popupConsumeStudentCreditDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:5px;">Total Credit : </label>');
	var tcost = $('<div />').attr({id:'txtTotalConsumeCredit'});
	tdiv.append(tcost);
	tcost.jqxNumberInput({ width: '100px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:5px; margin-right:10px;">Consume Time : </label>');
	var ctdiv = $('<div/>').attr({id:'consumedatetimediv'});
	tdiv.append(ctdiv);
	ctdiv.jqxDateTimeInput({ width: '240px', height: '25px',  formatString: 'ddd, MMMM dd, yyyy HH:mm', theme:getTheme() });
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:5px;">Please using the following field to add Consume note : </label>');
	tdiv.append('<br/>');
	var note1 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtConsumeNote1'});
	tdiv.append(note1);
	note1.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	var note2 = $('<input style="margin-top:5px; margin-left:20px"/>').attr({type:'text', id:'txtConsumeNote2'});
	tdiv.append(note2);
	note2.jqxInput({height: 20, width: 350, minLength:1, theme:getTheme() });
	
	psfdiv.append('<br/>');
	
	// action button
	var tdiv = $('<div style="margin-top:5px; border:0px solid;" align="right" />');
	psfdiv.append(tdiv);
	var btnPayStudentFee = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnConsumeStudentCredit', value:'Consume'});
	tdiv.append(btnPayStudentFee);
	btnPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
	var btnCancelPayStudentFee = $('<input style="margin-right:20px;"/>').attr({type:'button', id:'btnCancelConsumeStudentCredit', value:'Cancel'});
	tdiv.append(btnCancelPayStudentFee);
	btnCancelPayStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
}

function showConsumeCreditPopupPanel(data) {
	$('#txtTotalConsumeCredit').jqxNumberInput('val', data);
}

function createAddCreditPopupPanel() {
	var psfdiv = $('#popupAddStudentCreditDiv');
	psfdiv.empty();
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">New Credit:</label>');
	var cost = $('<div/>').attr({id:'txtNewStudentCredit'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '260px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var fnote = $('<input style="float:right; margin-top:5px;margin-left:0px;"/>').attr({type:'text', id:'txtNewStudentCreditNote'});
	psfdiv.append(fnote);
	fnote.jqxInput({placeHolder: "Enter Credit Note", height: 20, width:390, minLength:1, theme:getTheme() });

	psfdiv.append('<br/>');

	// action button
	var atdiv = $('<div style="float:right; margin-top:20px; border:0px solid;" />');
	psfdiv.append(atdiv);
	var btnadd = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnAddNewStudentCredit', value:'Add'});
	atdiv.append(btnadd);
	btnadd.jqxButton({ width: '60', height: 20, theme: getTheme() });
	var btncancel = $('<input style="margin-right:0px;"/>').attr({type:'button', id:'btnCancelAddNewStudentCredit', value:'Cancel'});
	atdiv.append(btncancel);
	btncancel.jqxButton({ width: '60', height: 20, theme: getTheme() });
}

function addStudentCredit(response, request, settings) {
	console.log(" add student credit ... ");
	if (404 == response.code) {
		alert(" Can't add student credit ... ");
	} else if (201 == response.code) {
		console.log(" successfully student credit ... ");
	} else {
		alert("error add student credit ... ");
	}
	showStudentFinanceInfo();
}

function getStudentCreditDetailByIdInStudentTab(response, request, settings){
	console.log(" get student credit detail ... ");
	if (404 == response.code) {
		console.log(" There is no credit for this student ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showStudentCreditDetailPopup(data);
	} else {
		alert("error to find student credit ... ");
	}
}

function showStudentCreditDetailPopup(data) {
	console.log(" this will pop up window to show detail about student credit ");
	
	if (0 == $('#msdStudentCreditDetailPopupPanel').length) {
	
	    $('#studentMainPanel').append('<div id="msdStudentCreditDetailPopupPanel" />');

		var cdpdiv = $('#msdStudentCreditDetailPopupPanel');

		cdpdiv.append('<div >Student Credit Detail Information</div> <div id="studentCreditDetailPopupDiv"></div>');
		cdpdiv.jqxWindow({showCollapseButton: false, isModal: true, draggable:true,  resizable: false, height: 400, width: 400, theme: theme, position: { x: 350, y: 150}});
	
		var cdiv = $('<div style = "width:480px; margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'studentCreditDetailInformationDiv'});
		$('#studentCreditDetailPopupDiv').append(cdiv);
	}
	
	var cdpdiv = $('#msdStudentCreditDetailPopupPanel');

	if (false == cdpdiv.jqxWindow('isOpen')) {
		cdpdiv.jqxWindow('open');
	}

	createStduentCreditDetailDiv(data);
}

function createStduentCreditDetailDiv(data) {

	var sfddiv = $('#studentCreditDetailInformationDiv');
	sfddiv.empty();

	sfddiv.append('<label style="margin-top:5px">Credit : </label>');
	var fcost = $('<input style="margin-top:5px; margin-left:35px; margin-botton:20px;"/>').attr({type:'text'});
	sfddiv.append(fcost);
	fcost.jqxInput({disabled:true, height: 20, width: 200, rtl:true, minLength:1, theme:getTheme() });
	fcost.jqxInput('val', '$ ' + data.credit);
	sfddiv.append('<br/>');
	
	sfddiv.append('<label style="margin-top:5px">Credit Date : </label>');
	var foname = $('<input style="margin-top:5px"/>').attr({type:'text'});
	sfddiv.append(foname);
	foname.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
	foname.jqxInput('val', data.creditDate);
	
	sfddiv.append('<br/>');
	sfddiv.append('<label style="margin-top:5px">Credit Note : </label>');
	sfddiv.append('<br/>');
	var fname = $('<input style="margin-top:5px; margin-left:5px"/>').attr({type:'text'});
	sfddiv.append(fname);
	fname.jqxInput({disabled:true, height: 20, width: 330, minLength:1, theme:getTheme() });
	fname.jqxInput('val', data.creditNote);
	
	sfddiv.append('<br/>');
	if (data.isConsumed == true) {
		sfddiv.append('<label style="margin-top:5px">Consumed at : </label>');
		var ptime = $('<input style="margin-top:5px;margin-left:5px;"/>').attr({type:'text'});
		sfddiv.append(ptime);
		ptime.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
		ptime.jqxInput('val', data.consumedDate);
		sfddiv.append('<br/>');
		
		var pnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text'});
		sfddiv.append(pnote);
		pnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		pnote.jqxInput('val', data.consumeNote);
	} else {
		var pnote = $('<input style="margin-top:5px;margin-left:5px;"/>').attr({type:'text'});
		sfddiv.append(pnote);
		pnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		pnote.jqxInput('val', "This Credit is not consume");
		pnote.css("color", "green");
	}
}