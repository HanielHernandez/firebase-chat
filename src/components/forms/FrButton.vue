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

<script lang="ts" setup>
import { clsx } from 'clsx'
import { computed } from 'vue'
import FrLoading from './FrLoading.vue'
import { RouterLink } from 'vue-router'
import type { Color } from '@/config/consts'
import type FrButtonProps from './FrButtomProps'

const {
    color = 'primary',
    rounded = false,
    block = false,
    flat = false,
    disabled = false,
    bordered = false
} = defineProps<FrButtonProps>()

const bgColorClasses: Record<Color, string> = {
    primary: 'bg-blue-600 ',
    danger: 'bg-red-600',
    default: 'gg-gray-300'
}

const flatBgColorClasses: Record<Color, string> = {
    primary: 'hover:bg-blue-600',
    danger: 'hover:bg-red-600',
    default: 'hover:bg-gray-300'
}

const TextColorClasses: Record<Color, string> = {
    primary: 'text-white',
    danger: 'text-white',
    default: 'text-black-400'
}

const flatTextColorClasses: Record<Color, string> = {
    primary: 'text-blue-600 hover:text-white',
    danger: 'text-red-600 hover:text-white',
    default: 'text-gray-600 hover:text-black-400'
}

const classes = computed(() => {
    const borderClass = `border border-${color} text-${color}`
    const paddingClass = rounded ? 'px-2 py-2' : 'px-4 py-3'

    return clsx(
        !flat && !bordered && `${bgColorClasses[color]} ${TextColorClasses[color]}`,
        flat && `bg-transparent ${flatTextColorClasses[color]} ${flatBgColorClasses[color]} `,
        bordered && borderClass,
        disabled ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90',
        paddingClass,
        rounded ? 'rounded-full ' : '',
        block ? 'block w-full' : 'inline-block'
    )
    // return [
    //     block ? 'block w-full' : 'inline-block',
    //     flat ? flatClass : '',
    //     paddingClass,
    //      getColorClass.value,
    //     TextColorClasses[color],
    //     disabled ? 'opacity-75' : '',
    //     rounded ? 'rounded-full px-2 py-2' : '',
    //     bordered ? borderClass : ''
    // ]
})
</script>

<style scoped></style>
