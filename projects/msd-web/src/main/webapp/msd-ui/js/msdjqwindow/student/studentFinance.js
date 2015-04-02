function showStudentFinanceInfo() {
	console.log(" In Show Student Finance Information ... ");
	var smp = $('#studentMainPanel');
	
	smp.empty();

	var sfbdiv = $('<div class="InnerDiv" style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid; height:40px;"/>').attr({id:'studentFinanceInfoDiv'});
	smp.append(sfbdiv);
	
	var sfidiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentFeeInfoDiv'});
	smp.append(sfidiv);
	
	var scidiv = $('<div style = "margin-left:5px; margin-right:10px; margin-top:5px; border:0px solid;"/>').attr({id:'studentCreditInfoDiv'});
	smp.append(scidiv);
	
	showStudentFinanceButtonPanel();
    setCurrentSemesterForStudentFinanceId(getCurrentSemester().id);
	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
}

function showStudentFinanceButtonPanel() {
	console.log(" show student finance button panel ");
	var sfbdiv = $('#studentFinanceInfoDiv');
	sfbdiv.empty();

	var scpdiv = $('<div style="border:0px solid;"/>').attr({id:'studentFinanceInfoDockPanel'});
	sfbdiv.append(scpdiv);

	var ddldiv = $('<div dock="left" style="margin-top:5px; border:0px solid  #ccc; height:20px; width:200px;"/>');
	var btndiv = $('<div dock="right" style="margin-top:5px; border:0px solid  #ccc; height:20px;"/>');
	scpdiv.append(ddldiv);
	scpdiv.append(btndiv);
	
	ddldiv.append('<label style="float:left; margin-top:5px; margin-left:5px">Semester : </label>');
	var sname = $('<div style="margin-top:2px; margin-left:5px"/>').attr({id:'ddlSemesterSearchNameForStudentFinance'});
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
	
	$(document).on('change', '#ddlSemesterSearchNameForStudentFinance', handleSemesterSearchNameDropdownForStudentFinanceChange);

	var sCredit = $('<input style="float:right; margin-top:2px; margin-right:5px"/>').attr({type:'text', id:'txtStudentCredit'});
	btndiv.append(sCredit);
	sCredit.jqxInput({placeHolder: "Credit", disabled:true, rtl:true, height: 20, width:100, minLength: 1, theme: getTheme() });	
	btndiv.append('<label style="float:right; margin-top:8px; margin-right:5px" > Credit : </label>');
	
	var sbalance = $('<input style="float:right; margin-top:2px; margin-right:10px"/>').attr({type:'text', id:'txtStudentBalance'});
	btndiv.append(sbalance);
	sbalance.jqxInput({placeHolder: "UnPaid", disabled:true, rtl:true, height: 20, width:100, minLength: 1, theme: getTheme() });	
	btndiv.append('<label style="float:right; margin-top:8px; margin-right:5px" > UnPaid : </label>');
	
	scpdiv.jqxDockPanel({height: 40});
	ajaxGetStudentFinanceBalance(getCurrentStudent().id, getStudentFinanceBalance);
}

function handleSemesterSearchNameDropdownForStudentFinanceChange(event) {
    var args = event.args;
    if (args) {
	    var item = args.item;

    	var label = item.label;
	    var value = item.value;
	    
	    setCurrentSemesterForStudentFinanceId(value);
		showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
		showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
    }
}

function getStudentFinanceBalance(response, request, settings){
	console.log(" get student finance balance ... ");
	if (404 == response.code) {
		console.log(" There is no balance for this student ... ");
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

function showStudentFeeInformationPanel(semesterid) {
	console.log(" show student Fee panel ");
	var sfidiv = $('#studentFeeInfoDiv');
	sfidiv.empty();

	var ctdiv = $('<div style="height:30px;" />').attr({id:'studentFeeInformationTitleDiv'});
	ctdiv.append('<label style="float:left; margin-top:10px; margin-right:5px;"><b>Student Fee Information </b></label>');
	
	var ccdiv = $('<div style="background:#e0e9f5;"/>').attr({id:'studentFeeInformationContentDiv'});
	sfidiv.append(ctdiv);
	sfidiv.append(ccdiv);

	ajaxGetStudentFeeByStudentIdSemesterId(getCurrentStudent().id, semesterid, getStudentFeeByStudentIdSemesterId);
}

function getStudentFeeByStudentIdSemesterId(response, request, settings){
	console.log(" get student fee ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no fee for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
		setStudentFeeList(data);
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

	// Create pop up add new Student fee panel
	var pdiv = $('<div/>').attr({id:'popupAddNewStudentFeeWindow'});
	ccdiv.append(pdiv);
	pdiv.append('<div >Add New Student Fee</div> <div id="popupAddNewStudentFeeDiv"></div>');
    pdiv.jqxWindow({
    	width: 500, height:310, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
	
	var sfgdiv = $('<div style="border:0px solid;"/>').attr({id:'studentFeeGrid'});
	ccdiv.append(sfgdiv);
	
	var source = {
		datafields:[
			{ name: 'id', type: 'int'},
			{ name: 'isPaid', type: 'bool'},
			{ name: 'isWaiver', type: 'bool'},
			{ name: 'feeName', type: 'string'},
			{ name: 'fee', type: 'number'},
//			{ name: 'paidFee', type: 'number'},
			{ name: 'feeNote', type: 'string'},
			{ name: 'feeTypeName', type: 'string'},
//			{ name: 'payTime', type: 'date'}
		],
		datatype:'json',
		localdata:data
	}
	
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var FeeCellsRenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
	    var column = sfgdiv.jqxGrid('getcolumn', columnfield);
        if (column.cellsformat != '') {
        	if ($.jqx.dataFormat) {
            	value = $.jqx.dataFormat.formatnumber(value, column.cellsformat);
        	}
        }
       	if (sfgdiv.jqxGrid('getrowdata', row).isPaid ||  sfgdiv.jqxGrid('getrowdata', row).isWaiver) {
           	return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: Green;">' + value + '</span>';
        } else {
           	return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: Red;">' + value + '</span>';
        }
    }

	var PaidFeeCellsRenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
	    var column = sfgdiv.jqxGrid('getcolumn', columnfield);
	    if (null != value && value == 0.0) 
	    	return '';
	    
        if (column.cellsformat != '') {
        	if ($.jqx.dataFormat) {
            	value = $.jqx.dataFormat.formatnumber(value, column.cellsformat);
        	}
        }
       	return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: Green;">' + value + '</span>';
    }

 	sfgdiv.on('rowselect', function (event) {
 		var rowitem = sfgdiv.jqxGrid('getrowdata',event.args.rowindex);	
		if (rowitem.isPaid || rowitem.isWaiver) {
			sfgdiv.jqxGrid('unselectrow', event.args.rowindex);
		}
	});
/* 
	sfgdiv.on('cellbeginedit', function (event) {
 		var rowIndexes = sfgdiv.jqxGrid('getselectedrowindexes');
		if (rowIndexes.indexOf(event.args.rowindex) < 0) {
			sfgdiv.jqxGrid('endcelledit', event.args.rowindex, "paidFee", true);
			sfgdiv.jqxGrid('endcelledit', event.args.rowindex, "payType", true);
		}
 	});
*/ 	
	sfgdiv.jqxGrid({
		theme: getTheme(),
		source:dataAdapter,
    	width: 610,
		editable: true,
		pageable: false,
	    autoHeight: true,
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
//			$("#popupStudentFeeEditWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
//	        createEditPopupPanel();
			$("#popupStudentFeePayWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createPayPopupPanel();
			$("#popupStudentFeeWaiveWindow").jqxWindow({ position: { x: parseInt(offset.left) + 100, y: parseInt(offset.top) - 20 } });
	        createWaivePopupPanel();
			$("#popupAddNewStudentFeeWindow").jqxWindow({ position: { x: parseInt(offset.left) - 50, y: parseInt(offset.top) - 30 } });
	        createAddNewStudentFeePopupWindow();
	        
	        sfgdiv.on('rowselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
//	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
//	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
				}
		        	
	        });
		        
	        sfgdiv.on('rowunselect', function (event) {
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				if (selectedIndex.length < 1) {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
//	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:true});
				} else {
			        $("#payStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
//	    		    $("#waiveStudentFeebtn").jqxButton({theme: getTheme(), disabled:false});
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
				var paytype = "";
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					if (null == row.paidFee || 0.0 == row.paidFee)
						totalFee += row.fee;
					else 
						totalFee += row.paidFee;
					if (null != row.payType && "" != row.payType) 
						paytype = row.payType;
					fidList += row.id + ",";
					if (row.isPaid || row.isWaiver) {
						alert('Please select one without paid or waived fee to process');
						return;
					}
				} 

				showPayPopupPanel(paytype, totalFee, getTotalUnConsumeCredit());
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

				showWaivePopupPanel(row.fee);
				$('#popupStudentFeeWaiveWindow').jqxWindow('open');
				
    	    });
        	$("#addStudentFeebtn").on('click', function () {
				console.log("Add student fee ... ");
				bindAddNewStudentFeePopupWindow(null);
				var feelistsource = {
					datafields:[
						{ name: 'id',   type: 'int'}, 
						{ name: 'label',  type: 'string'},
					],
					datatype:'json',
					localdata:getGeneralFeeList()
				}
				var feelistsourceadapter = new $.jqx.dataAdapter(feelistsource);
	
				$('#ddlGeneralFee').jqxDropDownList({source:feelistsourceadapter, displayMember: "label", valueMember: "id"});

				$('#ddlGeneralFee').jqxDropDownList('selectIndex',-1);
				
				$("#popupAddNewStudentFeeWindow").jqxWindow('open');
    	    });
            $('#btnCancelAddNewStudentFee').on('click', function () {
            	console.log(" Cancel add New Student Fee ... ");
				$("#popupAddNewStudentFeeWindow").jqxWindow('hide');
				bindAddNewStudentFeePopupWindow(null);
            });
            $('#btnAddNewStudentFee').on('click', function () {
				var fnote = $('#txtNewStudentFeeNote').val();
				var tcost = $('#txtNewStudentFeeTotalCost').val();
				
				if (null == fnote || fnote.length < 1) {
					alert("please provide fee note ");
					return;
				}
				if (null == tcost || tcost == 0) {
					alert("please check the total fee ");
					return;
				}
				if (null != $('#txtStudentFeeTimes') && 1 != $('#txtStudentFeeTimes').val()) {
					fnote += ' ' + $('#txtStudentFeeTimes').val() + ' times class fee';
				}
				if (null != $('#txtStudentFeeDiscount') && 0 != $('#txtStudentFeeDiscount').val()) {
					fnote += ' ' + $('#txtStudentFeeDiscount').val() + '% discount';	
				}
				
				$("#popupAddNewStudentFeeWindow").jqxWindow('hide');

				var row = $('#ddlGeneralFee').jqxDropDownList('getSelectedItem');
				
				var sid = getCurrentStudent().id;
				var semester = $('#ddlSemesterSearchNameForStudentFinance').jqxDropDownList('getSelectedItem');
				
				ajaxAddGeneralFeeToStudentFee(sid, row.value, fnote, tcost, semester.value, addGeneralFeeToStuentFee);
				
            });
    	    
    	    $('#btnCancelPayStudentFee').on('click', function () {
				$('#popupStudentFeePayWindow').jqxWindow('hide');
				showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
				showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
    	    });
    	    $('#btnCancelWaiveStudentFee').on('click', function() {
				$('#popupStudentFeeWaiveWindow').jqxWindow('hide');
    	    });
    	    $('#btnPayStudentFee').on('click', function () {
    	    	console.log(" Pay student fee click ... ");
				var selectedIndex = sfgdiv.jqxGrid('getselectedrowindexes');
				var totalfee = 0.0;
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					if (null == row.paidFee || 0.0 == row.paidFee)
						totalfee += row.fee;
					else 
						totalfee += row.paidFee;
				} 
				var tfee = $('#txtTotalPayCost').jqxNumberInput('val');	    	
				if (tfee != totalfee) {
					alert(" total fee are not match ... ");
					return;
				}

				$('#popupStudentFeePayWindow').jqxWindow('hide');
				
				var paytype = $('#txtPayType').jqxInput('val');
				if (null == paytype || paytype.length == 0) {
					alert(" Please provide pay type ... ");
					return;
				}
				var paytime = $('#paydatetimediv').jqxDateTimeInput('getDate');
				var paynote = $('#txtPayNote1').jqxInput('val') + ' ' + $('#txtPayNote2').jqxInput('val');
				var dtos = [];
				for(i = 0; i < selectedIndex.length; i++) {
					var row = sfgdiv.jqxGrid('getrowdata', selectedIndex[i]);
					var sid = getCurrentStudent().id;
					var feeid = row.id;
					var paidFee = row.fee;
					var fee = row.fee;
					if (0.0 != row.paidFee)
						paidFee = row.paidFee;
						
					var dto = {"msdStudentId":sid, "studentFeeId":feeid, "payType":paytype,"payTime":getFormatDateToYYYYMMDDHHMMSS(paytime),"payNote":paynote,"fee":fee.toString(),"paidFee":paidFee.toString()};
					dtos.push(dto);
				} 
				ajaxPayStudentFeeByDtoList(dtos, payStudentFees);
				
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
			{ text: 'ID', datafield:'id', hidden:'true'}
			,{ text: 'IsPaid', datafield:'isPaid', hidden:'true'}
			,{ text: 'IsWaiver', datafield:'isWaiver', hidden:'true'}
        	,{ text: 'Name', datafield: 'feeName', width:100, editable: false, }
        	,{ text: 'Fee', datafield: 'fee', width:80, cellsalign: 'right', editable: false, cellsformat: 'c2', cellsrenderer: FeeCellsRenderer }
//        	,{ text: 'Paid Fee', datafield: 'paidFee', width:80, editable: true, cellsalign: 'right', cellsformat: 'c2', cellsrenderer: PaidFeeCellsRenderer}
        	,{ text: 'FeeTypeName', datafield: 'feeTypeName', editable: false, hidden:'true' }
    	    ,{ text: 'FeeNote', datafield: 'feeNote', editable: false }
			,{ text: 'Edit', datafield: 'Edit',width: 65,  columntype:'button', cellsrenderer:function(row, columnfield, value, defaulthtml, columnproperties, record){
					return 'Edit';
				}, buttonclick:function(row) {
					var id = $('#studentFeeGrid').jqxGrid('getcellvalue', row, 'id');
					setCurrentWorkingStudentFee($('#studentFeeGrid').jqxGrid('getrowdata', row));
					ajaxGetStudentFeeDetailById(id, getStudentFeeDetailByIdForEditInStudentTab);
				}
			}
			,{ text: 'Pay', datafield: 'Pay',width: 65,  columntype:'button', cellsrenderer:function(){
					return "Payment";
				}, buttonclick:function(row) {
					var id = $('#studentFeeGrid').jqxGrid('getcellvalue', row, 'id');
					setCurrentWorkingStudentFee($('#studentFeeGrid').jqxGrid('getrowdata', row));
					ShowCreateStudentFeePaymentWindow();
				}
			}
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

function getStudentFeeDetailByIdForEditInStudentTab(response, request, settings){
	console.log(" get student fee detail for edit ... ");
	if (404 == response.code) {
		console.log(" There is no fee for this student ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		showEditStudentFeePopup(data);
	} else {
		alert("error to find student fee ... ");
	}
}

function showEditStudentFeePopup(data) {
	console.log(" this will pop up window to edit student fee ");
	
	if (0 == $('#msdEditStudentFeePopupPanel').length) {
	
	    $('#studentMainPanel').append('<div id="msdEditStudentFeePopupPanel" />');

		var sfpdiv = $('#msdEditStudentFeePopupPanel');

		sfpdiv.append('<div >Edit Student Fee </div> <div id="studentFeeEditPopupDiv"></div>');
		sfpdiv.jqxWindow({showCollapseButton: false, isModal: true, draggable:true,  resizable: false, height: 400, width: 400, theme: theme, position: { x: 350, y: 150}});
	
		var sfepdiv = $('#studentFeeEditPopupDiv');
		var cdiv = $('<div style = "margin-left:10px; margin-top:10px; border:1px solid;"/>').attr({id:'studentFeeEditDiv'});
		sfepdiv.append(cdiv);
	}
	
	var sfpdiv = $('#msdEditStudentFeePopupPanel');

	if (false == sfpdiv.jqxWindow('isOpen')) {
		sfpdiv.jqxWindow('open');
	}

	createStduentEditDiv(data);
}

function createStduentEditDiv(data) {
	var sfediv = $('#studentFeeEditDiv');
	sfediv.empty();
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	sfediv.append(tdiv);
	
	tdiv.append('<label stype="">Fee Object Name: </label>');
	var foname = $('<input style="margin-left:5px">').attr({type:'text'});
	tdiv.append(foname);
	foname.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
	foname.jqxInput('val', data.feeObjectName);
	
	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	sfediv.append(tdiv);
	
	tdiv.append('<label style="float:left; margin-top:2px;">Select Fee :</label>');
	var feelist = $('<div style="margin-left:5px"/>').attr({id:'ddlGeneralFeeForEditStudentFee'});
	tdiv.append(feelist);
	feelist.jqxDropDownList({placeHolder: "Please Select Fee", height: 20, width: 250, dropDownHeight: 150, theme: getTheme()});

	var feelistsource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'label',  type: 'string'},
		],
		datatype:'json',
		localdata:getGeneralClassFeeList()
	}
	var feelistsourceadapter = new $.jqx.dataAdapter(feelistsource);
	
	feelist.jqxDropDownList({source:feelistsourceadapter, displayMember: "label", valueMember: "id"});

	var tdiv = $('<div style="margin-top:5px; border:0px solid;"/>');
	sfediv.append(tdiv);
	
	tdiv.append('<label style="margin-top:0px">Fee Name : </label>');
	var fname = $('<input style="margin-top:0px; margin-left:47px"/>').attr({type:'text', id:'txtEditStudentFeeName'});
	tdiv.append(fname);
	fname.jqxInput({rtl: true, disabled:true, height: 20, width: 200, minLength:1, theme:getTheme() });
	fname.jqxInput('val', data.feeName);
	
	var tdiv = $('<div style="float:left; margin-top:5px; border:0px solid;"/>');
	sfediv.append(tdiv);
	
	tdiv.append('<label style="float:left; margin-top:2px;">Discount:</label>');
	var discount = $('<div style="float:right; margin-left:65px"/>').attr({id:'txtEditStudentFeeDiscount'});
	tdiv.append(discount);
	discount.jqxNumberInput({ width: '200px', height: '20px', min: 0, max: 99, symbolPosition: 'right', spinButtons: false, digits:2, symbol: '%', decimalDigits: 0, theme: getTheme()});

	var tdiv = $('<div style="float:left;margin-top:5px; border:0px solid;"/>');
	sfediv.append(tdiv);

	tdiv.append('<label style="float:left; margin-top:0px">Fee : </label>');
	var fcost = $('<div style="float:right;margin-left:95px"/>').attr({id:'txtEditStudentFee'});
	tdiv.append(fcost);
	fcost.jqxNumberInput({ width: '200px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});
	fcost.jqxNumberInput('val', null != data ? data.fee : 0);
	

		var tdiv = $('<div style="margin-top:0px; border:0px solid;"/>');
		sfediv.append(tdiv);
	
		var fnote = $('<input style="margin-top:5px;margin-left:0px;"/>').attr({type:'text'});
		tdiv.append(fnote);
		fnote.jqxInput({ disabled:true, height: 20, width:330, minLength:1, theme:getTheme() });
		fnote.jqxInput('val', data.feeNote);
		
	$('#ddlGeneralFeeForEditStudentFee').on('change', function (event) {     
    	var args = event.args;
	    if (args) {

	    	var index = args.index;
    		var item = args.item;

    		var id = item.value;
	    	var label = item.label;
	    	var feerecord = getGeneralFeeById(id);
			$('#txtEditStudentFeeName').jqxInput('val', null != feerecord ? feerecord.feeName : '');
			$('#txtEditStudentFee').jqxNumberInput('val', null != feerecord ? feerecord.cost : 0);
		} 
	});
	
	$('#txtEditStudentFeeDiscount').on('change', function () 
	{
	   	var total = $('#txtEditStudentFee').val()*(1 - $('#txtEditStudentFeeDiscount').val()/100);
		$('#txtEditStudentFee').jqxNumberInput('val', total);
	}); 

	
	// action button
	var tdiv = $('<div style="margin-top:15px; border:0px solid;" align="right" />');
	sfediv.append(tdiv);
	var btnEditStudentFee = $('<input style="margin-right:10px;"/>').attr({type:'button', id:'btnEditStudentFee', value:'Edit'});
	tdiv.append(btnEditStudentFee);
	btnEditStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
    btnEditStudentFee.on('click', function () {
		var row = $('#ddlGeneralFeeForEditStudentFee').jqxDropDownList('getSelectedItem');
		var fee = $('#txtEditStudentFee').jqxNumberInput('val')
		if (null == fee || fee == 0) {
			alert("Please provide fee");
			return;
		}
		if (null == row || row.value < 0) {
			alert("Please select general class fee from list");
			return;
		}
				
		$("#msdEditStudentFeePopupPanel").jqxWindow('hide');
		var sfid = getCurrentWorkingStudentFee().id;

		ajaxUpdateGeneralClassFeeToStudentFee(sfid, row.value, fee, updateGeneralClassFeeToStudentFee);
    	
    });
	
	var btnCancelEditStudentFee = $('<input style="margin-right:20px;"/>').attr({type:'button', id:'btnCancelEditStudentFee', value:'Cancel'});
	tdiv.append(btnCancelEditStudentFee);
	btnCancelEditStudentFee.jqxButton({ width: '80', height: 20, theme: getTheme() });
    btnCancelEditStudentFee.on('click', function () {
		$('#msdEditStudentFeePopupPanel').jqxWindow('hide');
    });
	
	if (data.feeName != 'General Class Fee' && data.fee != 0) {
		feelist.jqxDropDownList({disabled:true});
		discount.jqxNumberInput({disabled:true});
		fcost.jqxInput({disabled:true});
		btnEditStudentFee.jqxButton({disabled:true});
	}
}

function updateGeneralClassFeeToStudentFee(response, request, settings) {
	console.log(" update student fee for general class ... ");
	if (404 == response.code) {
		alert(" Can't update student fee for general class ... ");
	} else if (201 == response.code) {
		console.log(" successfully update student fee for general class ... ");
	} else {
		alert("error update student fee for general class ... ");
	}

	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
}

function ShowCreateStudentFeePaymentWindow() {
	console.log(" this will pop up window to create student fee payment record ");
	
	if (0 == $('#createStudentFeePaymentPopupPanel').length) {
	
	    $('#studentMainPanel').append('<div id="createStudentFeePaymentPopupPanel" />');

		var sfpdiv = $('#createStudentFeePaymentPopupPanel');

		sfpdiv.append('<div >Manage Student Fee Payment</div> <div id="manageStudentFeePaymentPopupDiv"></div>');
		sfpdiv.jqxWindow({showCollapseButton: false, isModal: true, draggable:true,  resizable: false, height: 600, width: 610, theme: theme, position: { x: 350, y: 150}});
	
		var sfepdiv = $('#manageStudentFeePaymentPopupDiv');
		var cdiv = $('<div style = "margin-top:10px; border:0px solid;"/>').attr({id:'studentFeePaymentDiv'});
		sfepdiv.append(cdiv);
	}
	
	var sfpdiv = $('#createStudentFeePaymentPopupPanel');

	if (false == sfpdiv.jqxWindow('isOpen')) {
		sfpdiv.jqxWindow('open');
	}

	var sfid = getCurrentWorkingStudentFee().id
	ajaxGetStudentFeePaymentInfo(sfid, getStudentFeePaymentInfo);
}

function getStudentFeePaymentInfo(response, request, settings){
	console.log(" get student fee payment info ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no student fee payment ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
	} else {
		alert("error to find student fee payment ... ");
	}
	
	createStudentFeePaymentWindow(data);
}

function createStudentFeePaymentWindow(payments) {
	console.log(" create student fee payment manage window ");
	var sfpdiv = $('#studentFeePaymentDiv');
	sfpdiv.empty();	
	
	var data = getCurrentWorkingStudentFee();
	
	sfpdiv.append('<label style="margin-top:5px">Fee Name : </label>');
	var fname = $('<input style="margin-top:5px; margin-left:47px"/>').attr({type:'text'});
	sfpdiv.append(fname);
	fname.jqxInput({rtl: true, disabled:true, height: 20, width: 200, minLength:1, theme:getTheme() });
	fname.jqxInput('val', data.feeName);
	
	sfpdiv.append('<br/>');
	sfpdiv.append('<label style="margin-top:5px">Fee Type : </label>');
	var ftype = $('<input style="margin-top:5px; margin-left:53px"/>').attr({type:'text'});
	sfpdiv.append(ftype);
	ftype.jqxInput({rtl: true, disabled:true, height: 20, width:200, minLength:1, theme:getTheme() });
	ftype.jqxInput('val', data.feeTypeName);
	
	sfpdiv.append('<br/>');
	sfpdiv.append('<label style="margin-top:5px">Fee : </label>');
	var fcost = $('<input style="margin-top:5px; margin-left:90px; margin-botton:20px;"/>').attr({type:'text'});
	sfpdiv.append(fcost);
	fcost.jqxInput({disabled:true, height: 20, width: 200, rtl:true, minLength:1, theme:getTheme() });
	fcost.jqxInput('val', '$ ' + data.fee);
	
	sfpdiv.append('<br/>');
	var cdiv = $('<div style = "margin-top:0px; border:0px solid;"/>').attr({id:'createStudentFeePaymentDiv'});
	sfpdiv.append(cdiv);
	showPaymentPanel(payments);
}
/*
function createPaymentPanel(data) {
	var csfpdiv = $('#createStudentFeePaymentDiv');
	csfpdiv.empty();
	
	if (data.feeTypeName == 'General Class Fee') {
		
	}
}
*/
function showPaymentPanel(data) {
	var csfpdiv = $('#createStudentFeePaymentDiv');
	csfpdiv.empty();
	csfpdiv.append('<br/>');

	var sfpgdiv = $('<div style="border:0px solid;"/>').attr({id:'studentFeePaymentGrid'});	
	csfpdiv.append(sfpgdiv);
/*	
	var pdiv = $('<div/>').attr({id:'addClassFeePopupWindow'});
	fidiv.append(pdiv);
	$('#addClassFeePopupWindow').append('<div >Add Class Fee</div> <div style="height:280px; width:350px;" id="addClassFeediv"></div>');

    var offset = cfdiv.offset();
    $("#addClassFeePopupWindow").jqxWindow({
    	width: 500, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01, theme:getTheme()
    });
*/
	var source = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'msdStudentFeeId', 	type: 'int'},
			{ name: 'payNote',  type: 'string'},
			{ name: 'payType', 	type: 'string'},
			{ name: 'fee', type: 'number'},
			{ name: 'payTime', type: 'date'},
			{ name: 'payFee', type: 'number'}
		],
		datatype:'json',
		localdata:data
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	
    sfpgdiv.jqxGrid({
		theme: getTheme(),
		width: 600,
	    source: dataAdapter,
                
    	pageable: false,
	    editable: true,
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

        	var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%; margin-top:5px'> <b> Student Fee Payment</b></div>");
	        var buttonTemplate = "<div style='float: right; padding: 1px; margin: 1px;'><div style='width: 16px; height: 16px;'></div></div>";
    	    var addButton = $(buttonTemplate);
        	var deleteButton = $(buttonTemplate);
        	var editButton = $(buttonTemplate);
	        container.append(addButton);
    	    container.append(deleteButton);
    	    container.append(editButton);
        	toolBar.append(container);
	        addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
    	    addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
        	addButton.jqxTooltip({ position: 'bottom', content: "Add"});
	        deleteButton.jqxButton({ cursor: "pointer", disabled: false, enableDefault: false,  height: 25, width: 25 });
    	    deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
        	deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
	        editButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
    	    editButton.find('div:first').addClass(toTheme('jqx-icon-edit'));
        	editButton.jqxTooltip({ position: 'bottom', content: "Edit"});
        	
	        var rowIndex = null;

    	    addButton.click(function (event) {
        		if (!addButton.jqxButton('disabled')) {
	                var row = {};

    	            row["id"] = null;
        	        row["msdStudentFeeId"] = getCurrentWorkingStudentFee().id;
            	    row["payNote"] = null;
                	row["payType"] = null;
	                row["fee"] = null;
    	            row["payTime"] = null;
        	        row["payFee"] = null;
                    var commit = sfpgdiv.jqxGrid('addrow', null, row);
  	            }
    	    });
        	deleteButton.click(function () {
    	    	console.log("delete click");
                var selectedrowindex = sfpgdiv.jqxGrid('getselectedrowindex');
                var rowscount = sfpgdiv.jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
	                var id = sfpgdiv.jqxGrid('getrowid', selectedrowindex);
                    var commit = sfpgdiv.jqxGrid('deleterow', id);
                }
        	});
        	editButton.click(function () {
    	    	console.log("edit click");
        	});
	    },
    	columns: [
			{text: 'Student Fee ID', datafield:'msdStudentFeeId', hidden:'true'}
			,{text: 'ID', datafield:'id', hidden:'true'}
			,{text: 'Fee', datafield: 'fee', width:80, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
			,{text: 'Pay Fee', datafield: 'payFee', width:80, cellsAlign: 'right', align: 'right', cellsFormat: 'c2'}
			,{text: 'Pay Type', datafield: 'payType', width: 80}
			,{text: 'Pay Time', datafield: 'payTime', width:110}
			,{text: 'Pay Note', datafield: 'payNote', width:250}
		]
    });

	csfpdiv.append('<br/>');
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

function showWaivePopupPanel(totalcost) {
	$('#txtTotalWaiveCost').jqxNumberInput('val', totalcost);
	$('#waivedatetimediv').jqxDateTimeInput('setDate', new Date());
	$('#txtWaiveNote1').jqxInput('value', null);
	$('#txtWaiveNote2').jqxInput('value', null);
}

function showPayPopupPanel(paytype, totalcost, totalCredit) {
	if (null != totalCredit)
		totalcost -= totalCredit;
		
	$('#txtTotalPayCost').jqxNumberInput('val', totalcost);
	$('#txtPayType').jqxInput('val', paytype);
	$('#paydatetimediv').jqxDateTimeInput('setDate', new Date());
	if (null != totalCredit && 0 != totalCredit)
		$('#txtPayNote1').jqxInput('value', 'This Payment include credit : ' + totalCredit);
	else 
		$('#txtPayNote1').jqxInput('value', null);
	$('#txtPayNote2').jqxInput('value', null);
}

function payStudentFees(response, request, settings){
	console.log(" return from pay student fees ... ");
	if (404 == response.code) {
		console.log(" Error to pay student fees ... ");
	} else if (302 == response.code) {
		console.log("successfully pay student fees ... ");
	} else {
		alert("error to pay student fees ... ");
	}
	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
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
	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
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
	fcost.jqxInput('val', '$ ' + data.fee);
	
	sfddiv.append('<br/>');
	sfddiv.append('<label style="margin-top:5px">Actual Paid : </label>');
	var apaid = $('<input style="margin-top:5px; margin-left:40px; margin-botton:20px;"/>').attr({type:'text'});
	sfddiv.append(apaid);
	apaid.jqxInput({disabled:true, height: 20, width: 200, rtl:true, minLength:1, theme:getTheme() });
	apaid.jqxInput('val', '$ ' + data.paidFee);
	
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

function createAddNewStudentFeePopupWindow() {
	var psfdiv = $('#popupAddNewStudentFeeDiv');
	psfdiv.empty();

	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Select Semester :</label>');
	var semesterlist = $('<div style="margin-left:5px"/>').attr({id:'ddlSemesterForAddStudentFee'});
	tdiv.append(semesterlist);
	semesterlist.jqxDropDownList({placeHolder: "Please Select Semester", height: 20, width: 300, dropDownHeight: 150, theme: getTheme()});

	var semesterlistsource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'name',  type: 'string'}
		],
		datatype:'json',
		localdata:getSemesterList()
	}
	var semesterlistsourceadapter = new $.jqx.dataAdapter(semesterlistsource);
	
	semesterlist.jqxDropDownList({source:semesterlistsourceadapter, displayMember: "name", valueMember: "id"});

	var semester = $('#ddlSemesterSearchNameForStudentFinance').jqxDropDownList('getSelectedItem');
	semesterlist.jqxDropDownList('selectItem',semester);
	semesterlist.jqxDropDownList({ disabled: true });
	
	var tdiv = $('<div style="float:right; margin-top:10px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Select Fee :</label>');
	var feelist = $('<div style="margin-left:5px"/>').attr({id:'ddlGeneralFee'});
	tdiv.append(feelist);
	feelist.jqxDropDownList({placeHolder: "Please Select Fee", height: 20, width: 300, dropDownHeight: 150, theme: getTheme()});

	var feelistsource = {
		datafields:[
			{ name: 'id',   type: 'int'}, 
			{ name: 'label',  type: 'string'},
		],
		datatype:'json',
		localdata:getGeneralFeeList()
	}
	var feelistsourceadapter = new $.jqx.dataAdapter(feelistsource);
	
	feelist.jqxDropDownList({source:feelistsourceadapter, displayMember: "label", valueMember: "id"});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="margin-top:2px;">New Fee Name :</label>');
	var name = $('<input/>').attr({type:'text',id:'txtNewStudentFeeName'});
	tdiv.append(name);
	name.jqxInput({placeHolder: "Enter Fee Name", height: 20, width: 300, minLength: 1, theme: getTheme() });
	
	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">New Fee:</label>');
	var cost = $('<div/>').attr({id:'txtNewStudentFeeCost'});
	tdiv.append(cost);
	cost.jqxNumberInput({ width: '300px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Class Times:</label>');
	var times = $('<div/>').attr({id:'txtStudentFeeTimes'});
	tdiv.append(times);
	times.jqxNumberInput({ width: '300px', height: '20px', min: 1, max: 999, digits:3, decimalDigits: 0, spinButtons: true, theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Discount:</label>');
	var discount = $('<div/>').attr({id:'txtStudentFeeDiscount'});
	tdiv.append(discount);
	discount.jqxNumberInput({ width: '300px', height: '20px', min: 0, max: 99, symbolPosition: 'right', spinButtons: true, digits:2, symbol: '%', decimalDigits: 0, theme: getTheme()});

	var tdiv = $('<div style="float:right; margin-top:5px; border:0px solid;"/>');
	psfdiv.append(tdiv);
	tdiv.append('<label style="float:left; margin-top:2px;">Total Fee:</label>');
	var totalFee = $('<div/>').attr({id:'txtNewStudentFeeTotalCost'});
	tdiv.append(totalFee);
	totalFee.jqxNumberInput({ width: '300px', height: '20px', min: 0, max: 9999, digits:4, symbol: '$', theme: getTheme()});

	var fnote = $('<input style="float:right; margin-top:5px;margin-left:0px;"/>').attr({type:'text', id:'txtNewStudentFeeNote'});
	psfdiv.append(fnote);
	fnote.jqxInput({placeHolder: "Enter Fee Note", height: 20, width:450, minLength:1, theme:getTheme() });

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
	
	$('#ddlGeneralFee').on('change', function (event) {     
    	var args = event.args;
	    if (args) {

	    	var index = args.index;
    		var item = args.item;

    		var id = item.value;
	    	var label = item.label;
	    	var feerecord = getGeneralFeeById(id);
	    	bindAddNewStudentFeePopupWindow(feerecord);
		} 
	});
	
	$('#txtStudentFeeTimes').on('change', function () 
	{
    	updateTotalNewStudentFee();
	}); 

	$('#txtStudentFeeDiscount').on('change', function () 
	{
    	updateTotalNewStudentFee();
	}); 
}

function updateTotalNewStudentFee() {
   	var total = $('#txtNewStudentFeeCost').val() * $('#txtStudentFeeTimes').val()*(1 - $('#txtStudentFeeDiscount').val()/100);
	$('#txtNewStudentFeeTotalCost').jqxNumberInput('val', total);
}

function bindAddNewStudentFeePopupWindow(data) {
	$('#txtNewStudentFeeName').jqxInput('val', null != data ? data.feeName : '');
	$('#txtNewStudentFeeCost').jqxNumberInput('val', null != data ? data.cost : 0);
	$('#txtStudentFeeTimes').jqxNumberInput('val', 1);
	$('#txtStudentFeeDiscount').jqxNumberInput('val', 0);
	$('#txtNewStudentFeeTotalCost').jqxNumberInput('val', null != data ? data.cost * $('#txtStudentFeeTimes').val()*(1 - $('#txtStudentFeeDiscount').val()) : 0);
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

	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
}

function showStudentCreditInformationPanel(semesterid) {
	console.log(" show student Credit panel ");
	var scidiv = $('#studentCreditInfoDiv');
	scidiv.empty();

	var ctdiv = $('<div style="height:30px;" />').attr({id:'studentCreditInformationTitleDiv'});
	ctdiv.append('<label style="float:left; margin-top:10px; margin-right:5px;"><b>Student Credit Information </b></label>');
	scidiv.append(ctdiv);

	var ccdiv = $('<div style="background:#e0e9f5;"/>').attr({id:'studentCreditInformationContentDiv'});
	scidiv.append(ccdiv);

	ajaxGetStudentCreditByStudentIdSemesterId(getCurrentStudent().id, semesterid, getStudentCreditByStudentIdSemesterId);
}

function getStudentCreditByStudentIdSemesterId(response, request, settings){
	console.log(" get student credit ... ");
	var data = null;
	if (404 == response.code) {
		console.log(" There is no credit for this student ... ");
	} else if (302 == response.code) {
		data = $.parseJSON(response.result);
		setTotalUnConsumeCredit(data);
		setStudentCreditList(data);
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
		pageable: false,
	    autoHeight: true,
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
	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
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
	showStudentFeeInformationPanel(getCurrentSemesterForStudentFinanceId());
	showStudentCreditInformationPanel(getCurrentSemesterForStudentFinanceId());
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

var currentWorkingStudentFee;
function setCurrentWorkingStudentFee(data) {
	currentWorkingStudentFee = data;
}
function getCurrentWorkingStudentFee() {
	return currentWorkingStudentFee;
}

var generalFeeList;
function createDropDownGeneralGeeList() {
	var data = getAllGeneralFee();
	var tempList = [];
	for (index in data) {
		if (data[index].feeTypeName != 'Private Class Fee' && data[index].feeTypeName != 'General Class Fee')
			tempList.push({id:data[index].id, label:('$ '  + data[index].cost + ' -- ' + data[index].feeName)});
	}
	
	generalFeeList = tempList;
}
function getGeneralFeeList() {
	createDropDownGeneralGeeList();

	return generalFeeList;
}

var generalClassFeeList;
function createDropDownGeneeralClassFeeList() {
	var data = getAllGeneralFee();
	var tempList = [];
	for (index in data) {
		if (data[index].feeTypeName == 'General Class Fee' && data[index].cost != 0)
			tempList.push({id:data[index].id, label:('$ '  + data[index].cost + ' -- ' + data[index].feeName)});
	}
	
	generalClassFeeList = tempList;
}

function getGeneralClassFeeList() {
	createDropDownGeneeralClassFeeList();
	
	return generalClassFeeList;
}

function getGeneralFeeById(id) {
	var data = getAllGeneralFee();
	for (index in data) {
		if (data[index].id == id)
			return data[index];
	}
}

var studentFeeList
function getStudentFeeList() {
	return studentFeeList;
}
function setStudentFeeList(data) {
	studentFeeList = data;
}

var studentCreditList
function getStudentCreditList() {
	return studentCreditList;
}
function setStudentCreditList(data) {
	studentCreditList = data;
}

var currentSemesterForStudentFinanceId;
function setCurrentSemesterForStudentFinanceId(data) {
	currentSemesterForStudentFinanceId = data;
}
function getCurrentSemesterForStudentFinanceId() {
	return currentSemesterForStudentFinanceId;
}

var totalUnConsumeCredit
function setTotalUnConsumeCredit(data) {
	var tCredit = 0.0;
	for (var i in data) {
		if (!(data[i].isConsumed) && data[i].isActive)
			tCredit += data[i].credit;
	}
	totalUnConsumeCredit = tCredit;
}
function getTotalUnConsumeCredit() {
	return totalUnConsumeCredit;
}
