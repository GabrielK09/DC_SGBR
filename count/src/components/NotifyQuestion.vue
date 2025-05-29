<template>
    <span class="links">Notificações</span>
    <div class="circle">
        <span class="count">{{amount}}</span>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const { amount } = defineProps<{
        amount: number
    }>()

</script>

<style lang="scss">
    .container {
        background-color: #255C99;
    }
</style>