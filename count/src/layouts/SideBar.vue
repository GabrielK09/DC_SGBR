<template>
    <div class="side-bar">
        <div class="container">
            <Images
                v-if="user"
            />

        </div>
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import Images from 'src/components/Images.vue';
    import { ref, onMounted } from 'vue';

    const user = ref<string>('')

    onMounted(() => {
        const userStored = LocalStorage.getItem("user") as string | null
        if(userStored)
        {
            user.value = userStored as string
            
        }
    })

</script>

<style lang="scss">
    .side-bar {
        display: flex;
        flex-direction: column;
        background: #0C120C;
        width: 15rem;
        height: 100vh;

        .container {
            margin: 15px 0 0 0;
        }

        img {
            margin: 0 0 0 0;
            border-radius: 50%;
            width: 180px;
            height: 180px;
            margin: 15px;

        }
    }
</style>