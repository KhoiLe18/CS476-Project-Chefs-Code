function validateName(name) {
	let nameRegEx = /^[a-zA-Z]+$/;

	if (nameRegEx.test(name))
		return true;
	else
		return false;
}

function validatePassword(password){
	let passwordRegEx = /^\S+$/;
	if (password.length >= 6 && passwordRegEx.test(password))
		return true;
	else
		return false;
}
function validateCpassword(cpassword){
	let pwd = document.getElementById("password");
	if (pwd.value !== cpassword)
		return false;
	else
		return true;
}

function validateEmail(email){
    let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegEx.test(email))
        return true;
    else
        return false;
}

function fNameHandler(event) {
	let fname = event.target;

	if (!validateName(fname.value)) {

		fname.classList.add("input-field-error");
		document.getElementById("error-text-fname").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		fname.classList.remove("input-field-error")
		document.getElementById("error-text-fname").classList.add("hidden");
	}

}
function lNameHandler(event) {
	let lname = event.target;
	
	if (!validateName(lname.value)) {
		fname.classList.add("input-field-error");
		document.getElementById("error-text-lname").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		lname.classList.remove("input-field-error")
		document.getElementById("error-text-lname").classList.add("hidden");
	}
}

function pwdHandler(event) {
	let pwd = event.target;
	 
	if (!validatePassword(pwd.value)) {
		pwd.classList.add("input-field-error");
		document.getElementById("error-text-password").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		pwd.classList.remove("input-field-error")
		document.getElementById("error-text-password").classList.add("hidden");
	}
}

function cpwdHandler(event) {
	let pwd = document.getElementById("password");
	let cpwd = event.target;
	if (!validateCpassword(cpwd.value)){
		cpwd.classList.add("input-field-error");
		document.getElementById("error-text-cpassword").classList.remove("hidden");
		formIsValid = false;
	}
	else {
		cpwd.classList.remove("input-field-error");
		document.getElementById("error-text-cpassword").classList.add("hidden");
	}
}
function emailHandler(event) {
	let email = event.target;
	if (!validateEmail(email.value))
	{
		email.classList.add("input-field-error");
		document.getElementById("error-text-email").classList.remove("hidden");
		formIsValid = false;
	}
	else {
		email.classList.remove("input-field-error")
		document.getElementById("error-text-email").classList.add("hidden");
	}
}

function validateSignup(event) {


	let fname = document.getElementById("fname");
	let lname = document.getElementById("lname");
    let email = document.getElementById("email");
	let pwd = document.getElementById("password");
	let cpwd = document.getElementById("cpassword");
	

	let formIsValid = true;

    if (!validateName(fname.value)) {

		fname.classList.add("input-field-error");
		document.getElementById("error-text-fname").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		fname.classList.remove("input-field-error")
		document.getElementById("error-text-fname").classList.add("hidden");
	}

    if (!validateName(lname.value)) {
		fname.classList.add("input-field-error");
		document.getElementById("error-text-lname").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		lname.classList.remove("input-field-error")
		document.getElementById("error-text-lname").classList.add("hidden");
	}

   
	if (!validatePassword(pwd.value)) {
		pwd.classList.add("input-field-error");
		document.getElementById("error-text-password").classList.remove("hidden");
		formIsValid = false;
	} 
	else {
		pwd.classList.remove("input-field-error")
		document.getElementById("error-text-password").classList.add("hidden");
	}

	if (!validateCpassword(cpwd.value)){
		cpwd.classList.add("input-field-error");
		document.getElementById("error-text-cpassword").classList.remove("hidden");
		formIsValid = false;
	}
	else {
		cpwd.classList.remove("input-field-error");
		document.getElementById("error-text-cpassword").classList.add("hidden");
	}

	if (!validateEmail(email.value))
	{
		email.classList.add("input-field-error");
		document.getElementById("error-text-email").classList.remove("hidden");
		formIsValid = false;
	}
	else {
		email.classList.remove("input-field-error")
		document.getElementById("error-text-email").classList.add("hidden");
	}
	
	

	if (formIsValid === false) {
		
		event.preventDefault();
	}
	else {
		console.log("validation successful, sending data to the server");
	}
}
