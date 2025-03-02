document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const recipeContainer = document.getElementById('recipe-container');
    const errorContainer = document.getElementById('error-container');
    //const IloveMyBF = document.getElementById('IloveMyBF');
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
    }
    
    function displayRecipe(recipe) {
        // Create HTML for recipe details
        let html = `
            <div class="recipe-container">
                <header class="recipe-header">
                    <h1 class="recipe-title">${recipe.title}</h1>
                    <div class="recipe-meta">
                        <span>Ready in: ${recipe.readyInMinutes || 'N/A'} minutes</span>
                        <span>Servings: ${recipe.servings || 'N/A'}</span>
                        <span>Health Score: ${recipe.healthScore || 'N/A'}/100</span>
                        ${recipe.sourceName ? `<span>Source: ${recipe.sourceName}</span>` : ''}
                    </div>`;
        
        // Add diet tags if available
        if (recipe.diets && recipe.diets.length > 0) {
            html += `<div class="diets-tags">`;
            recipe.diets.forEach(diet => {
                html += `<span class="diet-tag">${formatDietName(diet)}</span>`;
            });
            html += `</div>`;
        }
        
        html += `
                </header>
                
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                
                <div class="recipe-content">
                    <div class="recipe-ingredients">
                        <h2>Ingredients</h2>
                        <ul>`;
        
        // Add ingredients
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
        
        // Add instructions
        if (recipe.instructions) {
            // If instructions are in HTML format
            html += `<div>${recipe.instructions}</div>`;
        } else if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
            // If instructions are in steps format
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
                </div>`;
        
        // Add nutrition information if available
        if (recipe.nutrition && recipe.nutrition.nutrients) {
            html += `
                <div class="nutrition-info">
                    <h2>Nutrition Information</h2>
                    <div class="nutrition-grid">`;
            
            const keyNutrients = ['Calories', 'Fat', 'Carbohydrates', 'Protein', 'Fiber', 'Sugar', 'Sodium', 'Cholesterol'];
            
            recipe.nutrition.nutrients.forEach(nutrient => {
                if (keyNutrients.includes(nutrient.name)) {
                    html += `
                        <div class="nutrition-item">
                            <div class="nutrition-value">${Math.round(nutrient.amount)} ${nutrient.unit}</div>
                            <div class="nutrition-name">${nutrient.name}</div>
                        </div>`;
                }
            });
            
            html += `
                    </div>
                </div>`;
        }
        
        html += `
                <footer class="recipe-footer">
                    <a href="index.html" class="back-button">Back to Search</a>
                </footer>
            </div>`;
        
        // Insert the HTML into the container
        recipeContainer.innerHTML = html;
        
        // Hide loading, show recipe
        loadingElement.style.display = 'none';
        recipeContainer.style.display = 'block';
    }
    
    function formatDietName(dietName) {
        // Format diet names for display (e.g., "gluten-free" becomes "Gluten-Free")
        return dietName.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('-');
    }
});