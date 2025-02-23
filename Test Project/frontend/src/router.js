// frontend/src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import MainLayout from './components/MainLayout.vue';
import Profile from './components/Profile.vue';
import Favorites from './components/Favorites.vue';
import History from './components/History.vue';
import SearchPage from './components/SearchPage.vue';
import RecipeDetail from './components/RecipeDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // These pages use a minimal layout (no header/search bar)
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    // All other routes use the MainLayout
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'Search', component: SearchPage },
        { path: 'recipe/:id', component: RecipeDetail },
        { path: 'profile', component: Profile },
        { path: 'favorites', component: Favorites },
        { path: 'history', component: History }
      ]
    }
  ]
});
