function addLoginWindowEventListeners() {
//	setTheme(theme);

	$(document).on('click', '#btnShowLoginWindow', handleShowLoginWindowClick);
	$(document).on('click', '#btnlogin', handleLoginClick);
	$(document).on('keypress', '#txtPassword', handlePasswordKeypress)
	$(document).on('keypress', '#txtUserName', handleUsernameKeypress);
	
}

function handleShowLoginWindowClick() {

	if ($('#btnShowLoginWindow').val() == 'Logout') {
		processLogout();
	} else {
		if (false == $('#loginWindow').jqxWindow('isOpen')) {
			resetLoginWindow();
			$('#loginWindow').jqxWindow('open');
		} else if (true == $('#loginWindow').jqxWindow('isOpen')) {
			resetLoginWindow();
		} else {
			var mainContainer = $('#mainContainer');
    		var offset = mainContainer.offset();
	    	theme = getTheme();
    		$('#loginWindow').append('<div >MSD System Login</div> <div id="msdlogindiv"> test </div>');
	    	initLogin();
			$('#loginWindow').jqxWindow({showCollapseButton: false, isModal: true, draggable:false,  resizable: false, height: '220px', width: '340px', theme: theme, position: { x: (offset.left + 230), y: offset.top + 40} });
			$('#txtUserName').focus();
		}
	}
};

function handlePasswordKeypress(e) {
    if(e.which == 13) // Enter 
    	$('#btnlogin').click();
}

function handleUsernameKeypress(e) {
	if (e.which == 13)
		$('#txtPassword').focus();
}

function initLogin() {
	console.log(" init Loggin ... ");

	$('#msdlogindiv').empty();

	var formdiv = $('<div class="form" id="formdiv" />');
	$('#msdlogindiv').append(formdiv);

	var inputdiv = $('<div class="inputContainer" id="inputdiv"/>');
	$('#formdiv').append(inputdiv);

	$('#inputdiv').append('<label>Username:</label>');
	var uname = $('<input/>').attr({type:'text', id:'txtUserName'});
	$('#inputdiv').append(uname);
	$('#inputdiv').append('Password:');
	var pword = $('<input/>').attr({type:'password', id:'txtPassword'});
	$('#inputdiv').append(pword);

	var btnlogin=$('<input style="float: right; margin-top: 10px; margin-right: 10px;"/>').attr({type:'button', id:'btnlogin', value:'Login'});
	$('#inputdiv').append(btnlogin);
	$('#btnlogin').jqxButton({ width: '60', theme: getTheme() });

	var msgdiv = $('<div class="errormsgdiv" id="msgdiv" />');
	$('#msdlogindiv').append(msgdiv);
	
};

function resetLoginWindow() {
	$('#txtUserName').val("");
	$('#txtPassword').val("");
	$('#txtUserName').focus();
	$('#msgdiv').empty();
};

function handleLoginClick() {
	
	var msg = "Please provide ";
	var error = false;
	if (null == $('#txtUserName').val() || $('#txtUserName').val().length == 0) {
		msg += " username ";
		error = true;
	}
	
	if (null == $('#txtPassword').val() || $('#txtPassword').val().length == 0) {
		msg += " password ";
		error = true;
	}
	
	if (error == true) {
		$('#msgdiv').empty().append(msg);
	} else {
		processLogin();
	}
};

function processLogin() {
	console.log(" user login ... ");
	var uname = $.trim($('#txtUserName').val());
	var pword = $.trim($('#txtPassword').val());
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdlogin/login",
		data: { username: uname, password: pword },
		success: function(response) {
			console.log(" login ... ");
			if (302 == response.code) {
				afterUserLoginProcess()
			} else {
				$('#msgdiv').empty().append('Error : ' + response.message + " - " + response.code);
			}
		},
		error: function(msg, url, line) {
			$('#msgdiv').empty().append('Error in system ...');
		}
	});
};

function processLogout() {

	console.log(" user logout ... ");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "../msd-app/msdlogin/logout",
		success: function(response) {
			console.log(" logout ... ");
			window.location.reload();
		},
		error: function(msg, url, line) {
			console("Error to logout . . . ");
			window.location.reload();
		}
	});
}

function afterUserLoginProcess() {
	console.log(" user loged in ... ");

    $('#btnShowLoginWindow').val('Logout');
	
	$('#loginWindow').jqxWindow('close');
	
	if (document.getElementById('msdMainTabs') != null)
		document.getElementById('msdMainTabs').style.visibility= 'visible' ;

	ajaxHasRole("ROLE_ADMIN", hasRole);

	$('#txtStudentSearchFirstName').focus();
		
	ajaxGetCurrentSemester(getCurrentSemesterObject);
}

function getCurrentSemesterObject(response) {
	if (404 == response.code) {
		console.log(" Can't get current semester ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get current semester ");
		setCurrentSemester(data);
		getAllResource(data);
	} else {
		alert('error');
	}

}

function getAllResource(data) {
	ajaxGetUniqueName("FIRSTNAME", getUniqueFirstNameForStudent);
	ajaxGetUniqueName("LASTNAME",getUniqueLasstNameForStudent);
	ajaxGetAllClassForCurrentSemester(data.id, getAllClass);
	ajaxGetAllCompetition(getAllCompetitionNameIdList);
	ajaxGetAllGeneralFee(getAllGeneralFeeList);
	ajaxGetAllMSDTypes(getAllMSDTypes);
	ajaxGetSemesterList(getSemesterArrayList);
	
	setTimerId(setInterval("timercount()", 60000));
	
}

function hasRole(response) {
	if (302 == response.code) {
		var data = $.parseJSON(response.result);
		if (!data) {
			var mtabs = $('#msdMainTabs');
			if (null != mtabs && mtabs.length == 1)
				var length = mtabs.jqxTabs('length');
				mtabs.jqxTabs('removeAt', length - 1); 
				mtabs.jqxTabs('removeAt', length - 2); 
		}
	} else {
		alert(" Can't get unique for " + fieldname + " ... ");
	}
}

function getUniqueFirstNameForStudent(response) {
	if (302 == response.code) {
		var data = $.parseJSON(response.result);

    	$( '#txtStudentSearchFirstName' ).jqxInput({ source: data });
    	setFirstNameList(data);
	} else {
		alert(" Can't get unique for First Name ... ");
	}
}

function getUniqueLasstNameForStudent(response) {
	if (302 == response.code) {
		var data = $.parseJSON(response.result);

	    $( '#txtStudentSearchLastName' ).jqxInput({ source: data });
	    setLastNameList(data);
	} else {
		alert(" Can't get unique for Last Name ... ");
	}
}

function getAllClass(response) {
	if (404 == response.code) {
		console.log(" Can't get active summary class ... ");
		loadClassNameDropDownListDataSource(null);
		setAllClassNameList(null);
		setActiveClassNameList(null);
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get active summary class  list ");
		var activeClassName = [];
		var allClassName = [];
		var newDataSource = [];
		for (index in data) {
			allClassName.push({text:data[index].name, value:data[index].id});
			if (data[index].isactive) {
				activeClassName.push({text:data[index].name, value:data[index].id});
			}
		}
		loadClassNameDropDownListDataSource(activeClassName);
		setAllClassNameList(allClassName);
		setActiveClassNameList(activeClassName);
	} else {
		alert('error');
	}
}

function getAllClassName(response) {
	if (404 == response.code) {
		console.log(" Can't get class name ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get class name list ");
		$('#txtClassSearchName').jqxInput({source:data});
		setAllClassNameList(data);
	} else {
		alert('error');
	}
}

function getAllMSDTypes(response) {
	if (404 == response.code) {
		console.log(" Can't get all type ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all type list ");
		setAllType(data);
		var feeType = [];
		var classType = [];
		var studentType = [];
		for (index in data) {
			if (data[index].type == 'FEE_TYPE') 
				feeType.push(data[index]);
			else if (data[index].type == 'CLASS_TYPE')
				classType.push(data[index]);
			else if (data[index].type == 'STUDENT_TYPE')
				studentType.push(data[index]);
		}
		setAllFeeType(feeType);
		setAllClassType(classType);		
		setAllStudentType(studentType);
	} else {
		alert('error');
	}
}

var allType;
function setAllType(data) {
	allType = data;
}
function getAllType() {
	return allType;
}
var allFeeType;
function setAllFeeType(data) {
	allFeeType = data;
}
function getAllFeeType() {
	return allFeeType;
}
var allClassType;
function setAllClassType(data) {
	allClassType = data;
}
function getAllClassType() {
	return allClassType;
}
var allStudentType;
function setAllStudentType(data) {
	allStudentType = data;
}
function getAllStudentType() {
	return allStudentType;
}

function getAllGeneralFeeList(response) {
	if (404 == response.code) {
		console.log(" Can't get all general fee ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get all general fee list ");
		setAllGeneralFee(data);
	} else {
		alert('error');
	}
}

function getAllCompetitionNameIdList(response) {
	if (404 == response.code) {
		console.log(" Can't get active all competition ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get active competition  list ");
		var activeCompetitionName = [];
		var allCompetitionName = [];
		for (index in data) {
			allCompetitionName.push({text:data[index].name, value:data[index].id});
			if (data[index].isActive) {
				activeCompetitionName.push({text:data[index].name, value:data[index].id});
			}
		}
		setAllCompetitionNameList(allCompetitionName);
		setActiveCompetitionNameList(activeCompetitionName);
		competitionTabLoadddlCompetitionSearchNameDataSource()		
	} else {
		alert('error');
	}

}

function getSemesterArrayList(response) {
	if (404 == response.code) {
		console.log(" Can't get semester List ... ");
	} else if (302 == response.code) {
		var data = $.parseJSON(response.result);
		console.log(" get semester list ");
		setSemesterList(data);
		loadClassTabSemesterDropDownListDataSource(data);		
	} else {
		alert('error');
	}
}

var timerId;
function getTimerId() {
	return timerId;
}
function setTimerId(id) {
	timerId = id;
}

var allClassNameList;
function getAllClassNameList() {
	return allClassNameList;
}
function setAllClassNameList(data) {
	allClassNameList = data;
}

var activeClassNameList;
function getActiveClassNameList() {
	return activeClassNameList;
}
function setActiveClassNameList(data) {
	activeClassNameList = data;
}

var allGeneralFee;
function setAllGeneralFee(data) {
	allGeneralFee = data;
}
function getAllGeneralFee() {
	return allGeneralFee;
}

var allCostType;
function setAllCostType(data) {
	allCostType = data;
}
function getAllCostType() {
	return allCostType;
}

var allCompetitionType;
function setAllCompetitionType(data) {
	allCompetitionType = data;
}
function getAllCompetitionType() {
	return allCompetitionType;
}

var allCompetitionNameList;
function setAllCompetitionNameList(clist) {
	allCompetitionNameList = clist;
}
function getAllCompetitionNameList() {
	return allCompetitionNameList;
}

var activeCompetitionNameList;
function setActiveCompetitionNameList(clist) {
	activeCompetitionNameList = clist;
}
function getActiveCompetitionNameList() {
	return activeCompetitionNameList;
}

var semesterList;
function setSemesterList(slist) {
	semesterList = slist;
}
function getSemesterList() {
	return semesterList;
}

var currentSemester;
function setCurrentSemester(s) {
	currentSemester = s;
}
function getCurrentSemester() {
	return currentSemester;
}