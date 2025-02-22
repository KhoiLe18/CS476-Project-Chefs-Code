const express = require('express');
const axios = require('axios');
const ejs = require ('ejs');

const app = express();
const api_Key = "0652000f796c48bdb6a8926b2ea84ef2";

app.use(express.urlencoded({extended: false}));

app.get('/', (request, res) => {res.render('index')});

app.post('/search', async(req, res) => {
    const {query} = req.body
    const response = await axios.get(https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${api_Key})
    const recipes = response.data.results;
    res.render('results', {recipes});
})

app.get('/recipe/:id', async(req, res) => {
    const {id} = req.params;
    const response = await axios.get(https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_Key})
    const recipe = response.data;
    res.render('recipe', {recipe})

})

const port = 3000;
 app.listen(port, () => {console.log('Server is running...')});