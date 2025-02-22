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
              filter
              placeholder="Select Cuisines"
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
              filter
              placeholder="Select Dietary Requirements"
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

  <section class="recipes">
    <h2>Your Search Results:</h2>
    <div v-if="recipes.length > 0">
      <div v-for="recipe in recipes" :key="recipe.id">
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="recipe image" />
        <p>{{ recipe.summary }}</p>
      </div>
    </div>
    <div v-else>
      <p>No recipes found.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const query = ref("");
const selectedCuisines = ref([]);
const selectedDietaryRequirements = ref([]);
const recipes = ref([]);

const cuisines = ref([
  { name: "African" },
  { name: "Asian" },
  { name: "American" },
  // Add all your cuisines here...
]);

const diets = ref([
  { name: "Dairy Free" },
  { name: "FODMAP" },
  { name: "Gluten free" },
  // Add all your dietary requirements here...
]);

const submitForm = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/search", {
      query: query.value,
      cuisines: selectedCuisines.value,
      dietaryRequirements: selectedDietaryRequirements.value,
    });

    // Set the recipes with the response data
    recipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
</script>

<style scoped>
/* Your styles here */
</style>