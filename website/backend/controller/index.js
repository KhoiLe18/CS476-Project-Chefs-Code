const express = require ('express');
const fetch = require('node-fetch');
const path = require('path');
const pool = require('../model/db');
const cors = require('cors');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
//app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(express.json());

// Temporarily set adminPage.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/adminPage.html'));
});

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use(cors());


//FOR FETCHING RECIPE MATCHES ACCORDING TO INPUTTED INGREDIENTS, CUISINES, AND DIETARY RESTRICTIONS
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


//FOR LOADING THE RECIPE DATA SELECTED IN MAIN RECIPE SEARCH PAGE
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


//FOR ADMIN LOGIN
app.post('/adminLogin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);  
    console.log(password);

    try
    {
        //connect to the database
        const conn = await pool.getConnection();
        console.log("Conected to mariaDB...");
        //make query and put in the username and password sent in from the frontend
        const query = "SELECT * FROM Admins WHERE username = ? AND password = ?";
        const rows = await conn.query(query, [username, password]);
        console.log("Here are the rows: ", rows.length);
        conn.release();
        
        if (rows.length > 0)
        {
            res.json({success: true, message: "Login successful"});
            console.log("Credentials Valid!! :)", res.message)
        }
        else
        {
            res.json({success: false, message: "Invalid credentials"});
            console.log("Invalid credentials", res.message)
        }
    }

    catch (err)
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Database query failed" });
    }
        
});

// Add these endpoints to your existing Express app

// GET users endpoint - retrieve all users with optional search filtering
app.get('/api/users', async (req, res) => {
    const searchTerm = req.query.search || '';
    
    try {
        const conn = await pool.getConnection();
        let query = 'SELECT user_id, first_name, last_name, email, profile_photo FROM Users';
        
        if (searchTerm) {
            // Add search condition if there's a search term
            query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
            const searchParam = `%${searchTerm}%`;
            const rows = await conn.query(query, [searchParam, searchParam, searchParam]);
            conn.release();
            res.json(rows);
        } else {
            // Get all users if no search term
            const rows = await conn.query(query);
            conn.release();
            res.json(rows);
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// DELETE user endpoint - delete a specific user by ID
app.delete('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const conn = await pool.getConnection();
        const query = 'DELETE FROM Users WHERE user_id = ?';
        const result = await conn.query(query, [userId]);
        conn.release();
        
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});