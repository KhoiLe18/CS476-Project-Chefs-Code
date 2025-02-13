<!-- frontend/src/components/SearchPage.vue -->
<template>
  <div class="search-page">
    <h2>Search Recipes</h2>
    <form @submit.prevent="searchRecipes">
      <div>
        <input
          v-model="ingredients"
          placeholder="Enter ingredients (comma separated)"
          required
        />
      </div>
      <div class="filters">
        <label>
          <input type="checkbox" v-model="filters.vegan" /> Vegan
        </label>
        <label>
          <input type="checkbox" v-model="filters.vegetarian" /> Vegetarian
        </label>
        <label>
          <input type="checkbox" v-model="filters.dairyFree" /> Dairy-Free
        </label>
        <label>
          <input type="checkbox" v-model="filters.nutFree" /> Nut-Free
        </label>
        <label>
          <input type="checkbox" v-model="filters.noBeef" /> No Beef
        </label>
        <label>
          <input type="checkbox" v-model="filters.noPork" /> No Pork
        </label>
      </div>
      <button type="submit">Search</button>
    </form>
    <div v-if="recipes.length" class="results">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="Recipe Image" />
        <router-link :to="`/recipe/${recipe.id}`">View Recipe</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      ingredients: '',
      recipes: [],
      filters: {
        vegan: false,
        vegetarian: false,
        dairyFree: false,
        nutFree: false,
        noBeef: false,
        noPork: false
      }
    };
  },
  methods: {
    async searchRecipes() {
      // Build an array of selected dietary filters
      const dietaryFilters = [];
      if (this.filters.vegan) dietaryFilters.push('vegan');
      if (this.filters.vegetarian) dietaryFilters.push('vegetarian');
      if (this.filters.dairyFree) dietaryFilters.push('dairy free');
      if (this.filters.nutFree) dietaryFilters.push('nut free');
      if (this.filters.noBeef) dietaryFilters.push('no beef');
      if (this.filters.noPork) dietaryFilters.push('no pork');

      try {
        // Pass the ingredients and filters to your backend.
        // (Your ExpressJS backend should be updated to handle dietary filters.)
        const response = await axios.post('/api/recipes/search', {
          ingredients: this.ingredients,
          filters: dietaryFilters
        });
        this.recipes = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    // If the header search bar redirected here with a query parameter.
    if (this.$route.query.ingredients) {
      this.ingredients = this.$route.query.ingredients;
      this.searchRecipes();
    }
  }
};
</script>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}
.filters {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
}
.filters label {
  margin-right: 15px;
}
.results {
  margin-top: 20px;
}
.recipe-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  display: inline-block;
  width: 45%;
  vertical-align: top;
}
.recipe-card img {
  max-width: 100%;
}
</style>
