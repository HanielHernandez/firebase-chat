import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './index.css'
import Globals from '@/components/globals'
import './plugins/vee-validate'
import i18n from './plugins/i18n/vue-i18n'
import { type FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/variables'
import { Form } from 'vee-validate'
import { createPinia } from 'pinia'
import date from './plugins/date'
const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// Object.keys(Globals).forEach((component:string) => {
//   app.component(component, Globals[component])
// })
const initFirebase = (): Promise<FirebaseApp> => {
    return new Promise((resolve) => {
        const firebaseapp = initializeApp(firebaseConfig)
        resolve(firebaseapp)
    })
}

const initApp = async (): Promise<void> => {
    await initFirebase()
    Globals.forEach((component) => {
        component.name && app.component(component.name, component)
    })

    app.component('VeeForm', Form)
    app.use(i18n)
    app.use(date)
    app.use(router)
    app.mount('#app')
}

initApp()
