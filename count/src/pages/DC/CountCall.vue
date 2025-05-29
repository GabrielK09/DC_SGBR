<template>
    <div class="index-page">        
        <span>Usuário atual: {{ LocalStorage.getItem("user") }}</span>
        <h3 style="margin: 35px 0 35px 0;">Contagem de puxeis</h3>
        <q-input 
            v-model="start" 
            type="date" 
            label="Início"
            class="date"

        />

        <q-input 
            v-model="end" 
            type="date" 
            label="Fim" 
            class="date"

        />

        <q-select 
            color="#EA526F"
            class="select"
            v-model="option" 
            :options="options" 
            label="Selecione a cor do time" 
            @update:model-value="showBtn"
            filled 
        />
        <div class="container-btn" v-if="showButton">
            <q-btn 
                class="btn-check"
                label="Contar" 
                @click="count" 
            />

            <div v-if="countPuxei >= 0 && group" class="count-area">
                <span>Quantia total: {{ countPuxei }} da equipe: {{ group }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import { api } from 'src/boot/axios';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'

    type msgType = {
        author: string,
        message: string,
        date: string
    }

    const showButton: any = ref(false);
    const option: any = ref(null);
    const options = ref([
        { label: '🔵', value: '🔵', group: 'Azul' },
        { label: '🟢', value: '🟢', group: 'Verde' },
        { label: '🟣', value: '🟣', group: 'Roxa' },
        { label: '🌑', value: '🌑', group: 'Cinza' },
        { label: '🍊', value: '🍊', group: 'Laranja' },
        { label: '🟡', value: '🟡', group: 'Amarela' },
        { label: '🟤', value: '🟤', group: 'Marrom' },
        { label: '🔴', value: '🔴', group: 'Vermelha' },

    ]); 

    const route = useRouter()
    const messages = ref<msgType[]>([]);    
    const countPuxei = ref(0);
    const group = ref(null);

    const start = ref(null);
    const end = ref(null);

    const showBtn = () => {
        showButton.value = true
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate() + 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
        
    }

    const count = async () => {
        group.value = null;
        countPuxei.value = 0;
        
        const res = await api.get('/messages');

        if(res.data.success && !start.value && !end.value)
        {
            const messageData: msgType[] = res.data.messages;
            messages.value = messageData;

            const count = messages.value.filter(m => m.message.toLowerCase().includes(option.value.value)).length;
            
            group.value = option.value.group
            countPuxei.value += count
        }

        if(start.value && end.value)
        {
            const res = await api.post('/messages-between', {
                start: formatDate(start.value),
                end: formatDate(end.value)
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log('Res: ', res.data)

            const messageData: msgType[] = res.data.messages;
            messages.value = messageData;

            const count = messages.value.filter(m => m.message.toLowerCase().includes(option.value.value)).length;
            group.value = option.value.group
            countPuxei.value += count;
        }
    }

    onMounted(() => {
        const user = LocalStorage.getItem("user")
        if(!user)
        {
            route.push('/')
        }
    })

</script>

<style lang="scss">
    .index-page{
        color: #000;
    }

    .select {
        width: 20rem;
    }

    .date {
        width: 20rem;
        margin: 0 0 5px 0;
    }

    .container-btn {
        margin: 15px 0 0 0;

        .count-area{
            margin: 10px 0 0 0;
        }
    }

    .btn-check{
        font-size: 1rem;
        width: 10rem;
        color: #fff;
        background-color: #279AF1;

    }
</style>