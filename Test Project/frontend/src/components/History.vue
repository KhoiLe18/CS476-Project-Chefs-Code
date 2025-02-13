<!-- frontend/src/components/History.vue -->
<template>
  <div>
    <h2>Your Recipe History</h2>
    <div v-if="history.length">
      <div v-for="item in history" :key="item.id" class="recipe-card">
        <h3>{{ item.recipe_title }}</h3>
        <router-link :to="`/recipe/${item.recipe_id}`">View Recipe</router-link>
        <span>{{ item.viewed_at }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { history: [] };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/recipes/history/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.history = response.data;
    } catch (err) {
      console.error(err);
    }
  }
};
</script>
