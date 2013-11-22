function handleClassTabEvents() {
	console.log(" setup check in tab event handle ...");
};

function initClassTab() {
	console.log(" init check in tab ... ");
	
	$('#msdclassdiv').append('Please select class:');
	var classlist = $('<select id="checkinClassCombobox" />');
	classlist.append($('<option').attr('value',"default").text("Select one ..."));
	$('#msdclassdiv').append(classlist);
	var searchbutton = $('<input id="btnStudentCheckInSearch"
	





	/*
  			
  			<label>Please select class:</label>
  			<select id="checkinClassCombobox">
    			<option value="default">Select one...</option>
  			</select>
  			<input id="btnStudentCheckInSearch" type="button" value="search" />
  			<div id="addStudentCheckinButton_here">
  				<div id="tempdiv"></div>
  			</div>
  			
  			<label>If student not register to above class, or this is a makeup class please input student name to check in.</label>
  			<br/>
  			<label>first name : </label>
  			<input type="text" id="fname" />
  			<label>last name : </label>
  			<input type="text" id="lname" />
  			<input id="btnNonClassStudentCheckInSearch" type="button" value="search" />
  			<div id="addNonClassStudentCheckinButton_here">
  				<div id="nonclassstudentdiv"></div>
  			</div>

	*/
};
