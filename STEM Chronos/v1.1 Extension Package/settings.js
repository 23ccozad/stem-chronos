/* Declares a variable as a date object for the current date and time. */
var fulldate = new Date();

/* Prints current year for the copyright statement on the GUI. */
document.getElementById("year").innerHTML = fulldate.getFullYear();

//toggling dropdowns
document.getElementById("freshman-sophomore-row").onclick = function toggleDropdown() {
	document.getElementById("freshman-sophomore").checked = true;
	if (document.getElementById("staff").checked == false) {
		if (navigator.onLine == true) {
			$("#dropdown-level-2-container").slideUp();
		} else {
			document.getElementById("dropdown-level-2-container").style.display = "none";
		}
	}
}

document.getElementById("junior-senior-row").onclick = function toggleDropdown() {
	document.getElementById("junior-senior").checked = true;
	if (document.getElementById("staff").checked == false) {
		if (navigator.onLine == true) {
			$("#dropdown-level-2-container").slideUp();
		} else {
			document.getElementById("dropdown-level-2-container").style.display = "none";
		}
	}
}

document.getElementById("staff-row").onclick = function toggleDropdown() {
	document.getElementById("staff").checked = true;
	if (document.getElementById("staff").checked == true) {
		if (navigator.onLine == true) {
			$("#dropdown-level-2-container").slideDown();
		} else {
			document.getElementById("dropdown-level-2-container").style.display = "block";
		}
	}
}

//showing current settings
window.onload = function getStorage() {
	if (localStorage.getItem("user") == "student") {
		if(localStorage.getItem("schedule") == "9-10") {
			document.getElementById("freshman-sophomore").checked = true;
		}
		if(localStorage.getItem("schedule") == "11-12") {
			document.getElementById("junior-senior").checked = true;
		}
	}
	if (localStorage.getItem("user") == "teacher") {
		document.getElementById("staff").checked = true;
		if (document.getElementById("staff").checked == true) {
			if (navigator.onLine == true) {
				$("#dropdown-level-2-container").slideDown();
			} else {
				document.getElementById("dropdown-level-2-container").style.display = "block";
			}
		}
		if (localStorage.getItem("schedule") == "9-10") {
			document.getElementById("staff-selection").value = "freshman-sophomore";
		} else {
			document.getElementById("staff-selection").value = "junior-senior";
		}
	}
}

//saving settings
document.getElementById("button").onclick = function saveSettings() {
	if ($("input[name='user']:checked").val() == "freshman-sophomore") {
		localStorage.setItem("schedule", "9-10");
		localStorage.setItem("user", "student");
	}
	if ($("input[name='user']:checked").val() == "junior-senior") {
		localStorage.setItem("schedule", "11-12");
		localStorage.setItem("user", "student");
	}
	if ($("input[name='user']:checked").val() == "staff") {
		localStorage.setItem("user", "teacher");
		if ($("#staff-selection").val() == "freshman-sophomore") {
			localStorage.setItem("schedule", "9-10");
		} else {
			localStorage.setItem("schedule", "11-12");
		}
	}
	setTimeout(function delayedFadeIn() {
		if (navigator.onLine == true) {
			$("#settings-saved").fadeIn();
		} else {
			document.getElementById("settings-saved").style.display = "block";
		}
	}, 250);
	setTimeout(function delayedFadeOut() {
		if (navigator.onLine == true) {
			$("#settings-saved").fadeOut();
		} else {
			document.getElementById("settings-saved").style.display = "none";
		}
	}, 5000);
}