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
	} else if(msg.status == "200")  {
		alert("Error : " + msg.responseText);
 	} else {
 		alert("Error : " + msg.status + "-" + msg.statusText);
 	}
 	/*
	window.location.reload();
	*/
}


