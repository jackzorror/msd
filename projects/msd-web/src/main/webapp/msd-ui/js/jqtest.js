function runjqtestdiv() {

	var cdiv = $('<div class="InnerDiv" style = "margin-left:10px; margin-top:10px; border:0px solid;"/>').attr({id:'classInformationdiv'});
	$('#jqtestdiv').append(cdiv);
	


	$('#classInformationdiv').append('<label style="margin-left:10px; margin-top:40px;"><b>Class Information ... </b></label>');

	var savebtn = $('<input style="float:right; margin-top:5px;margin-right:5px"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	$('#classInformationdiv').append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="float:right; margin-top:5px; margin-right:10px;"/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	$('#classInformationdiv').append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });

	$('#classInformationdiv').append('<br />');
	
	
	$('#classInformationdiv').append('<label style="margin-top:10px;"> Class Name : </label>');
	var cname = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtClassName'});
	$('#classInformationdiv').append(cname);
	$('#txtClassName').jqxInput({placeHolder: "Class Name", height: 20, width:100, minLength: 1, theme: getTheme() });	
	
	$('#classInformationdiv').append('<label style="margin-left:10px;margin-top:10px">Location : </label>');
	var location = $('<input style="margin-top:10px;"/>').attr({type:'text', id:'txtLocation'});
	$('#classInformationdiv').append(location);
	$('#txtLocation').jqxInput({placeHolder: "Class Location", height: 20, width:130, minLength: 1, theme: getTheme() });
//	$('#classInformationdiv').append('<br/>');
	$('#classInformationdiv').append('<div id="newdiv" style = "margin-top:10px; border:1px solid;height:23px;"/>');
	
	$('#newdiv').append('<label style="float:left;"> Start : </label>');
	var stime = $('<div style="float: left; margin-left:10px;"/>').attr({id:'divStartTime'});
	$('#newdiv').append(stime);
	$('#divStartTime').jqxDateTimeInput({width: '100px', height: '20px', formatString: 'd', theme: getTheme()});
	
	$('#newdiv').append('<label style="float:left; margin-left:10px;"> End: </label>');
	var etime = $('<div style="float:left; margin-left:10px;" />').attr({id:'divEndTime'});
	$('#newdiv').append(etime);
	$('#divEndTime').jqxDateTimeInput({width: '100px', height: '20px', formatString: 'd', theme: getTheme()});
	
	var statusLabel = $('<label id="labelClassStatus" name="labelClassStatus" style="float:left; margin-left:20px;">Status</label>');
	$('#newdiv').append(statusLabel);

/*
	var savebtn = $('<input style="margin-top:10px;"/>').attr({type:'button', id:'btnSaveClassInformation', value:'Save' });
	$('#classInformationdiv').append(savebtn);
	$('#btnSaveClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
		
	var editbtn = $('<input style="margin-top:10px; "/>').attr({type:'button', id:'btnEditClassInformation', value:'Edit' });
	$('#classInformationdiv').append(editbtn);
	$('#btnEditClassInformation').jqxButton({ width: '60', height: 20, theme: getTheme() });
*/
	$('#classInformationdiv').append('<label style="margin-top:10px;"> Class Name : </label>');
	$('#classInformationdiv').append('<br />');
	
	$('#classInformationdiv').append('<label style="margin-top:10px;"> Class Name : </label>');
}