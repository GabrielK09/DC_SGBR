<template>
  <div class="main-layout">
    <router-view />

  </div>
</template>

<script setup lang="ts">
import SideBar from 'src/layouts/SideBar.vue';
</script>

<style lang="scss">
.main-layout {
  display: flex;

  .content {
    flex: 1;
    padding: 2rem;
    
    min-height: 100vh;
  }
}
</style>
