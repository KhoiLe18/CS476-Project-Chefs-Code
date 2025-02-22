import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from "primevue/config"
import Aura from '@primevue/themes/aura'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'


// import css
import './assets/css/app.css'


// import router
import router from './router'


const app = createApp(App)
    app.use(router)
    app.mount('#app')
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
        }
    })

    app.component('MultiSelect', MultiSelect)
    // eslint-disable-next-line
    app.component('Button', Button)
    

