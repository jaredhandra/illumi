import './assets/index.css'

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".p-dark",
    }
  }
})
app.mount('#app');
