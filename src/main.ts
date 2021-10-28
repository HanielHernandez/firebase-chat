import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Globals from '@/components/globals'
const app = createApp(App)

// Object.keys(Globals).forEach((component:string) => {
//   app.component(component, Globals[component])
// })
Globals.forEach((component) => {
  app.component(component.name, component)
})

app.use(store)
app.use(router)
app.mount('#app')
