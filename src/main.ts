import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import './assets/main.css'
import 'primeicons/primeicons.css'
import '../node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Button from "primevue/button"
import InputText from 'primevue/inputtext'


import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.use(PrimeVue);

app.component('Button', Button)
app.component('InputText', InputText)


app.mount('#app')
