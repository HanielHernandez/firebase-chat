<template>
  <dashboard-layout>
    <div class="home">Home component</div>
  </dashboard-layout>
</template>

<script lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: { DashboardLayout }
})
</script>
