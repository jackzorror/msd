function showMsg(msg, type) {
	/*
	$().toastmessage('showToast', {
    	text     : msg,
	    sticky   : true,
    	position : 'middle-center',
	    type     : type,
    })
    */
    alert(msg);
}

function handleAjaxError(msg) {
	if (msg.status == "401") {
		alert("Error : " + msg.status + "-" + msg.statusText);
	} else if (msg.status == "403") {
		alert("Error : " + msg.status + "-" + msg.statusText + " Please relogin system ... ");
		window.location.reload();
	} else if(msg.status == "200")  {
		alert("Error : " + msg.responseText);
		if (msg.responseText.indexOf('This session has been expired') !== -1)
			window.location.reload();
 	} else {
 		alert("Error : " + msg.status + "-" + msg.statusText);
 	}
 	/*
 	This session has been expired
	window.location.reload();
	*/
}


