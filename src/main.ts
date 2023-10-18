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
import Image from 'primevue/image';
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Sidebar from 'primevue/sidebar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';   
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(ToastService)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Image', Image)
app.component('Toast', Toast)
app.component('Sidebar', Sidebar)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Row', Row)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('AutoComplete', AutoComplete)
app.component('InputNumber', InputNumber)
app.component('Fieldset', Fieldset)
app.component('Divider', Divider)

app.mount('#app')
