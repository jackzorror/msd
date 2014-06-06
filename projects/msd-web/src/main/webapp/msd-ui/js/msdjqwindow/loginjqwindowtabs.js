function addLoginWindowEventListeners(theme) {
	setTheme(theme);

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
	$('#btnlogin').jqxButton({ width: '60', theme: theme });

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
	
		$('#txtStudentSearchFirstName').focus();
		
		getUniqueName("FIRSTNAME");
		getUniqueName("LASTNAME");

	setTimerId(setInterval("timercount()", 60000));
}

var timerId;
function getTimerId() {
	return timerId;
}
function setTimerId(id) {
	timerId = id;
}

var windowTheme;
function getTheme() {
	return windowTheme;
};
function setTheme(value) {
	windowTheme = value;
};
