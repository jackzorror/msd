function handleClassTabEvents() {
	console.log(" setup class tab event handle ...");
	$(document).on('click', '#btnClassSearch', handleClassSearch);
	
	$(document).on('click', '#btnClassAdd', handleClassAdd);
};

function initClassTab() {
	console.log(" init class tab from diff file ... ");
	
	$('#msdclassdiv').empty();
	
	var searchdiv=$('<div id="classSearch"></div>');
	var infodiv=$('<div id="classinformation"></div>');
	var adddiv=$('<div id="classAdd"></div>');
	$("#msdclassdiv").append(searchdiv);
	$("#msdclassdiv").append(infodiv);
	$("#msdclassdiv").append(adddiv);
	
	$("#classSearch").append("Please input class name to Search or click Add button to add new class");
	$("#classSearch").append("<br />");
	var txtname = $('<input/>').attr({ type: 'text', id:"txtClassSearchName"});
	$("#classSearch").append(txtname);

	var btnsearch = $('<input/>').attr({ type: 'button', id:"btnClassSearch", value:"Search"});
	$("#classSearch").append(btnsearch);
	var btnadd = $('<input/>').attr({ type: 'button', id:'btnClassAdd', value:'Add'});
	$('#classSearch').append(btnadd);
};

function handleClassSearch() {
	console.log(" class search button click ... ");
};
		
function handleClassAdd() {
	console.log(" class add button click ...");
}