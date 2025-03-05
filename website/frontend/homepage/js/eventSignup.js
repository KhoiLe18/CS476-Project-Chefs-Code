let fname = document.getElementById("fname");
fname.addEventListener("blur", fNameHandler);

let lname = document.getElementById("lname");
lname.addEventListener("blur", lNameHandler);

let pwd = document.getElementById("password");
pwd.addEventListener("blur", pwdHandler);

let cpwd = document.getElementById("cpassword");
cpwd.addEventListener("blur", cpwdHandler);


let email = document.getElementById("email");
email.addEventListener("blur", emailHandler);




let signup = document.getElementById("signup");
signup.addEventListener("submit", validateSignup);