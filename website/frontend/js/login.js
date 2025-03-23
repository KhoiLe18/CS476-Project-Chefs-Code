let loginButton = document.getElementById("login");

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    // get input in username input bar, and save it in variable username
    const email = document.getElementById("email").value;
    ////console.log(username);
    // get input from password search bar
    const password = document.getElementById("password").value;
    ////console.log(password);

    // put all input into an object to send away to the backend api recipe fetch function
    const data = {
        email: email,
        password: password
    };

    // //console.log(requestData)
    // set up the options for the post method, which requests data to our end point in the backend called /admiLogin in index.js
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    ////console.log("Is it working here...?");
    fetch('/login', options).then(async response => {

    //Get the response in json format and save it into variable json. 
    //The response will let us know if there was a username + password combo match in our database! (check backend for this logic)
    const json = await response.json();
    //console.log(json);  // Log the entire response object first to see what we're working with
    
    // Handle the response appropriately
    //if success was sent back as true, then a match was found! Save the user id of the person who has logged in into local storage and redirect user to index.html
    if (json.success) 
    {
      // Redirect or update UI for successful login
      //console.log("Login successful!");
      window.location.href = "index.html";
    } 
    
    //In any other case, success = false, so the login has failed. Print out the error message to the user.
    else 
    {
      // Show error message
      //console.log("Login failed:", json.message);

      const loginMessage = document.getElementById("login-message"); 
        loginMessage.textContext = "Does this work?";
        loginMessage.style.display = "block";
        loginMessage.className = "error";
      
    }
  })
  .catch(error => {
    console.error("Error during fetch:", error);
  });
});