import { setLocale } from '@vee-validate/i18n'
import { createI18n } from 'vue-i18n'
import en from './en.json'
import es from './es.json'

// const en = {
//   signup: {
//     title: 'Register a new firechat account'
//   },
//   auth: {
//     name: 'Name',
//     email: 'Email',
//     password: 'Password',
//     confirm_password: 'Confirm password'
//   },
//   validations: {
//     required: 'is required'
//   }
// }

export const getLocalei18n = (): string => {
  if (navigator.language == 'es-ES') {
    return 'es'
  }
  if (navigator.language == 'en-EN') {
    return 'en'
  }
  return navigator.language
}
const i18n = createI18n({
  locale: getLocalei18n(),
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})

setLocale(getLocalei18n())
//setLocale(getLocalei18n())

export default i18n
