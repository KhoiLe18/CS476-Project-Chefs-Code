// to open and close the sidebar menu
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");

sidebarClose.addEventListener("click", () => 
    sidebar.classList.toggle("close"))


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

searchButton.addEventListener("click", async (event) => {
    // Clear previous results
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    
    // Add loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "no-results";
    loadingIndicator.textContent = "Searching for recipes...";
    resultsContainer.appendChild(loadingIndicator);

    // get input in ingredient search bar, and save it in variable ingredients
    const ingredients = document.getElementById("ingredInput").value;

    // get input from cuisine drop bar
    const cuisine = document.getElementById("cuisine").value;

    // get input from dietary drop bar
    const diet = document.getElementById("diet").value;

    // put all input into an object to send away to the backend api recipe fetch function
    const requestData = {
        ingredients: ingredients,
        cuisine: cuisine,
        diet: diet
    };

    // set up the options for the post method, which requests data to our end point in the backend called /api in index.js
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(data)
        body: JSON.stringify(requestData)
    };
    
    try {
        const response = await fetch('/api', options);
        const json = await response.json();
        
        // Clear loading indicator
        resultsContainer.innerHTML = "";
        
        console.log(json.results);

        // if there are no matching recipes, print out the following message
        if (!json?.results || json.results.length === 0) {
            const noResults = document.createElement("div");
            noResults.className = "no-results";
            noResults.innerHTML = `
                <i class="fa-solid fa-face-sad-tear"></i>
                <p>No recipes found! Make sure your spelling is correct, or try fewer ingredients!</p>
            `;
            resultsContainer.appendChild(noResults);
        } else {
            // Add a small delay between each card animation
            let delay = 0;
            
            // in the div saved in 'results', start printing out and displaying the fetched data from our spoonacular API 
            json.results.forEach(recipe => {
                // Create recipe card
                const recipeCard = document.createElement("div");
                recipeCard.className = "recipe-card";
                recipeCard.style.animationDelay = `${delay}ms`;
                delay += 100; // Stagger animation
                
                // Create recipe image
                const recipeImage = document.createElement("img");
                recipeImage.src = recipe.image;
                recipeImage.alt = recipe.title;
                recipeImage.className = "recipe-image";
                
                // Create content container
                const recipeContent = document.createElement("div");
                recipeContent.className = "recipe-content";
                
                // Create recipe title/link
                const recipeLink = document.createElement("a");
                recipeLink.className = "recipe-title";
                recipeLink.href = "#";
                recipeLink.textContent = recipe.title;
                
                // Handle recipe click
                recipeLink.onclick = async function (event) {
                    event.preventDefault();
                    
                    // Change link text to indicate loading
                    const originalText = recipeLink.textContent;
                    recipeLink.textContent = "Loading recipe...";
                    
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: recipe.id })
                    };
                    
                    try {
                        const response = await fetch('/viewRecipe', options);
                        const json = await response.json();
                        console.log("Here are the results!");
                        console.log(json.instructions);

                        // Save recipe data to localStorage so the details page can access it
                        localStorage.setItem('recipeDetails', JSON.stringify(json));
            
                        // Now navigate to the recipe page
                        window.location.href = 'recipeDetails.html';
                    } catch (error) {
                        console.error("Error fetching recipe details:", error);
                        recipeLink.textContent = originalText;
                        alert("Failed to load recipe details. Please try again.");
                    }
                };
                
                // Assemble the recipe card
                recipeContent.appendChild(recipeLink);
                recipeCard.appendChild(recipeImage);
                recipeCard.appendChild(recipeContent);
                resultsContainer.appendChild(recipeCard);
            });
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsContainer.innerHTML = "";
        
        const errorMessage = document.createElement("div");
        errorMessage.className = "no-results";
        errorMessage.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>Something went wrong while searching for recipes. Please try again later.</p>
        `;
        resultsContainer.appendChild(errorMessage);
    }
});