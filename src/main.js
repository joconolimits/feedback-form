import { createApp } from 'vue'
import App from './App.vue'
import 'semantic-ui-css/semantic.min.css'
import { store } from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')

