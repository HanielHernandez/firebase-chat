import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Globals from '@/components/globals'
import './plugins/vee-validate'
import i18n from './plugins/i18n/vue-i18n'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/variables'
const app = createApp(App)

// Object.keys(Globals).forEach((component:string) => {
//   app.component(component, Globals[component])
// })
const firebaseapp = initializeApp(firebaseConfig)

console.log(firebaseapp)

Globals.forEach((component) => {
  app.component(component.name, component)
})

app.use(i18n)
app.use(store)
app.use(router)
app.mount('#app')
