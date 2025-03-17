let signupForm = document.getElementById("submit");

signupForm.addEventListener("click", async (event) => 
 {
    event.preventDefault();

    // Get input values
    const firstName = document.getElementById("fname").value;
    
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cpassword").value;
    console.log(lastName);

    // Validate password match
    /*
    if (password !== confirmPassword) {
        displayMessage("Passwords do not match", "error");
        return;
    }
    */

    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cpassword: confirmPassword
    };

    console.log("sending data", data);

    // Set up fetch options
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    fetch('/signup', options).then(async response => {
        console.log("Info Sent!!!");
    });
    {

    }
/*
    try {
        const response = await fetch("/signup", options);
        const json = await response.json();
        console.log(json);

        if (json.success) {
            console.log("Signup successful!");
            window.location.href = "index.html";
        } else {
            displayMessage(json.message || "Signup failed", "error");
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        displayMessage("An error occurred. Please try again.", "error");
    }
    */
});

function displayMessage(message, type) {
    const messageElement = document.getElementById("signup-message");
    messageElement.textContent = message;
    messageElement.style.display = "block";
    messageElement.className = type;
}
