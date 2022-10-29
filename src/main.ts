import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

// global components
import App from './App.vue'

// layouts
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import SimpleLayout from '@/layouts/default/SimpleLayout.vue'

// global styles
import './assets/scss/index.scss'

const app = createApp(App)

app.component('layout-default', DefaultLayout)
app.component('layout-simple', SimpleLayout)

app.use(createPinia())
app.use(router)
app.mount('#app')
