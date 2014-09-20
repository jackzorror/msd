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
			$('#loginWindow').jqxWindow({showCollapseButton: false, draggable:false,  resizable: false, height: '220px', width: '340px', theme: theme, position: { x: (offset.left + 230), y: offset.top + 40} });
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
		
	ajaxGetUniqueName("FIRSTNAME", getUniqueFirstNameForStudent);
	ajaxGetUniqueName("LASTNAME",getUniqueLasstNameForStudent);
	ajaxGetAllClass(getAllClass);
//	ajaxGetAllClassName(getAllClassName);
	
	setTimerId(setInterval("timercount()", 60000));
	
}

function hasRole(response) {
	if (302 == response.code) {
		var data = $.parseJSON(response.result);
		if (!data) {
			if (document.getElementById('msdMainTabs') != null)
				$('#msdMainTabs').jqxTabs('removeLast'); 
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
		alert(" Can't get unique for " + fieldname + " ... ");
	}
}

function getUniqueLasstNameForStudent(response) {
	if (302 == response.code) {
		var data = $.parseJSON(response.result);

	    $( '#txtStudentSearchLastName' ).jqxInput({ source: data });
	    setLastNameList(data);
	} else {
		alert(" Can't get unique for " + fieldname + " ... ");
	}
}

function getAllClass(response) {
	if (404 == response.code) {
		console.log(" Can't get active summary class ... ");
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