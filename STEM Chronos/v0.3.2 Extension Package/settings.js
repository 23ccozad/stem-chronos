window.onload = function getCookies() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
    	cookies[i] = cookies[i].split("=");
	}
	if (cookies[0][1] == "upper") {
		document.getElementById("upper-class-input").checked = true;
		document.getElementById("lower-class-input").checked = false;
	}
	if (cookies[0][1] == "lower") {
		document.getElementById("upper-class-input").checked = false;
		document.getElementById("lower-class-input").checked = true;
	}
}

document.getElementById("lower-class-input").onclick = function sendCookies() {
	var gradeLevel;
	if (document.getElementById("upper-class-input").checked == true) {
		gradeLevel = "upper";
	}
	if (document.getElementById("lower-class-input").checked == true) {
		gradeLevel = "lower";
	}
	document.cookie = "class=" + gradeLevel + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
	document.getElementById("settings-saved").style.display = "block";
}

document.getElementById("upper-class-input").onclick = function sendCookies() {
	var gradeLevel;
	if (document.getElementById("upper-class-input").checked == true) {
		gradeLevel = "upper";
	}
	if (document.getElementById("lower-class-input").checked == true) {
		gradeLevel = "lower";
	}
	document.cookie = "class=" + gradeLevel + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
	document.getElementById("settings-saved").style.display = "block";
}