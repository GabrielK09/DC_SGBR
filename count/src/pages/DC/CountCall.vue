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

            <div class="loandig" v-if="loandig">
                Buscando dados ...
            </div>

            <div class="error" v-if="errorMessage">
                {{ errorMessage }}
            </div>

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
    import { format } from 'date-fns';

    type msgType = {
        author: string,
        message: string,
        date: string
    }

    const loandig: any = ref<boolean>(false);
    const showButton: any = ref<boolean>(false);
    const option: any = ref<null>(null);
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
    const errorMessage = ref<string>('');
    
    const countPuxei = ref(0);
    const group = ref(null);

    const start = ref(null);
    const end = ref(null);

    const showBtn = () => {
        showButton.value = true
    }

    const count = async () => {
        group.value = null;
        countPuxei.value = 0;
        loandig.value = true;
        errorMessage.value = '';

        try {
            if(!start.value && !end.value) // not between
            {
                const res = await api.get('/messages', {
                    headers: {
                        "Content-Type": "application/json",
                        "user-token": LocalStorage.getItem("user")
                        
                    }
                });

                const messageData: msgType[] = res.data.messages;
                
                messages.value = messageData;
                
                const count = messages.value.filter(m => m.message.toLowerCase().includes(option.value.value)).length;
                
                group.value = option.value.group
                countPuxei.value += count
            }
            
            if(start.value && end.value) // not between
            {
                const startDate = new Date(start.value + 'T00:00:00');
                const endDate = new Date(end.value + 'T00:00:00');  

                const res = await api.post('/messages-between', {
                    start: format(startDate, 'dd/MM/yyyy'),
                    end: format(endDate, 'dd/MM/yyyy')
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "user-token": LocalStorage.getItem("user")
                        
                    }
                });
                
                console.log('Res: ', res.data)
                
                const messageData: msgType[] = res.data.messages;
                messages.value = messageData;
                
                const count = messages.value.filter(m => m.message.toLowerCase().includes(option.value.value)).length;
            
                group.value = option.value.group
                countPuxei.value += count;
            }
        } catch (error) {
            errorMessage.value = error as string
            option.value = ''
            start.value = null
            end.value = null
            
        } finally {
            loandig.value = false
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

    .error {
        background-color: #F05D5E;
        width: max-content;
        margin: 15px 0 0 0;
        border-radius: 5px;
        padding: 10px;
        color: #fff;
    }
</style>