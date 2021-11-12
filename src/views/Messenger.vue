<template>
  <dashboard-layout>
    <TheSidebar />
    <div class="md:pl-96 h-screen" style="padding-top: 4.5rem">
      <router-view></router-view>
    </div>
  </dashboard-layout>
</template>

<script lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import TheSidebar from '@/components/messenger/Sidebar.vue'
export default {
  components: {
    TheSidebar,
    DashboardLayout
  },
  setup(): unknown {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
