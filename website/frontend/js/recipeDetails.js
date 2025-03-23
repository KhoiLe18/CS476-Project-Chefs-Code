document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const recipeContainer = document.getElementById('recipe-container');
    const errorContainer = document.getElementById('error-container');

    try {
        // Retrieve recipe data from localStorage
        const recipeData = JSON.parse(localStorage.getItem('recipeDetails'));
        
        if (!recipeData) {
            showError();
            return;
        }
        
        // Display the recipe data
        displayRecipe(recipeData);
        
    } catch (error) {
        console.error('Error processing recipe data:', error);
        showError();
    }
    
    function showError() {
        loadingElement.style.display = 'none';
        errorContainer.style.display = 'block';

        // Add event listener after the button is available in the DOM
        const favButton = document.getElementById("favBut");
        if (favButton) {
            favButton.addEventListener('click', handleFavoriteClick);
        } else {
            console.error("Favorite button (error page) not found.");
        }
    }

    function displayRecipe(recipe) {
        let html = `
            <div class="recipe-container">
                <header class="recipe-header">
                    <h1 class="recipe-title">${recipe.title}</h1>
                    <div class="recipe-meta">
                        <span>Ready in: ${recipe.readyInMinutes || 'N/A'} minutes</span>
                        <span>Servings: ${recipe.servings || 'N/A'}</span>
                        ${recipe.sourceName ? `<span>Source: ${recipe.sourceName}</span>` : ''}
                    </div>
                </header>
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                
                <div class="recipe-content">
                    <div class="recipe-ingredients">
                        <h2>Ingredients</h2>
                        <ul>`;

        if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
            recipe.extendedIngredients.forEach(ingredient => {
                html += `<li>${ingredient.original || ingredient.originalString || ingredient.name}</li>`;
            });
        } else {
            html += `<li>Ingredients not available</li>`;
        }

        html += `
                        </ul>
                    </div>
                    
                    <div class="recipe-instructions">
                        <h2>Instructions</h2>`;

        if (recipe.instructions) {
            html += `<div>${recipe.instructions}</div>`;
        } else if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
            html += `<ol>`;
            recipe.analyzedInstructions[0].steps.forEach(step => {
                html += `<li>${step.step}</li>`;
            });
            html += `</ol>`;
        } else {
            html += `<p>No instructions available.</p>`;
        }

        html += `
                    </div>
                </div>
                <footer class="recipe-footer">
                    <a href="index.html" class="back-button">Back to Search</a> 
                    <button type="button" class="back-button" id="favBut">Add to favorites</button>
                </footer>
            </div>`;

        // Insert the HTML into the container
        recipeContainer.innerHTML = html;

        // Hide loading, show recipe
        loadingElement.style.display = 'none';
        recipeContainer.style.display = 'block';

        // Add event listener for the dynamically added button
        const favButton = document.getElementById("favBut");
        if (favButton) {
            favButton.addEventListener('click', handleFavoriteClick);
        } else {
            console.error("Favorite button (recipe page) not found.");
        }
    }


    //This is the event handler for the favourite button
    //it will send a request to the backend to save the recipe to the user's favourites list!
    function handleFavoriteClick() {
        const recipeDetails = JSON.parse(localStorage.getItem('recipeDetails'));
        const userId = localStorage.getItem('userId');

        if (recipeDetails && userId) 
        {
            //test to make sure the right ids are being sent
            //console.log("Recipe ID:", recipeDetails.id);
            //console.log("User ID:", userId);

            //make a call to the backend end point for adding the recipe to the user's favourite page
            const requestData = {
                recipeId: recipeDetails.id,
                userId: userId
            };
        
            // set up the options for the post method, which requests data to our end point in the backend in index.js
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(data)
                body: JSON.stringify(requestData)
            };
            
            fetch('/addfavourites', options)
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    alert("Recipe added to favorites!");
                } 
                
                else 
                {
                    alert(json.message); // Shows "Recipe is already in favorites" if it's a duplicate
                }
            })
            .catch(error => {
                console.error("Error adding recipe to favorites:", error);
                alert("Failed to add recipe to favorites.");
            });
        } 

        else 
        {
            console.error("Missing recipe details or user ID.");
        }
    }
});
