// Validated user entered password.
// Password Requirements:
// 1. Must be more than 8 characters
// 2. Must contain at least 1 upper case letter
// 3. Must contain at least 1 special character
function validatePassword(form) {
	var standardPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
	if (standardPassword.test(form.password.value)) {
		form.action = "ListView.html";
		return true;
	} else {
		var errorPanel = document.getElementById("errorPanel");
		if (errorPanel.style.display === "none") {
			errorPanel.style.display = "block";
		} else {
			errorPanel.style.display = "none";
		}
		return false;
	}
}