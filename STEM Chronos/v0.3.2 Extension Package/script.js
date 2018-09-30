//add zero function
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


//current date
var fulldate = new Date();
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
var month = fulldate.getMonth();
if (month == 0) {
	month = "Jan";
	lowerCaseMonth = "jan";
} else if (month == 1) {
	month = "Feb";
	lowerCaseMonth = "feb";
} else if (month == 2) {
	month = "Mar";
	lowerCaseMonth = "mar";
} else if (month == 3) {
	month = "Apr";
	lowerCaseMonth = "apr";
} else if (month == 4) {
	month = "May";
	lowerCaseMonth = "may";
} else if (month == 5) {
	month = "Jun";
	lowerCaseMonth = "jun";
} else if (month == 6) {
	month = "Jul";
	lowerCaseMonth = "jul";
} else if (month == 7) {
	month = "Aug";
	lowerCaseMonth = "aug";
} else if (month == 8) {
	month = "Sep";
	lowerCaseMonth = "sep";
} else if (month == 9) {
	month = "Oct";
	lowerCaseMonth = "oct";
} else if (month == 10) {
	month = "Nov";
	lowerCaseMonth = "nov";
} else {
	month = "Dec";
	lowerCaseMonth = "dec";
}
document.getElementById("date").innerHTML = day + ", " + month + " " + fulldate.getDate() + ", " + fulldate.getFullYear();


//current time
var date = new Date();
var time = document.getElementById("currentTime");
var h = date.getHours();
var m = addZero(date.getMinutes());
var ampm = "AM";
if (h >= 12) {
	if (h != 12) {
		h = h - 12;
	}
	ampm = "PM";
}
time.innerHTML = h + ":" + m + " " + ampm;


//retrieve cookies
var cookies = document.cookie.split(";");
for (var i = 0; i < cookies.length; i++) {
	cookies[i] = cookies[i].split("=");
}


//insert name
//document.getElementById("name").innerHTML = cookies[0][1];


//retrieve daily file with schedule information
window.onload = function sendRequest() {
    request = new XMLHttpRequest();
    request.open("GET", "http://www.hurricanehq.net/stem-scheduletrak/" + lowerCaseMonth + "-" + fulldate.getDate() + "-" + fulldate.getFullYear() + ".txt", true);
    request.addEventListener("load", function(e) {
    	var text = request.responseText;
    	text = text.split("|"); //split up file components with "|"
    	document.getElementById("letter-day").innerHTML = text[0]; //insert letter day
    	document.getElementById("notification").innerHTML = text[1]; //insert custom notification
    	if (cookies[0][1] == "lower") {
    		document.getElementById("full-schedule").innerHTML = text[2]; //insert 9-10 schedule if desired
    	}
    	if (cookies[0][1] == "upper") {
    		document.getElementById("full-schedule").innerHTML = text[3]; //insert 11-12 schedule if desired
    	}
    	//the following if statements check for snow day, no school, weekends, or summer
    	if (text[0] == "Snow Day") {
			document.getElementById("main").innerHTML = "";
			document.getElementById("snow-day").style.display = "block";
    	}
    	if (text[0] == "No School") {
    		document.getElementById("main").innerHTML = "";
    		document.getElementById("no-school").style.display = "block";
    	}
    	if (day == "Saturday") {
    		document.getElementById("main").innerHTML = "";
    		document.getElementById("saturday").style.display = "block";
    	}
    	if (day == "Sunday") {
    		document.getElementById("main").innerHTML = "";
    		document.getElementById("sunday").style.display = "block";
    	}
    	if (new Date(2018, 5, 8, 12, 0, 0, 0) < new Date() && new Date(2018, 7, 27, 1, 0, 0, 0) > new Date()) {
    		document.getElementById("main").innerHTML = "";
    		document.getElementById("summer").style.display = "block";
    	}
    }, false);
    request.send(null);
 
    
//show installation window when installed    
  function onInstall() {
    //console.log("Extension Installed");
    document.getElementById("install").style.display = "block";
    document.getElementById("extension-body").style.display = "none";
  }

  function onUpdate() {
    console.log("Extension Updated");
  }

  function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
  }

  // Check if the version has changed.
  var currVersion = getVersion();
  var prevVersion = localStorage['version'];
  if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      onInstall();
    } else {
      onUpdate();
    }
    localStorage['version'] = currVersion;
  }
}




/*   DESCRIPTIONS OF VARIABLES
 *   text[0] is the letter day (ex: "J")
 *   text[1] is the optional custom information string (ex: "Note that schedules are shifted for finals this week")
 *   text[2] is the lower class schedule for the day in HTML table format
 *   text[3] is the upper class schedule for the day in HTML table format
 *   cookies[0][1] is the user's schedule (9-10 schedule or 11-12 schedule)
 */