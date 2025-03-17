<script setup lang="ts">
import { computed, defineProps } from 'vue'

defineOptions({
    inheritAttrs: false
})

interface TypographyProps {
    as?: keyof HTMLElementTagNameMap
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'label' | 'link' | 'subtitle'
    class?: string
}

// Define Tailwind classes for each variant
const variantClasses = {
    h1: 'text-4xl font-black text-neutral-800 dark:text-neutral-200',
    h2: 'text-3xl font-bold text-neutral-800 dark:text-neutral-200',
    h3: 'text-2xl font-bold text-neutral-800 dark:text-neutral-200',
    h4: 'text-xl font-bold text-neutral-800',
    h5: 'text-lg font-medium text-neutral-800',
    h6: 'text-base font-medium text-neutral-800',
    paragraph: 'text-neutral-600 text-base dark:text-neutral-300',
    label: 'text-sm font-medium uppercase text-gray-500 dark:text-gray-400',
    link: 'font-medium text-base text-blue-600  hover:text-blue-800',
    subtitle: 'text-sm text-neutral-600 leading-4'
}

// Default tag mapping if `as` is not provided
const defaultTags: Record<NonNullable<TypographyProps['variant']>, keyof HTMLElementTagNameMap> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    paragraph: 'p',
    label: 'label',
    link: 'a',
    subtitle: 'span'
}

// Props
const { variant = 'paragraph', class: cssClass = '' } = defineProps<TypographyProps>()

// Compute final class string
const computedClass = computed(() => {
    return `${variantClasses[variant || 'paragraph']} ${cssClass || ''}`
})
</script>

<template>
    <component v-bind="$attrs" :is="as || defaultTags[variant || 'paragraph']" :class="computedClass">
        <slot />
    </component>
</template>
