<template>
    <component
        v-bind="$attrs"
        :is="link ? RouterLink : 'button'"
        :to="to"
        :disabled="disabled"
        :type="type"
        class="cursor-pointer font-bold rounded transition-colors ease-in-out duration-150 focus:border-blue-700"
        :class="[classes]"
    >
        <div class="flex justify-center items-center">
            <slot v-if="!loading"></slot>
            <FrLoading v-else />
        </div>
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FrLoading from './FrLoading.vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
    name: 'FrButton',
    components: { FrLoading },
    props: {
        disabled: {
            type: Boolean,
            default: () => false
        },
        to: {
            type: [String, Object],
            default: () => ''
        },
        link: {
            type: Boolean,
            default: () => false
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        block: {
            type: Boolean,
            default: () => false
        },
        color: {
            type: String,
            default: () => 'gray-600'
        },
        type: {
            type: String,
            default: () => 'button'
        },
        flat: {
            type: Boolean,
            default: () => false
        },
        bordered: {
            type: Boolean,
            default: () => false
        },
        rounded: {
            type: Boolean,
            default: () => false
        },
        icon: {
            type: Boolean,
            default: () => false
        }
    },
    setup(props) {
        const getColorClass = computed((): string => {
            switch (props.color) {
                case 'primary':
                    return 'bg-blue-600 text-white'
                case 'danger':
                    return 'bg-red-600 text-white'
                default:
                    return 'bg-gray-300 text-black-400'
            }
        })

        const classes = computed(() => {
            const borderClass = `border border-${props.color} text-${props.color}`
            const flatClass = 'bg-neutral-400 text-neutral-100 bg-opacity-0 hover:bg-gray-600/30'
            const paddingClass = props.rounded ? 'px-2 py-2' : 'px-4 py-2'

            return [
                props.block ? 'block w-full' : 'inline-block',
                props.flat ? flatClass : '',
                paddingClass,
                getColorClass.value,
                props.disabled ? 'opacity-75' : '',
                props.rounded ? 'rounded-full px-2 py-2' : '',
                props.bordered ? borderClass : ''
            ]
        })
        return { classes, RouterLink, getColorClass }
    }
})
</script>

<style scoped></style>
