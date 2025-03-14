<script setup lang="ts">
import type AtToolTipProps from './AtTooltip'

const { text = '', location = 'bottom' } = defineProps<AtToolTipProps>()
</script>
<template>
    <div class="relative group inline-block">
        <div class="">
            <slot></slot>
        </div>
        <div
            id="tooltip"
            class="rounded-md absolute origin-center w-full left-1/2 -translate-x-1/2 top-full invisible group-hover:visible transition-all ease-in-out opacity-0 group-hover:opacity-100 height-0 group-hover:h-auto p-2 bg-neutral-900/75 text-white z-60"
        >
            {{ text }} {{ location }}
        </div>
    </div>
</template>
