import { createRouter, createWebHistory } from "vue-router";

import DashboardPage from '../pages/master/DashboardPage'

import HomePage from '../pages/HomePage'
import UserSettings from '../pages/UserSettings'
import SearchPage from '../pages/SearchPage'
import '../pages/main.css'


const routes = [
    {
        name:'Dashboard',
        path: '/',
        component:DashboardPage,
        children: [
            {
                name:'Home',
                path: '/home',
                component:HomePage
            },
            {
                name:'User',
                path: '/user-settings',
                component:UserSettings
            },
            {
                name:'Search',
                path: '/search-page',
                component:SearchPage
            }

        ]
    },
    
];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
    