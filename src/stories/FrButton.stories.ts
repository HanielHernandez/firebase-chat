import FrButton from '@/components/forms/FrButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Atoms/Button',
    component: FrButton,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        flat: {
            control: {
                type: 'boolean'
            }
        },
        loading: {
            control: {
                type: 'boolean'
            }
        },
        block: {
            control: {
                type: 'boolean'
            }
        },
        rounded: {
            control: {
                type: 'boolean'
            }
        },
        color: {
            options: ['primary', 'danger', 'default'],
            control: {
                type: 'select'
            }
        }
    },
    args: {
        color: 'primary'
    }
} satisfies Meta<typeof FrButton>

export default meta
type Story = StoryObj<typeof meta>

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */
export const Primary: Story = {
    args: {
        color: 'primary'
    },
    render: (args) => ({
        components: { FrButton },
        setup() {
            return { args }
        },
        template: `
        <fr-button v-bind="args">
          My Button
        </fr-button>
      `
    })
}

export const RoundedWithIcon: Story = {
    render: () => ({
        components: { FrButton },
        template: `
      <Frbutton flat rounded color="default">
        <span class="material-icons" >more_vert </span >
      </Frbutton>`
    })
}

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     label: 'Button',
//     size: 'large',
//   },
// };

// export const Small: Story = {
//   args: {
//     label: 'Button',
//     size: 'small',
//   },
// };
