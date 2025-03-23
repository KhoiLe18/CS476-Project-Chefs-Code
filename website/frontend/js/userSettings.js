// Display user's first name, last name, and current email
document.addEventListener('DOMContentLoaded', function() 
{
	// Get existing info
	const firstName = document.getElementById('fname');
	const lastName = document.getElementById('lname');
	const currentEmail = document.getElementById('currEmail');
	
	// Get user ID
	const userID = JSON.parse(localStorage.getItem("userId"));

	console.log(firstName, lastName, currentEmail, userID);

	const requestData = {
		userId: userID
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestData)
	}

	//Display user info
	fetch('/getUserInfo', options).then(async response => {
		const json = await response.json();
		console.log(json);

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

// Change user email
let subButton = document.getElementById("subButton");
subButton.addEventListener("click", async (event) => 
{
	event.preventDefault();
	const newEmail = document.getElementById("newEmail").value;

	//console.log(localStorage.getItem("userId"));

	const userID = localStorage.getItem('userId');

	console.log(userID);

	const requestData = {
			newEmail: newEmail,
			userID: userID
	};

	const options = {
			method: "POST",
			headers: {
					"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData)
	};

	fetch('/updateUser', options).then(async response => {
			const json = await response.json();

			////console.log(json);

			if(json.success)
			{
					alert("Email updated successfully!");
			}
			else
			{
					alert("Error updating email: " + json.message);
			}
	});
});