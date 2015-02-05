function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isNotEmpty(str) {
	return (!isEmpty(str));
}

function getFormattedDateToMMDDYYYY(odate) {
	if (null == odate) return "";
	
	var value = odate.split(" ");
	var date = value[0];
	var value = date.split("-");
	var year = value[0];
	var month = value[1];
	var day = value[2]; 
	
	return month + '/' + day + '/' + year;
}

function getFormatDateToYYYYMMDDHHMMSS(odate) {
	if (null == odate) return "";
	
	var year = odate.getFullYear();
	
	var month = odate.getMonth() + 1;
	var monthstr = month.toString();
	if (month < 10)
		monthstr = "0" + month.toString();
		
	var day = odate.getDate();
	var daystr = day.toString();
	if (day < 10)
		daystr = "0" + day.toString();
		
	var hour = odate.getHours();
	var hourstr = hour.toString();
	if (hour < 10)
		hourstr = "0" + hour.toString();
		
	var min = odate.getMinutes();
	var minstr = min.toString();
	if (min < 10)
		minstr = "0" + min.toString();
		
	var sec = odate.getSeconds();
	var secstr = sec.toString();
	if (sec < 10)
		secstr = "0" + secstr.toString();
	
	return year + '/' + monthstr + '/' + daystr + ' ' + hourstr + ':' + minstr + ':' + secstr;
}