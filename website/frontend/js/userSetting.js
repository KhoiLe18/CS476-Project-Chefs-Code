document.addEventListener('DOMContentLoaded', function() {
    const firstName = document.getElementById('fname');
    const lastName = document.getElementById('lname');
    const email = document.getElementById('email');
    console.log(firstName, lastName, email);

    const userId = localStorage.getItem('userId');
    console.log(userId);

    const requestData = {
        userId: userId
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
    };

    
    fetch('/getUser', options).then(async response => {
        const json = await response.json();

        if(json.success)
        {
            firstName.textContent = json.firstName;
            lastName.textContent = json.lastName;
            email.textContent = json.email;
        }
        else
        {
            alert("Error getting user data: " + json.message);
        }
    });
    
});



let subButton = document.getElementById("subButton");
//console.log(subButton);

subButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("newEmail").value;

    console.log(email);
    console.log(localStorage.getItem("userId"));

    const userId = localStorage.getItem('userId');

    console.log(userId);

    const requestData = {
        newEmail: email,
        userId: userId
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

        //console.log(json);

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

