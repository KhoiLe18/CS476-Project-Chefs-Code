

document.addEventListener("DOMContentLoaded", async function() {

    console.log("Favourites page loaded! User logged in is ", localStorage.getItem("userId"));

    // Get the user's favourite recipes
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (!userId) {
        alert("User not logged in.");
        return;
    }

    try {
        const response = await fetch('/favourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        const recipes = await response.json();
        console.log("Favourite Recipes:", recipes);

        const favouritesList = document.querySelector(".listofjoke");
        favouritesList.innerHTML = ""; // Clear existing content

        recipes.forEach(recipe => {
            // Create the recipe element dynamically
            const recipeElement = document.createElement("section");
            recipeElement.classList.add("recipe-card");

            // Add unique ID for the "Unfavorite" button
            const unfavButton = document.createElement("button");
            unfavButton.type = "button";
            unfavButton.classList.add("removeBut");
            unfavButton.id = `removeBut-${recipe.id}`; // Unique ID for the button
            unfavButton.textContent = "Unfavorite";

            // Add the click event listener to handle removing from favourites
            unfavButton.addEventListener("click", async function() {
                await removeFromFavourites(recipe.id);
                // Remove the recipe element from the DOM after unfavoriting
                recipeElement.remove();
            });

            // Create the rest of the recipe details
            recipeElement.innerHTML = `
                <h2>
                    <a class="detailpage" href="#" data-recipe-id="${recipe.id}">${recipe.title}</a>
                </h2>
                <article>
                    <h3>Instructions:</h3>
                    <p>${recipe.instructions}</p>
                </article>
            `;
            recipeElement.prepend(unfavButton); // Add the unfav button to the top of the recipe

            favouritesList.appendChild(recipeElement);

            // Attach event listener to each recipe link for viewing detailed info
            document.querySelectorAll(".detailpage").forEach(link => {
                link.addEventListener("click", async (event) => {
                    event.preventDefault();
                    const recipeId = event.target.getAttribute("data-recipe-id");

                    // Call /viewRecipe to get detailed info and redirect to recipeDetails.html
                    const res = await fetch('/viewRecipe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: recipeId })
                    });

                    const recipeData = await res.json();
                    localStorage.setItem("recipeDetails", JSON.stringify(recipeData));
                    window.location.href = "recipeDetails.html";
                });
            });

        });

    } catch (error) {
        console.error("Error fetching favourites:", error);
    }
});


//This function will be called when the user clicks on the "unfavorite" button
async function removeFromFavourites(recipeId) {
    const userId = JSON.parse(localStorage.getItem("userId"));

    if (!userId) {
        alert("User not logged in.");
        return;
    }

    try {
        // Send a request to the backend to remove the recipe from favourites
        const response = await fetch('/removeFromFavourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, recipeId })
        });

        const result = await response.json();
        console.log("Removed from favourites:", result);
    } catch (error) {
        console.error("Error removing from favourites:", error);
    }
}
