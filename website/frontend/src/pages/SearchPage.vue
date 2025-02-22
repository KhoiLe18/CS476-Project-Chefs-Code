<template>
  <section class="hero">
    <div class="hero-section">
      <h5>Find recipes with the ingredients you have!</h5>
      
      <form @submit.prevent="submitForm">
        <h4>Enter your ingredients, separated by commas:</h4>
        <div class="search-box">
          <input v-model="query" type="text" placeholder="(e.g., flour, banana, eggs)" />
        </div>
        
        <h3>Filters (optional):</h3>

        <div class="card flex flex-col md:flex-row justify-center space-x-5">
          <div>
            <h1 class="text-center md:text-left">Choose your cuisine preference</h1>
            <MultiSelect 
              v-model="selectedCuisines" 
              :options="cuisines" 
              optionLabel="name" 
              filter placeholder="Select Cuisines"
              :maxSelectedLabels="3" 
              size="small"
              class="w-60 md:w-60" 
            />
          </div>
          <div>
            <h1 class="text-center md:text-left">Choose your dietary requirements</h1>
            <MultiSelect 
              v-model="selectedDietaryRequirements" 
              :options="diets" 
              optionLabel="name" 
              filter placeholder="Select Dietary Requirements"
              :maxSelectedLabels="3" 
              size="small"
              class="w-60 md:w-60" 
            />
          </div>
        </div>

        <div class="card flex flex-wrap items-center justify-center gap-4">
          <Button label="Submit" severity="submit" class="mt-5" size="small" raised />
        </div>
      </form>
    </div>
  </section>

  <section class="recipes" v-if="recipes.length > 0">
    <h2>Your Search Results:</h2>
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe">
      <h3>{{ recipe.title }}</h3>
      <img :src="recipe.image" alt="Recipe image" />
      <p>{{ recipe.summary }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"; // Import Axios for HTTP requests

// State variables
const query = ref(""); // Ingredients search query
const selectedCuisines = ref([]);
const selectedDietaryRequirements = ref([]);

// Available cuisines and dietary options
const cuisines = ref([
  { name: 'African' },
  { name: 'Asian' },
  { name: 'American' },
  { name: 'British' },
  { name: 'Cajun' },
  { name: 'Caribbean' },
  { name: 'Chinese' },
  { name: 'Eastern European' },
  { name: 'European' },
  { name: 'French' },
  { name: 'German' },
  { name: 'Greek' },
  { name: 'Italian' },
  { name: 'Japanese' },
  { name: 'Jewish' },
  { name: 'Korean' },
  { name: 'Latin America' },
  { name: 'Mediterranean' },
  { name: 'Mexican' },
  { name: 'Middle Eastern' },
  { name: 'Nordic' },
  { name: 'Southern' },
  { name: 'Spanish' },
  { name: 'Thai' },
  { name: 'Vietnamese' }
]);

const diets = ref([
  { name: 'Dairy Free' },
  { name: 'FODMAP' },
  { name: 'Gluten free' },
  { name: 'Grain free' },
  { name: 'High protein' },
  { name: 'Ketogenic' },
  { name: 'Low carb' },
  { name: 'Low sodium' },
  { name: 'Paleo' },
  { name: 'Pescetarian' },
  { name: 'Primal' },
  { name: 'Vegan' },
  { name: 'Vegetarian' },
  { name: 'Whole 30' }
]);

const recipes = ref([]); // Store search results

// Function to submit the form and make the API request
const submitForm = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/search", {
      query: query.value,
      cuisines: selectedCuisines.value,
      dietaryRequirements: selectedDietaryRequirements.value
    });

    // Update the recipes state with the returned data
    recipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
</script>

<style>
/* Add your styles here */
</style>