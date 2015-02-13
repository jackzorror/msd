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
	abutton.jqxButton({ width: '100', theme: getTheme() });
	
	var fbutton = $('<input style="margin-top:10px" />').attr({type:'button', id:'btnFinanceAdmin', value:'Finance'});
	btnholddiv.append(fbutton);
	fbutton.jqxButton({ width: '100', theme: getTheme() });
	
	var mbutton = $('<input style="margin-top:10px" />').attr({type:'button', id:'btnMiscAdmin', value:'Misc'});
	btnholddiv.append(mbutton);
	mbutton.jqxButton({ width: '100', theme: getTheme() });
	
	
/*	
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
*/

	addAdminTabsEventListeners();	
};

function addAdminTabsEventListeners() {
	$(document).on('click', '#btnStudentAdmin', handleStudentAdminClick);
	$(document).on('click', '#btnClassAdmin', handleClassAdminClick);
	$(document).on('click', '#btnFinanceAdmin', handleFinanceAdminClick);
	$(document).on('click', '#btnMiscAdmin', handleMiscAdminClick);
}

function handleMiscAdminClick() {
	console.log(' in Misc admin click ... ');
	$('#adminMainPanel').empty();
	showMiscAdminPanel();
}

function handleFinanceAdminClick() {
	console.log(' in Finance admin click ... ');
	$('#adminMainPanel').empty();
	showFinanceAdminPanel();
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
	$('#adminMainPanel').empty();
	showAdminStudentPanel();
}