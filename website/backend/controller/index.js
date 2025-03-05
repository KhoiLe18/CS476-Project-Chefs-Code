const express = require ('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(express.json());

app.post('/api', async (request, response) => {
    //showing that the request has been recieved from the server end; the request has the list of ingredients in a json array! 
    //This will be requested when the 'submit' button is hit on the recipe search page. I used an event listener for this!
    console.log('I got a request!');
    console.log(request.body);
    
    const ingred = request.body.ingredients;
    console.log(ingred);

    const cuis = request.body.cuisine;
    console.log(cuis);

    const d = request.body.diet;
    console.log(d);

    const api_key = "2fad0aa51e7a4e4398d7dc8fcd94dc66";

    //now let's work on the response to send back! This is the part where we use the request data to search for recipes in the spoonacular API :)

    //so this line of code takes the recieved ingredients in the request, the api key, and the api URL to get the recipes using the fetch function
    const api_url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${ingred}&cuisine=${cuis}&diet=${d}`;
    const fetch_response = await fetch(api_url);

    //the fetched recipes have been stored in the variable fetch_response, and we now need to turn it into json data
    const json = await fetch_response.json();
    //console.log(json.results);

    //now that it is all converted, send the response back to the client that requested this data!
    response.json(json);
});

app.post('/viewRecipe', async (request, response) => {
    console.log("A recipe has been chosen!");
    console.log(request.body);

    const recipe_id = request.body.id;
    console.log(recipe_id);

    const api = "2fad0aa51e7a4e4398d7dc8fcd94dc66"; 
    const api_url = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=${api}`;
    const fetch_response = await fetch(api_url);

    const json = await fetch_response.json();
    console.log(json);

    response.json(json);
});
