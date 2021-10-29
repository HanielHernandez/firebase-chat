<template>
  <div>
    <dashboard-layout>
      <TheSidebar />
    </dashboard-layout>
  </div>
</template>

<script lang="ts">
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
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
