const API = "0652000f796c48bdb6a8926b2ea84ef2";

async function RecipeFinder() 
{
    //use milk as an example query! Think of this as a user's input in a search bar
    const searchQuery = "pasta";
    try 
    {
        //this fetch function uses the spoonacular URL, API, and ingredient query to fetch recipes from spoonacular
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&query=${searchQuery}`);

        //make the response from the API into a json object so we can print everything out onto the website
        const data = await response.json();

        //get the div in the HTML code to display the results stored in data
        const recipes = document.getElementById("results");

        //if there are no matching recipes, print out the following message
        if(data.results.length === 0)
        {
            recipes.innerHTML = "No recipes found";
        }
        
        else 
        {
            //in the div saved in 'recipes', start printing out and displaying the fetched data from our spoonacular API 
            recipes.innerHTML = "<h2>Found Recipes:</h2>";

            //Use a loop to do the following for each found recipe (note, data.results will give us a recipe fetched from the API, so we save this object in variable "recipe")
            data.results.forEach(recipe => {
                console.log(recipe);
                const recipeItem = document.createElement("div");

                //get recipe's title and save it in a header
                const recipeTitle = document.createElement("h3");
                recipeTitle.textContent = recipe.title;

                //get the recipe's image and save it in an img
                const recipeImage = document.createElement("img");
                recipeImage.src = recipe.image;

                recipe.alt = recipe.title;
                const recipeLink = document.createElement("a");

                //this is for the 'view recipe' link: when a user clicks this, the recipe ingredients and instructions will pop up!
                recipeLink.href = "#";
                recipeLink.textContent = "View Recipe";
                //This is an event; when the user clicks on 'view recipe', a new function will be called. This function will take the recipe id from spoonacular API so we can 
                //use that recipe in our function to display all of the ingredients and instructions!
                recipeLink.onclick = async function()
                {
                    await showRecipeDetails(recipe.id);
                }

                //Append all of the important recipe bits onto recipeItem, and append recipeItem onto the bottom of out webpage 
                recipeItem.appendChild(recipeImage);
                recipeItem.appendChild(recipeTitle);
                recipeItem.appendChild(recipeLink);
                recipes.appendChild(recipeItem);
            });
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


//this function will display all of the ingredients and instructions when the 'view recipe' link is clicked!
async function showRecipeDetails(recipeId)
{
    //get the appropriate divs from the HTML code
    const recipeDetailsDiv = document.getElementById("recipe-details");
    const recipeContentDiv = document.getElementById("recipe-content");

    try
    {
        //fetch the appropriate recipe using the recipe id and the API key
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API}`);

        //turn the returnd data into json objects and save the array of json objects into recipeData variable
        const recipeData = await response.json();

        //now use recipeData to display the ingredients and instructions on the webpage
        recipeContentDiv.innerHTML = `
            <h2>${recipeData.title}</h2>
            <p><strong>Ingredients:</strong> ${recipeData.extendedIngredients.map(ingredient=>ingredient.original).join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipeData.instructions}</p>
        `;
        recipeDetailsDiv.style.display = "flex";
    }
    catch(error)
    {
        console.error("error fetching recipe details:", error);
    }
}

// Call the function when the page loads
window.onload = RecipeFinder;
