<template>
    <div class="p-6 border bg-white border-neutral-200 rounded-md" v-bind="$attr">
        <slot></slot>
    </div>
</template>
<script setup>
defineOptions({
    inheritAttrs: false
})
</script>
