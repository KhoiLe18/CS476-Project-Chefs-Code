<!-- frontend/src/components/MainLayout.vue -->
<template>
  <div>
    <header class="header">
      <div class="header-left">
        <!-- Clicking the title routes to the search page -->
        <router-link to="/"><h1>Chef's Code</h1></router-link>
      </div>
      <div class="header-middle">
        <!-- Search bar in header -->
        <input
          type="text"
          placeholder="Search ingredients..."
          v-model="searchQuery"
          @keyup.enter="goToSearch"
        />
      </div>
      <div class="header-right">
        <!-- User drop-down menu -->
        <div class="user-dropdown" @click="toggleDropdown">
          <span>{{ username }}</span>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <router-link to="/profile">Profile</router-link>
            <router-link to="/favorites">Favorites</router-link>
            <router-link to="/history">History</router-link>
            <a href="#" @click.prevent="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
    <main>
      <!-- Render child routes -->
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      dropdownOpen: false,
      // In a real app, you might load the username from a store or API
      username: 'User'
    };
  },
  methods: {
    goToSearch() {
      // Navigate to the search page and pass the query as a parameter.
      this.$router.push({ name: 'Search', query: { ingredients: this.searchQuery } });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      localStorage.removeItem('token');
      // Optionally clear user data from your state management solution
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}
.header-left h1 {
  margin: 0;
  color: #333;
  text-decoration: none;
}
.header-middle input {
  width: 300px;
  padding: 5px;
}
.header-right {
  position: relative;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 100;
}
.dropdown-menu a {
  display: block;
  margin-bottom: 5px;
  text-decoration: none;
  color: #333;
}
</style>
