<template>
    <span class="links">Notificações</span>
    <div class="circle">
        <span class="count">{{ amount }}</span>
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import { api } from 'src/boot/axios';
    import { ref, onMounted } from 'vue';

    type Msg = {
        msg: string,
        message: string
    }

    const message = ref([]);

    const satCount = ref<number>(0);

    const { amount } = defineProps<{
        amount: number

    }>()

    const monitore = async () => {
        console.log('Carregando novas mensagens ...')
        /*const res = await api.get('/recorent-messages', {
            headers: {
                "Content-Type": "application/json",
                "user-token": LocalStorage.getItem("user")
                
            }
        });*/

        const messages = res.data.messages;
        let satCount: string[] = [];

        messages.forEach((msg: Msg) => {
            satCount.push(msg.message);

        });
        console.log('satCount', satCount)

        return;
    }

    onMounted(() => {
        const user = LocalStorage.getItem("user")
        if(user)
        {
            setInterval(monitore, 8000);

        }
        console.log('Carregou o notity');
    })
</script>

<style lang="scss">
    .container {
        background-color: #255C99;
    }
</style>