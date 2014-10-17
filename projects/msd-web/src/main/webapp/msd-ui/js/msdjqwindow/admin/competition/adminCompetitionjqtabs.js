function addCompetitionAdminTabsEventListeners() {
//	$(document).on('click', '#btnStudentAdmin', handleStudentAdminClick);

//	$(document).on('keypress', '#ddlStudentAdminClassSearchName', handleStudentAdminClassSearchNameKeypress);
}
function onCompetitionDropDownButtonSelect(event) {
	var args = event.args;
    var item = $('#btnCompetitionAdminTree').jqxTree('getItem', args.element);
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + item.label + '</div>';
    $("#btnCompetitionAdmin").jqxDropDownButton('setContent', dropDownContent);

	$('#adminMainPanel').empty();
	if (item.label == 'YAGP') 
		showYAGPCompetitionPanel();
	else if (item.label == 'ShowStopper')
		showShowStopper();
	else if (item.label == 'IDC')
		showIDC();
	else if (item.label == 'ADC/ABC')
		showADCABC();
	else
		initialMainPanel();
	
}

function showShowStopper() {
	console.log(" in Show ShowStopper Competition ... ");
	$('#adminMainPanel').empty();

	$('#adminMainPanel').append('<label> This page will show Show Stopper information </label>');
}

function showIDC() {
	console.log(" in Show IDC Competition ... ");
	$('#adminMainPanel').empty();

	$('#adminMainPanel').append('<label> This page will show IDC information </label>');
}

function showADCABC() {
	console.log(" in Show ADC/ABC Competition ... ");
	$('#adminMainPanel').empty();

	$('#adminMainPanel').append('<label> This page will show ADC/ABC information </label>');
}

function initialMainPanel() {
	console.log(" in Show YAGE Competition ... ");
	$('#adminMainPanel').empty();

	$('#adminMainPanel').append('<label> This page will show some competition information </label>');
}

