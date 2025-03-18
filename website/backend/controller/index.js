const express = require ('express');
const fetch = require('node-fetch');
const path = require('path');
const pool = require('../model/db');
const cors = require('cors');

const app = express();
app.listen(4000, () => console.log('listening at 3001'));
app.use(express.json());

// Temporarily set adminPage.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
});

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use(cors());
const RECAPTCHA_SECRET_KEY = "6LcBx_AqAAAAACo903p3VZdmdWw7nx6M4QJYfX-9";

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

    const api_key = "ba301abd0b6042e693747db118d36891";

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

    const api = "ba301abd0b6042e693747db118d36891"; 
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



// GET users endpoint - retrieve all users with optional search filtering
app.get('/api/users', async (req, res) => {
    const searchTerm = req.query.search || '';
    
    try 
    {
        const conn = await pool.getConnection();
        let query = 'SELECT user_id, first_name, last_name, email FROM Users';
        
        if (searchTerm) 
        {
            // Add search condition if there's a search term
            query += ' WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
            const searchParam = `%${searchTerm}%`;
            const rows = await conn.query(query, [searchParam, searchParam, searchParam]);
            conn.release();
            res.json(rows);
        } 
        else 
        {
            // Get all users if no search term
            const rows = await conn.query(query);
            conn.release();
            res.json(rows);
        }
    } 
    
    catch (err) 
    {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// DELETE user endpoint - delete a specific user by ID
app.delete('/api/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const conn = await pool.getConnection();
        
        // First get the user information before deleting
        const userQuery = 'SELECT first_name, last_name, user_id FROM Users WHERE user_id = ?';
        const userInfo = await conn.query(userQuery, [userId]);
        console.log("USER INFO IS ", userInfo);
        
        if (userInfo.length === 0) {
            conn.release();
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Store user info
        const fullName = `${userInfo[0].first_name} ${userInfo[0].last_name}`;
        const userid = userInfo[0].user_id;
        //console.log(userid, " is the user id!!!");

        //delete the user's favourited recipes from the favourites table
        const deleteFavouritesQuery = 'DELETE FROM favourites WHERE user_id = ?';
        const results = await conn.query(deleteFavouritesQuery, [userId]);
        
        // Once the favourites associated with this user are gone, we can delete the user
        const deleteQuery = 'DELETE FROM Users WHERE user_id = ?';
        const result = await conn.query(deleteQuery, [userId]);
        conn.release();

        //console.log("USER INFO AFTER DATABASE DELETION: ", fullName);
        
        if (result.affectedRows > 0) {
            // Store deletion message in a session or database
            // You can use a simple storage approach or database table
            app.locals.deletedUserMessage = `${fullName} has been deleted by the admin`;
            
            res.json({ 
                success: true, 
                message: 'User deleted successfully',
                deletedUser: fullName
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});



app.post('/signup', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const recaptcha = req.body.recaptcha;

    if (!recaptcha) {
        return res.status(400).json({ success: false, message: "Please complete reCAPTCHA" });
    }

    
        const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify`;
        const recaptchaResponse = await fetch(recaptchaURL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptcha}`  // Correct template literal usage
        });

        const recaptchaJson = await recaptchaResponse.json();

        if (!recaptchaJson.success) {
            return res.status(400).json({ success: false, message: "reCAPTCHA verification failed" });
        }
        try {
        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
           return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }
        
        //Check if email already exists
        const conn = await pool.getConnection();
        const query = "SELECT * FROM Users WHERE email = ?";
        const existingUser = await conn.query(query, [email]);
        conn.release();

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Save the user in the database
        const insertQuery = "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        const conn2 = await pool.getConnection();
        await conn2.query(insertQuery, [firstName, lastName, email, password]);
        conn2.release();

        // Respond with success
        res.json({ success: true, message: "Signup successful" });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "An error occurred. Please try again" });
    }
});


//FOR USER LOGIN
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   

    try
    {
        //connect to the database
        const conn = await pool.getConnection();
        const query = "SELECT * FROM Users WHERE email = ? AND password = ?";
        const rows = await conn.query(query, [email, password]);
        console.log("Here are the rows: ", rows.length);
        conn.release();
        
        if (rows.length > 0)
        {
            res.json({success: true, message: "Login successful", user_id: rows[0].user_id});
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


//FOR ADDING A FAVOURITE RECIPE TO USER FAVOURITES
app.post('/addfavourites', async (req, res) => {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;

    try {
        const conn = await pool.getConnection();

        //first, check if this recipe is already inserted in the database for this user
        // Check if the recipe is already in the user's favorites
        const checkQuery = "SELECT * FROM favourites WHERE recipe_id = ? AND user_id = ?";
        const rows = await conn.query(checkQuery, [recipeId, userId]);

        if (rows.length > 0) {
            conn.release();
            console.log("recipe is already in favourites");
            res.json({ success: false, message: "Recipe is already in favorites" });
        }

        //else, we can continue to insert the recipe into the database
        else
        {
            const query = "INSERT INTO favourites (recipe_id, user_id) VALUES (?, ?)";
            await conn.query(query, [recipeId, userId]);
            conn.release();
    
            res.json({ success: true, message: "Recipe added to favourites" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Database query failed" });
    }
});


//FOR DISPLAYING A USER'S FAVOURITED RECIPES
app.post('/favourites', async (req, res) => {
    const userId = req.body.userId;

    try {
        const conn = await pool.getConnection();
        const query = "SELECT recipe_id FROM favourites WHERE user_id = ?";
        const rows = await conn.query(query, [userId]);
        conn.release();

        if (rows.length === 0) {
            return res.json([]);
        }

        const api_key = "ba301abd0b6042e693747db118d36891"; 

        // Fetch recipe details for each favourited recipe
        const recipeDetails = await Promise.all(rows.map(async (row) => {
            const api_url = `https://api.spoonacular.com/recipes/${row.recipe_id}/information?apiKey=${api_key}`;
            const fetch_response = await fetch(api_url);
            const recipeData = await fetch_response.json();

            return {
                id: row.recipe_id,
                title: recipeData.title,
                instructions: recipeData.instructions,
            };
        }));

        res.json(recipeDetails);

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Database query failed" });
    }
});



//FOR DELETING A FAVOURITES RECIPE FROM USER FAVOURITES
app.post('/removeFromFavourites', async (req, res) => {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;

    try {
        const conn = await pool.getConnection();
        const query = "DELETE FROM favourites WHERE recipe_id = ? AND user_id = ?";
        const result = await conn.query(query, [recipeId, userId]);
        conn.release();

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Recipe removed from favourites" });
        } else {
            res.json({ success: false, message: "Recipe not found in favourites" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Database query failed" });
    }
});


// FOR UPDATE USER INFO
// Display user info:
  // first_name
  // last_name
  // email
// Options:
  // Change first name
	// Change last name
	// Change email
	// Change password
	// Delete account