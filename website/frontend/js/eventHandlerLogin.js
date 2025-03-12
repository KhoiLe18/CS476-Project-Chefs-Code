
function validateName(name) {
    let nameRegEx = /^[a-zA-Z]+$/;

    if (nameRegEx.test(name))
        return true;
    else
        return false;
}

//validate password
function validatePassword(password) {
    let passwordRegx=/^\S+$/;

    if (password.length >= 8 && passwordRegx.test(password))
        return true;
    else
        return false;
}

//validate date of birth
function validateDob(dob) {
    let dobRegEx = /^\d{4}[-]\d{2}[-]\d{2}$/;

    if (dobRegEx.test(dob))
        return true;
    else
        return false;
}

//validate avatar
function validateAvatar(pic) {
    let picRegEx = /^[^\n]+\.[a-zA-Z]{3,4}$/;

    if (picRegEx.test(pic))
        return true;
    else
        return false;
}

//validate username or email
function validateUname(uname) {
    let unameRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (unameRegEx.test(uname))
        return true;
    else
        return false;
}

//validate title
function validateTitle(title){
    let titleRegEx = /^.{1,50}$/;

    if (titleRegEx.test(title))
        return true;
    else
        return false;
}

//validate post
function validateJoke(joke){
    let jokeRegEx = /^.{1,400}$/;

    if (jokeRegEx.test(joke))
        return true;
    else
        return false;
}

//  Add an event object to this validateLogin function.
function validateLogin(event) {
    let uname = document.getElementById("uname");
    let password = document.getElementById("password");

    let uname_msg = document.getElementById("uname_msg");
    uname_msg.innerHTML = "";
    let pwd_msg = document.getElementById("pwd_msg");
    pwd_msg.innerHTML = "";

    let formIsValid = true;

    // Validate username (email)
    if (!validateUname(uname.value)) {
        uname.classList.add("error-box");  
        uname_msg.textContent = "Please enter the correct email address";
        formIsValid = false;
    } else {
        uname.classList.remove("error-box"); 
    }

    // Validate password
    if (!validatePassword(password.value)) {
        password.classList.add("error-box"); // Add error highlight
        pwd_msg.textContent = "Please enter your correct password";
        formIsValid = false;
    } else {
        password.classList.remove("error-box"); // Remove highlight if valid
    }

    if (!formIsValid) {
        event.preventDefault(); // Stop form submission if validation fails
    } else {
        console.log("Validation successful, sending data to the server");
    }
}


function pwdHandler(event) {
    let pwd = event.target;
  
    if(!validatePassword(pwd.value)){
        console.log("Password: " + pwd.value + " is not valid");
        return false;
    }
    else{
        console.log("Password: " + pwd.value + " is  valid");
        return true;
    }
}

function cpwdHandler(event) {
    let pwd = document.getElementById("password");
    let cpwd = event.target;
    
    if(pwd.value != cpwd.value)
    {
        console.log("Confirm Password: " + cpwd.value + " is not valid");
        return false;
    }
    else{
        console.log("Confirm Password: " + cpwd.value + " is valid");
        return true;
    }

}

function avatarHandler(event) {
    let pic = event.target;

    if(!validateAvatar(pic.value)){
        console.log("Avatar: " + pic.value + " is not valid");
        return false;
    }
    else{
        console.log("Avatar: " + pic.value + " is valid");
        return true;
    }
}

// an event handler to validate the username field.
function unameHandler(event) {
    let uname = event.target;

    if(!validateUname(uname.value)){
        console.log("Username: " + uname.value + " is not valid");
        return false;
    }
    else{
        console.log("Username: " + uname.value + " is valid");
        return true;
    }
    
}

// an event handler to validate the date of birth field.
function dobHandler(event) {
    let dob = event.target;

    if(!validateDob(dob.value)){
        console.log("Date of Birth: " + dob.value + " is not valid");
        return false;
    }
    else{
        console.log("Date of Birth: " + dob.value + " is valid");
        return true;
    }
}

function titleHandler(event) {
    let title = event.target;

    if(!validateTitle(title.value)){
        console.log("Title: " + title.value + " is not valid");
        return false;
    }
    else{
        console.log("Title: " + title.value + " is valid");
        return true;
    }
}

function jokeHandler(event) {
    let joke = event.target;

    if(!validateJoke(joke.value)){
        console.log("Joke: " + joke.value + " is not valid");
        return false;
    }
    else{
        console.log("Joke: " + joke.value + " is valid");
        return true;
    }
}


// Todo 10
function validateSignup(event) {

    let avatar = document.getElementById("pic");
    let uname = document.getElementById("uname");
    let dob = document.getElementById("dob");
    let pwd = document.getElementById("password");
    let cpwd = document.getElementById("cpassword");

    let avatar_msg= document.getElementById("avatar_msg");
    avatar_msg.innerHTML="";
    let uname_msg= document.getElementById("uname_msg");
    uname_msg.innerHTML="";
    let dob_msg= document.getElementById("dob_msg");
    dob_msg.innerHTML="";
    let pwd_msg= document.getElementById("pwd_msg");
    pwd_msg.innerHTML="";
    let cpwd_msg= document.getElementById("cpwd_msg");
    cpwd_msg.innerHTML="";
    

    let formIsValid = true;

    if (!validateAvatar(avatar.value)) {
        avatar.classList.add("error-box");
        text= document.createTextNode("Please select a file");
        avatar_msg.appendChild(text);
        formIsValid = false;
    }

    if (!validateUname(uname.value)) {
        uname.classList.add("error-box");
        text= document.createTextNode("Please enter your email");
        uname_msg.appendChild(text);
        formIsValid = false;
    }

    if (!validateDob(dob.value)) {
        dob.classList.add("error-box");
        text= document.createTextNode("Please enter your date of birth");
        dob_msg.appendChild(text);
        formIsValid = false;
    }

    if (!validatePassword(pwd.value)) {
        pwd.classList.add("error-box");
        text= document.createTextNode("Please enter a valid password");
        pwd_msg.appendChild(text);
        formIsValid = false;
    }

    if (pwd.value != cpwd.value) {
        cpwd.classList.add("error-box");
        text= document.createTextNode("Confirmation password did not match");
        cpwd_msg.appendChild(text);
        formIsValid = false;
    }

    if (formIsValid === false) {

        event.preventDefault();
    }
    else {
        console.log("validation successful, sending data to the server");
    }
}

//-- Dynamic character count for title --
function titlecountupdate(str) {
    var lng = str.length;
    document.getElementById("titlecount").innerHTML = lng + ' out of 50 characters';
}

//-- Dynamic character count for joke --
function jokecountupdate(str) {
    var lng = str.length;
    document.getElementById("jokecount").innerHTML = lng + ' out of 400 characters';
}

//validatePost function.
function validatePost(event) {

    
    let title = document.getElementById("title");
    let joke = document.getElementById("joke");

    let title_msg= document.getElementById("title_msg");
    title_msg.innerHTML="";
    let joke_msg= document.getElementById("joke_msg");
    joke_msg.innerHTML="";

    let text;
    let formIsValid = true;

    if (!validateTitle(title.value)) {
        title.classList.add("error-box");
        text= document.createTextNode("Please enter your title");
        title_msg.appendChild(text);
        formIsValid = false;
    }

    if (!validateJoke(joke.value)) {
        joke.classList.add("error-box");
        text= document.createTextNode("Please enter your Joke");
        joke_msg.appendChild(text);
        formIsValid = false;
    }

    if (formIsValid === false) {
        event.preventDefault();
    }
    else {
        console.log("validation successful, sending data to the server");
    }
}

function increment() {
    var r_num = document.getElementById("rate").value;
    document.getElementById("rate").stepUp();
    if (r_num < 5) {
        document.getElementById("dec").style.visibility = "visible";
    } else if (r_num == 5) {
        document.getElementById("inc").style.visibility = "hidden";
    }
}

function decrement() {
    document.getElementById("rate").stepDown();
    var r_num = document.getElementById("rate").value;
    if (r_num > 0) {
        document.getElementById("inc").style.visibility = "visible";
    } else if (r_num == 0) {
        document.getElementById("dec").style.visibility = "hidden";
    }
}