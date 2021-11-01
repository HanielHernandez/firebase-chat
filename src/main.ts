import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Globals from '@/components/globals'
import './plugins/vee-validate'
import i18n from './plugins/i18n/vue-i18n'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/variables'
import { Form } from 'vee-validate'
const app = createApp(App)

// Object.keys(Globals).forEach((component:string) => {
//   app.component(component, Globals[component])
// })
const initFirebase = (): Promise<FirebaseApp> => {
  return new Promise((resolve, reject) => {
    const firebaseapp = initializeApp(firebaseConfig)
    resolve(firebaseapp)
  })
}

const initApp = async (): Promise<void> => {
  await initFirebase()
  Globals.forEach((component) => {
    app.component(component.name, component)
  })

  app.component('VeeForm', Form)
  app.use(i18n)
  app.use(store)
  app.use(router)
  app.mount('#app')
}

initApp()
