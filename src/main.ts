import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Globals from '@/components/globals'
import './plugins/vee-validate'
import i18n from './plugins/i18n/vue-i18n'

const app = createApp(App)

// Object.keys(Globals).forEach((component:string) => {
//   app.component(component, Globals[component])
// })
Globals.forEach((component) => {
  app.component(component.name, component)
})

console.log('LANG', navigator.language)

app.use(i18n)
app.use(store)
app.use(router)
app.mount('#app')
