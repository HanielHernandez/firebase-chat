import { defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import * as yup from 'yup'
defineRule('required', required)
defineRule('email', email)
