<!-- frontend/src/components/RecipeDetail.vue -->
<template>
  <div>
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image" alt="Recipe Image" />
    <div v-html="recipe.instructions"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { recipe: {} };
  },
  async created() {
    const recipeId = this.$route.params.id;
    try {
      const response = await axios.get(`/api/recipes/${recipeId}`);
      this.recipe = response.data;
      // Optionally, add to the user's history here if logged in.
    } catch (err) {
      console.error(err);
    }
  }
};
</script>
