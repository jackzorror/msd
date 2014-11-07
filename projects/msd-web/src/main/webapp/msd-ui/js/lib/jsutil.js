function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isNotEmpty(str) {
	return (!isEmpty(str));
}

function getFormattedDateToMMDDYYYY(odate) {

	var value = odate.split(" ");
	var date = value[0];
	var value = date.split("-");
	var year = value[0];
	var month = value[1];
	var day = value[2]; 
	
	return month + '/' + day + '/' + year;
}