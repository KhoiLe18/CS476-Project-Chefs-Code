document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchForm");
    const inputField = document.getElementById("ingredientsInput");
    const resultsContainer = document.getElementById("results");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const ingredients = inputField.value.trim();
        
        if (ingredients) {
            console.log("User entered ingredients:", ingredients);
            resultsContainer.textContent = `You searched for: ${ingredients}`;
        } else {
            console.log("No ingredients entered.");
            resultsContainer.textContent = "Please enter some ingredients.";
        }
    });
});