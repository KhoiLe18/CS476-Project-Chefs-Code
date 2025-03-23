document.addEventListener('DOMContentLoaded', function() {
	// Get existing info
	const firstName = document.getElementById('fname');
	const lastName = document.getElementById('lname');
	const currentEmail = document.getElementById('currEmail');
	
	// Get user ID
	const userID = localStorage.getItem("userId");

	console.log(firstName, lastName, currentEmail, userID);

	const requestData = {
		userID: userID
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestData)
	}

	fetch('/getUserInfo', options).then(async response => {
		const json = await response.json();

		if(json.success) {
			firstName.textContent = json.firstName;
			lastName.textContent = json.lastName;
			currentEmail.textContent = json.email;
		}
		else {
			alert("Error getting user data: " + json.message);
		}
	});
});

let subButton = document.getElementById("subButton");

subButton.addEventListener("click", async (event) => 
{
	event.preventDefault();

	// Get user ID
	const userID = localStorage.getItem("userId");

	// Get input values
	const newEmail = document.getElementById("newEmail").value;
	console.log(newEmail);
	console.log(userID);
});