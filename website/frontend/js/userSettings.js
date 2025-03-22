let subButton = document.getElementById("subButton");

subButton.addEventListener("click", async (event) => 
{
	event.preventDefault();

	// Get input values
	const newEmail = document.getElementById("newEmail").value;
	console.log(newEmail);
});