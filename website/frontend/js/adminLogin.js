let loginButton = document.getElementById("subButton");

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
    const json = await response.json();
    console.log(json);  // Log the entire response object first
    
    // Handle the response appropriately
    if (json.success) 
    {
      // Redirect or update UI for successful login
      console.log("Login successful!");
      window.location.href = "adminMainpage.html";
    } 
    else 
    {
      // Show error message
      console.log("Login failed:", json.message);

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