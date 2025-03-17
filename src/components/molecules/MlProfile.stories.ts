import type { Meta, StoryObj } from '@storybook/vue3'
import MlProfile from './MlProfile.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Molecules/Profile',
    component: MlProfile,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {},
    args: {
        profile: {
            control: {
                type: 'object'
            }
        }
    }
} satisfies Meta<typeof MlProfile>

export default meta
type Story = StoryObj<typeof meta>

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
export const Default: Story = {
    args: {
        profile: {
            name: 'Larry Stevenson',
            email: 'larry1989@gmail.com',
            phoneNumber: '+1 234-567-891'
        }
    }
}
