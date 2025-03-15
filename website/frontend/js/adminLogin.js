let loginButton = document.getElementById("subButton");
let userLogin = document.getElementById("userLogin");

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    // get input in username input bar, and save it in variable username
    const username = document.getElementById("uname").value;
    //console.log(username);
    // get input from password search bar
    const password = document.getElementById("pwd").value;
    //console.log(password);

    // put all input into an object to send away to the backend api recipe fetch function
    const requestData = {
        username: username,
        password: password
    };

    // console.log(requestData)
    // set up the options for the post method, which requests data to our end point in the backend called /admiLogin in index.js
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
    };
    //console.log("Is it working here...?");
    fetch('/adminLogin', options).then(async response => {
    console.log("Information sent! We should have a response...");

    //Get the response in json format and save it into variable json. 
    //The response will let us know if there was a username + password combo match in our database! (check backend for this logic)
    const json = await response.json();
    console.log(json);  // Log the entire response object first to see what we're working with
    
    // Handle the response appropriately
    //if success was sent back as true, then a match was found! Redirect admin user to adminMainpage.html
    if (json.success) 
    {
      // Redirect or update UI for successful login
      console.log("Login successful!");
      window.location.href = "adminMainpage.html";
    } 
    
    //In any other case, success = false, so the login has failed. Print out the error message to the user.
    else 
    {
      // Show error message
      console.log("Login failed:", json.message);

      const loginMessage = document.getElementById("login-message");
            loginMessage.textContent = json.message || "Invalid credentials. Please try again.";  // Display the error message
            loginMessage.style.display = "block";  // Make the error message visible
            loginMessage.className = "error";  // Add error styling class
      
    }
  })
  .catch(error => {
    console.error("Error during fetch:", error);
    const loginMessage = document.getElementById("login-message");
    loginMessage.textContent = "An error occurred. Please try again later.";  // Display error message
    loginMessage.style.display = "block";  // Make the error message visible
    loginMessage.className = "error";  // Add error styling class
  });
});

/*
userLogin.addEventListener("click", async (event) => {
  window.location.href = "login.html";

});

*/