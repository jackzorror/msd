function addLoginWindowEventListeners(theme) {
	setTheme(theme);

	$(document).on('click', '#btnShowLoginWindow', handleShowLoginWindowClick);
	$(document).on('click', '#btnlogin', handleLoginClick);
	
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
			$('#loginWindow').jqxWindow({showCollapseButton: false, draggable:false,  resizable: false, height: '220px', width: '350px', theme: theme, position: { x: (offset.left + 330), y: offset.top + 40} });
		}
	}
};

function processLogout() {
    $('#btnShowLoginWindow').val('Login');
    $('#btnShowStudentWindow').jqxButton({disabled: true});
    $('#btnShowTeacherWindow').jqxButton({disabled: true});
    $('#btnShowClassWindow').jqxButton({disabled: true});
    $('#btnShowCheckInWindow').jqxButton({disabled: true});

	loginWindowLogout();
	if (true == isWindowCreated("studentWindow")) {
		studentWindowLogout();
	}
	if (true == isWindowCreated("classWindow")) {
		classWindowLogout();
	}
	
	clearInterval(getTimerId());
};

function loginWindowLogout() {
	$('#loginWindow').jqxWindow('close');
	resetLoginWindow();	
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
		url: "../msd-app/msdlogin",
		data: { username: uname, password: pword },
		success: function(response) {
			console.log(" login ... ");
			if (302 == response.code) {
				afterUserLoginProcess()
			} else {
				$('#msgdiv').empty().append('Error Login return code : ' + response.code);
			}
		},
		error: function(msg, url, line) {
			$('#msgdiv').empty().append('Error in system ...');
		}
	});
};

function afterUserLoginProcess() {
	console.log(" user loged in ... ");

    $('#btnShowLoginWindow').val('Logout');
    $('#btnShowStudentWindow').jqxButton({disabled: false});
    $('#btnShowTeacherWindow').jqxButton({disabled: false});
    $('#btnShowClassWindow').jqxButton({disabled: false});
    $('#btnShowCheckInWindow').jqxButton({disabled: false});
	
	$('#loginWindow').jqxWindow('close');
	
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
