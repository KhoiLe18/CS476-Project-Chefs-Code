<!-- frontend/src/components/Login.vue -->
<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/register">Sign Up</router-link>
    </p>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
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
