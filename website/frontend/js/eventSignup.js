let signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", async (event) => 
 {
    event.preventDefault();

    // Get input values
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cpassword").value;
    const photo = document.getElementById("photo").files[0];

    // Validate password match
    if (password !== confirmPassword) {
        displayMessage("Passwords do not match", "error");
        return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (photo) {
        formData.append("photo", photo);
    }

    // Set up fetch options
    const options = {
        method: "POST",
        body: formData
    };

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
});

function displayMessage(message, type) {
    const messageElement = document.getElementById("signup-message");
    messageElement.textContent = message;
    messageElement.style.display = "block";
    messageElement.className = type;
}
