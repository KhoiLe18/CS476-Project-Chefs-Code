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