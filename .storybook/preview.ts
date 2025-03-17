import type { Preview } from '@storybook/vue3'
import '../src/index.css'
import { defineRule } from 'vee-validate'
import { all } from '@vee-validate/rules'

Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
})

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
}

export default preview
