let loginButton = document.getElementById("subButton");

loginButton.addEventListener("click", async (event) => {

    // get input in username input bar, and save it in variable username
    const username = document.getElementById("uname").value;
    console.log(username);
    // get input from password search bar
    const password = document.getElementById("pwd").value;
    console.log(password);

    // put all input into an object to send away to the backend api recipe fetch function
    const requestData = {
        username: username,
        password: password
    };

    // console.log(requestData)
    // set up the options for the post method, which requests data to our end point in the backend called /api in index.js
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(data)
        body: JSON.stringify(requestData)
    };
    fetch('/adminLogin', options).then(async response => {
        
        const json = await response.json();

        console.log(json.results);
    });
});