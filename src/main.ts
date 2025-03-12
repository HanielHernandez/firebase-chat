import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Globals from '@/components/globals'
import './plugins/vee-validate'
import i18n from './plugins/i18n/vue-i18n'
import { type FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/variables'
import { Form } from 'vee-validate'
import dayjs from 'dayjs'
const app = createApp(App).mount('#app')

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
  app.config.globalProperties.$date = (timeStamp: number): string => {
    return dayjs(timeStamp).format('MM/DD/YY hh:mm a')
  }
  app.component('VeeForm', Form)
  app.use(i18n)
  app.use(store)
  app.use(router)
  app.mount('#app')
}

initApp()
