<!-- frontend/src/components/Profile.vue -->
<template>
  <div class="profile">
    <h2>Profile</h2>
    <div v-if="profile">
      <p><strong>Username:</strong> {{ profile.username }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>Member Since:</strong> {{ formatDate(profile.created_at) }}</p>
    </div>
    <div v-else>
      <p>Loading profile...</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: null,
      error: null,
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        // Ensure your backend has an endpoint /api/auth/profile that uses authentication
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.profile = response.data;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to fetch profile data.';
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
