<script setup lang="ts">
import type { Position } from '@/config/consts'
import type AtToolTipProps from './AtTooltip'
import { computed } from 'vue'

const { text = '', position = 'bottom' } = defineProps<AtToolTipProps>()

const classesByPositions: Partial<Record<Position, string>> = {
    bottom: 'left-0 top-full -translate-x-1/4 translate-y-2',
    top: 'left-0 bottom-full ',
    left: 'top-2 right-full',
    right: 'top-2 left-full'
}

const positionClass = computed(() => {
    return classesByPositions[position]
})
</script>
<template>
    <div class="relative group inline-block">
        <div class="">
            <slot></slot>
        </div>
        <div
            id="tooltip"
            class="rounded-md absolute text-center transform invisible group-hover:visible transition-all ease-in-out opacity-0 group-hover:opacity-100 height-0 group-hover:h-auto px-2 py-1 bg-neutral-900/60 text-white z-60"
            :class="positionClass"
        >
            <span class="text-sm leading-4 font-medium">{{ text }}</span>
        </div>
    </div>
</template>
