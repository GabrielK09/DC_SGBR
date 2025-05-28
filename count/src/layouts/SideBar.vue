<template>
    <div class="side-bar">
        <Images
            v-if="user"
        />
        
        <ul>
            <li><router-link to="/counter"></router-link></li>
        </ul>
        
    </div>
    <div class="router-view">
        <router-view />

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

        ul {
            color: #fff;
        }

        img {
            margin: 0 0 0 0;
            border-radius: 50%;
            width: 180px;
            height: 180px;
            margin: 15px;

        }
    }

    .router-view{
        margin: 20px 0 0 1rem;
    }
</style>
