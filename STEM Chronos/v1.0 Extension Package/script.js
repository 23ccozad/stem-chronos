/* For instances when a number below 10 needs a leading zero, especially for the XML file
name that the extension accesses to get schedule information and current time display of
minutes. */
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


/* Times in the XML file are in 24 hour format. This function takes a 24 hour time and
returns 12 hour time. */
function convertTo12(time) {
	// Takes times that begin with 00 hours and returns 12 the hour as 12 AM
	if (parseInt(time.substr(0, 2)) == 0) {
		return "12" + time.substring(5, 2) + " AM";
	}
	// Takes times that begin between 01 and 09 hours and removes leading zero tacks on AM to the end
	if (1 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 9) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " AM"; // Note that parseInt(time.substr(0, 2)) takes the hours and removes the leading zero
	}
	// Takes times that begin between 10 and 11 and tacks on AM to the end
	if (10 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 11) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " AM";
	}
	// Takes times that begin with 12 and tacks on PM to the end
	if (parseInt(time.substr(0, 2)) == 12) {
		return parseInt(time.substr(0, 2)) + time.substring(5, 2) + " PM";
	}
	// Takes times that begin between 13 and 23 and convert to 12-hour time and tacks on PM to the end
	if (13 <= parseInt(time.substr(0, 2)) && parseInt(time.substr(0, 2)) <= 23) {
		return parseInt(time.substr(0, 2))-12 + time.substring(5, 2) + " PM";
	}
}


/* Declares a variable as a date object for the current date and time. */
var fulldate = new Date();


/* Declares a variable as the day of the week, expressed as a number 0 thru 7. If-
statement converts the number to a string day of the week. */
var day = fulldate.getDay();
if (day == 0) {
	day = "Sunday";
} else if (day == 1) {
	day = "Monday";
} else if (day == 2) {
	day = "Tuesday";
} else if (day == 3) {
	day = "Wednesday";
} else if (day == 4) {
	day = "Thursday";
} else if (day == 5) {
	day = "Friday";
} else {
	day = "Saturday";
}


/* Declares a variable as the month, expressed as a number 0 thru 11. If-
statement converts the number to a string month or string of the three letter month. */
var month = fulldate.getMonth();
if (month == 0) {
	month = "January";
} else if (month == 1) {
	month = "February";
} else if (month == 2) {
	month = "March";
} else if (month == 3) {
	month = "April";
} else if (month == 4) {
	month = "May";
} else if (month == 5) {
	month = "June";
} else if (month == 6) {
	month = "July";
} else if (month == 7) {
	month = "August";
} else if (month == 8) {
	month = "September";
} else if (month == 9) {
	month = "October";
} else if (month == 10) {
	month = "November";
} else {
	month = "December";
}


/* Concatenates date variables and prints them on the GUI. */
document.getElementById("date").innerHTML = day + ", " + month + " " + fulldate.getDate();


/* Prints current year for the copyright statement on the GUI. */
document.getElementById("year").innerHTML = fulldate.getFullYear();


/* Declares variables for hours, minutes, and AM or PM and concatenates and prints them on the GUI. */
var h = fulldate.getHours();
var m = addZero(fulldate.getMinutes());
var ampm = "AM";
if (h >= 12) {
	if (h != 12) {
		h = h - 12;
	}
	ampm = "PM";
}
document.getElementById("currentTime").innerHTML = h + ":" + m + " " + ampm;


/* Executes this function on load that sends XHR and processes the schedule information to be printed */
window.onload = function sendRequest() {
	
	
	/* Sends and opens XHR, using the current date to retrieve the correct file. */
    request = new XMLHttpRequest();
    request.open("GET", "http://www.hurricanehq.net/stem-chronos/" + fulldate.getFullYear() + "-" + addZero(fulldate.getMonth()+1) + "-" + addZero(fulldate.getDate()) + ".xml?" + Date.now(), true); // Uses the current date after ? to prevent accessing cached file

    
    /* Executes this function on XHR load, parsing and processing XML file data to print on the GUI. */
    request.addEventListener("load", function(e) {
    
    
		/* Aborts XHR if an XML file is not found. This prevents errors in places where the XML file is typically parsed, allowing the summer or weekend messages to appear. */
		if (request.status == 404) {
			request.abort();
		}
    	
    	
    	/* Declares a string variable to hold XML file */
    	var xmlText = request.responseText;
    	
    	
    	/* Prints letter day or other letter day on GUI from XML file. */
    	if ($($.parseXML(xmlText)).find("letterDay").text() == "Other") {
    		document.getElementById("letter-day").innerHTML = $($.parseXML(xmlText)).find("otherLetterDay").text();
    	} else {
    		document.getElementById("letter-day").innerHTML = $($.parseXML(xmlText)).find("letterDay").text();
    	}
    	
    	
    	/* Prints custom message on GUI from XML file. */
    	document.getElementById("notification").innerHTML = $($.parseXML(xmlText)).find("customMessage").text();
    	
    	
    	/* Finds the last XML tag and substrings it to find the last period, then loops through each period. */
    	for (i = 1; i < parseInt(xmlText.substr(-27, 1))+1; i++) {
    		
    		
    		/* For each period in the XML table, appends a row to the table with period name, start, and end time, based on user's preferred schedule (9-10 or 11-12). */
    		$("#full-schedule").append("" +
    			"<tr " + currentPeriod() + " >" +
    			"<td class='column1'>" + $($.parseXML(xmlText)).find("period-row-" + i + "-name-" + localStorage.getItem("schedule")).text() + "</td>" +
    			"<td class='column2'>" + convertTo12($($.parseXML(xmlText)).find("period-row-" + i + "-start-" + localStorage.getItem("schedule")).text()) + " - " + convertTo12($($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text()) + "</td>" +
    			"</tr>");
    			
    			
    		/* Executes a function that figures out if the current time falls between the period row i, and if so, it adds a class attribute to the current row of the table. */
    		function currentPeriod() {
    			if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $($.parseXML(xmlText)).find("period-row-" + i + "-start-" + localStorage.getItem("schedule")).text().substr(0, 2), $($.parseXML(xmlText)).find("period-row-" + i + "-start-" + localStorage.getItem("schedule")).text().substr(3, 2)) <= new Date() && new Date() <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(0, 2), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(3, 2))) {
    				return "class='highlighted-row'";
    			} else {
    				return "";
    			}
    		}
    		
    		
    		/* Finds if the current time falls between period row i's start and end time, and if so, shows the amount of time until the end of the period. */
			if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $($.parseXML(xmlText)).find("period-row-" + i + "-start-" + localStorage.getItem("schedule")).text().substr(0, 2), $($.parseXML(xmlText)).find("period-row-" + i + "-start-" + localStorage.getItem("schedule")).text().substr(3, 2)) <= new Date() && new Date() <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(0, 2), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(3, 2))) {
				
				
				/* Shows the time remaining section of the GUI. */
				document.getElementById("time-remaining").style.display = "block";
				
				
				/* Finds how much time is left until the end of the period. */
				var msToPeriodEnd = new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(0, 2), $($.parseXML(xmlText)).find("period-row-" + i + "-end-" + localStorage.getItem("schedule")).text().substr(3, 2)) - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()));
				
				
				/* Determines if the number of hours until the end of the period is not zero, and if so, shows the number of hours until the end of the period in the GUI. */
				if (msToPeriodEnd.getHours() - 19 != 0) {
					document.getElementById("hours-remaining").innerHTML = msToPeriodEnd.getHours() - 19;
					document.getElementById("hours").style.display = "inline-block";
				}
				
				
				/* Determines if the number of hours until the end of the period is not one, and if so, adds an "s" to the end of the word "hour" in the GUI.*/
				if (msToPeriodEnd.getHours() - 19 != 1) {
					document.getElementById("multiple-hours-s").style.display = "inline-block";
				}
				
				
				/* Determines if the number of minutes until the end of the period is not one, and if so, adds an "s" to the end of the word "minutes" in the GUI. */
				if (msToPeriodEnd.getMinutes() != 1) {
					document.getElementById("multiple-minutes-s").style.display = "inline-block";
				}
				
				/* Prints remaining minutes and period name into GUI. */
				document.getElementById("minutes-remaining").innerHTML = msToPeriodEnd.getMinutes();
				document.getElementById("current-period").innerHTML = $($.parseXML(xmlText)).find("period-row-" + i + "-name-" + localStorage.getItem("schedule")).text();
			}
    	}
    	
    	
    	/* Determines if it is a snow day based on XML information, and if so, hides the main part of the extension and instead shows a snow day GIF. */
    	if ($($.parseXML(xmlText)).find("isSnowDay").text() == "Yes") {
			document.getElementById("main").innerHTML = "";
			document.getElementById("snow-day").style.display = "block";
    	} else {
    		document.getElementById("snow-day").style.display = "none";
    	}
    	

    	/* Determines if it is a day off based on XML information, and if so, hides the main part of the extension and instead shows a day off GIF. */
    	if ($($.parseXML(xmlText)).find("isDayOff").text() == "Yes") {
    		if ($($.parseXML(xmlText)).find("isSnowDay").text() == "No") { // Prevents both snow day and day off GIFs from showing at same time
    			document.getElementById("main").innerHTML = "";
    			document.getElementById("no-school").style.display = "block";
    		}
    	} else {
    		document.getElementById("no-school").style.display = "none";
    	}
    	
    	
    	/* Determines if it is a Saturday and if so, hides the main part of the extension and instead shows a Saturday GIF. */
    	if (day == "Saturday") {
    		if (new Date(2018, 5, 8, 12, 0, 0, 0) > new Date() || new Date(2018, 7, 27, 1, 0, 0, 0) < new Date()) { // Prevents both summer and Saturday GIFs from showing at the same time
    			document.getElementById("main").innerHTML = "";
    			document.getElementById("saturday").style.display = "block";
    		}
    	} else {
    		document.getElementById("saturday").style.display = "none";
    	}
    	
    	
    	/* Determines if it is a Sunday and if so, hides the main part of the extension and instead shows a Sunday GIF. */
    	if (day == "Sunday") {
    		if (new Date(2018, 5, 8, 12, 0, 0, 0) > new Date() || new Date(2018, 7, 27, 1, 0, 0, 0) < new Date()) { // Prevents both summer and Sunday GIFs from showing at the same time
    			document.getElementById("main").innerHTML = "";
    			document.getElementById("sunday").style.display = "block";
    		}
    	} else {
    		document.getElementById("sunday").style.display = "none";
    	}
    	
    	
    	/* Determines if it is summer and if so, hides the main part of the extension and instead shows a Sunday GIF. */
    	rif (new Date(2018, 5, 8, 12, 0, 0, 0) < new Date() && new Date(2018, 7, 27, 1, 0, 0, 0) > new Date()) {
    		document.getElementById("main").innerHTML = "";
    		document.getElementById("summer").style.display = "block";
    	} else {
    		document.getElementById("summer").style.display = "none";
    	}
    	
    	
    }, false); // Ends on load XHR function
    request.send(null); // Closes XHR
    
    
	/* Executes this function when called to show the install window, prompting users to go to the settings page. */   
	function onInstall() {
		document.getElementById("install").style.display = "block";
		document.getElementById("extension-body").style.display = "none";
	}


	/* Executes this function when called to debug updates. */
	function onUpdate() {
		console.log("Extension Updated");
	}


	/* Executes this function when called to return version of extension from manifest. */
	function getVersion() {
		var details = chrome.app.getDetails();
		return details.version;
	}

	/* Declares variables for current and previous version of extension, and if unequal, checks if it was just installed, prompting the install window, or if it was just updated. */
	var currVersion = getVersion();
	var prevVersion = localStorage['version'];
	if (currVersion != prevVersion) {
		if (typeof prevVersion == 'undefined') { // Checks if extension was just installed
			onInstall();
		} else {
			onUpdate();
		}
		localStorage['version'] = currVersion; // Updates localStorage with latest version
	}
  
} // Ends window.onload function

/* Determines if an Internet connection is present, and if not, hides main section of extension and instead shows a no internet GIF. */
if (navigator.onLine == false) {
    document.getElementById("main").innerHTML = "";
    document.getElementById("no-internet").style.display = "block";
}