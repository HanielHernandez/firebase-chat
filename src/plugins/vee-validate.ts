import { configure, defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import es from '@vee-validate/i18n/dist/locale/es.json'
defineRule('required', required)
defineRule('email', email)

configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirm_password: 'Password Confirmation',
        recipientId: 'Recipient Id'
      }
    },
    es: {
      ...es,
      names: {
        name: 'Nombre',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        confirm_password: 'Confirmación de contraseña',
        recipientId: 'Id del Destinatario'
      }
    }
  })
})
