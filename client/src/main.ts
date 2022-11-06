/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from 'primevue/config';
import '@/assets/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import InputText from 'primevue/InputText';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import Toast from 'primevue/toast';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Card', Card);
app.component('Toast', Toast);

app.use(createPinia());
app.use(router);

app.mount("#app");
