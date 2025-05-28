<template>
  <div class="main-layout">
    <SideBar />
    <div class="content">
      <router-view />
    </div>
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
    
    color: white;
    min-height: 100vh;
  }
}
</style>
