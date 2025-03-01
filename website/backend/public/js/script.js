
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".submit-button").addEventListener("click", function() {
        const ingredient = document.querySelector(".search-bar").value;
        const cuisine = document.querySelector(".dropdown:first-of-type").value;
        const dietary = document.querySelector(".dropdown:last-of-type").value;
        
        console.log("Searching for recipes with:");
        console.log("Ingredient:", ingredient);
        console.log("Cuisine Type:", cuisine);
        console.log("Dietary Restriction:", dietary);
        
        // Placeholder for fetching and displaying recipes
        document.querySelector(".results-container").innerHTML = `<p>Searching recipes with ${ingredient}, ${cuisine}, ${dietary}...</p>`;
    });
    
    // Add event listener for cancel button to close the dashboard
    document.querySelector(".cancel-button").addEventListener("click", function() {
        document.getElementById("sidebar").classList.remove("show");
    });
});

//make an event listener to send ingredient, cuisine, and diet input to backend api function
let searchButton = document.getElementById("subButton");

searchButton.addEventListener("click", async (event) =>{

    //get input in ingredient search bar, and save it in variable ingredients
    const ingredients = document.getElementById("ingredInput").value;

    //get input from cuiseine drop bar
    const cuisine = document.getElementById("cuisine").value;

    //get input from dietary drop bar
    const diet = document.getElementById("diet").value;

    //put all input into an object to send away to the backend api recipe fetch function
    const requestData = {
        ingredients: ingredients,
        cuisine: cuisine,
        diet: diet
    };

    //console.log(requestData)
    //set up the options for the post method, which requests data to our end point in the backend called /api in index.js
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        //body: JSON.stringify(data)
        body: JSON.stringify(requestData)
    };
    fetch('/api', options).then( async response => {
        //const response = await fetch("/api", options);
        const json = await response.json();

        console.log(json.results);
        //get the div for the found recipes to go in
        const recipes = document.getElementById("results");

        //if there are no matching recipes, print out the following message
        if(json.results.length === 0)
        {
            recipes.innerHTML = "No recipes found! Make sure your spelling is correct, or try fewer ingredients!";
        }

        else
        {
            //in the div saved in 'recipes', start printing out and displaying the fetched data from our spoonacular API 
            json.results.forEach( recipe => {
                const recipeItem = document.createElement("div");

                //get recipe title and save it in a header
                const recipeTitle = document.createElement("h3");
                recipeTitle.textContext = recipe.title;

                //get the recipe's image and save it in an img
                const recipeImage = document.createElement("img");
                recipeImage.src = recipe.image;

                recipe.alt = recipe.title;
                const recipeLink = document.createElement("a");

                //this is for the 'view recipe' link: when a user clicks this, the recipe ingredients and instructions will pop up!
                recipeLink.href = "#";
                recipeLink.textContent = recipe.title;

                recipeLink.onclick = async function()
                {
                    //console.log(recipe.id);
                    fetch('/viewRecipe', )
                }

                //Append all of the important recipe bits onto recipeItem, and append recipeItem onto the bottom of out webpage 
                recipes.appendChild(recipeItem);
                recipeItem.appendChild(recipeImage);
                recipes.appendChild(recipeLink);
            })
        }
    });
});
