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