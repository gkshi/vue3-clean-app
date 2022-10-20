import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

// global components
import App from './App.vue'
import LayoutDefault from '@/layouts/default/DefaultLayout.vue'

// global styles
import './assets/scss/index.scss'

const app = createApp(App)

app.component('layout-default', LayoutDefault)

app.use(createPinia())
app.use(router)
app.mount('#app')
