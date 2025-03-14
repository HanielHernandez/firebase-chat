import type { Meta, StoryObj } from '@storybook/vue3'
import AtTooltip from './AtTooltip.vue'

const meta = {
    title: 'Atoms/Tooltip',
    component: AtTooltip,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text'
        }
    },
    render: (args) => ({
        components: { AtTooltip },
        setup() {
            return { args }
        },
        template: `
      <AtTooltip v-bind="args">
        Hover Over Me
      </AtTooltip>`
    })
} satisfies Meta<typeof AtTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        text: 'my Tooltip'
    }
}
