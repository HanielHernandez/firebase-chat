import { createI18n } from 'vue-i18n'
import { setLocale } from 'yup'
import * as yupLocales from 'yup-locales'
import { LocaleObject } from 'yup/lib/locale'

const es = {
  signin: {
    name: 'Nombre',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    comfirm_password: 'Confirmar Contraseña'
  },
  validations: {
    required: 'es requerido'
  }
}
const en = {
  signin: {
    name: 'Name',
    email: 'Email',
    isRequired: 'is required',
    password: 'Password',
    comfirm_password: 'Confirm password'
  },
  validations: {
    required: 'is required'
  }
}
const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    ['es-Es']: { ...es },
    ['en-En']: { ...en }
  }
})
const getLocale = (): LocaleObject => {
  if (navigator.language == 'es-Es') {
    return yupLocales.es
  }
  return yupLocales.es
}
setLocale(getLocale())

export default i18n
