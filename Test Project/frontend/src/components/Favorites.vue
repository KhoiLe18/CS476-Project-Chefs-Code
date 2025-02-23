<!-- frontend/src/components/Favorites.vue -->
<template>
  <div>
    <h2>Your Favorite Recipes</h2>
    <div v-if="favorites.length">
      <div v-for="fav in favorites" :key="fav.id" class="recipe-card">
        <h3>{{ fav.recipe_title }}</h3>
        <img :src="fav.recipe_image" alt="Favorite Recipe Image" />
        <router-link :to="`/recipe/${fav.recipe_id}`">View Recipe</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { favorites: [] };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/recipes/favorites/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.favorites = response.data;
    } catch (err) {
      console.error(err);
    }
  }
};
</script>
