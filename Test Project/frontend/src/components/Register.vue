<!-- frontend/src/components/Register.vue -->
<template>
  <div class="auth-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
.auth-container input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
.error {
  color: red;
}
</style>
