<template>
    <div>
        <h5>Checar Vencedores</h5>

    </div>

    <div class="">
        <q-form
            @submit="getWinners"
            class="q-gutter-md"
        >
            <q-input 
                v-model="after" 
                type="date" 
                label="Antes" 
                :rules = "[
                    val => !!val || `O campo ANTES é obrigatório`
                ]"
            />
            
            <q-input 
                v-model="before" 
                type="date" 
                label="Depois" 
                :rules = "[
                    val => !!val || `O campo DEPOIS é obrigatório`
                ]"
            />

            <q-btn
                label="Buscar" 
                type="submit"
                class="mt-2"
            />
                
        </q-form>

    </div>
    <div v-if="loanding">
        {{ loanding }}
    </div>
    <div class="" v-else>
        <div v-if="listWinners.length > 0">
            <div v-for="winners in listWinners">
                <div class="mt-4">
                    <span>Cor: {{ winners.color }}</span> |
                    <span>Pontos: {{ winners.score }}</span>

                </div>
            </div>
            <q-btn 
                :data-clipboard-text="messageToClip"
                @click="clipBoardBtn"
                label="OK" 
                class="btn"
            />
        </div> 

        <div class="bg-red-600 text-center mt-3 rounded" v-if="errorMessage">
            <span class="text-white">{{ errorMessage }}</span>

        </div> 
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage, useQuasar } from 'quasar';
    import { api } from 'src/boot/axios';
    import { ref, onBeforeMount } from 'vue';
    import { format, parse } from 'date-fns';
    import clipBoard from 'src/services/clipBoard';
    
    const $q = useQuasar();
    const after: any = ref(null);
    const before: any = ref(null);
    const listWinners: any = ref([]);
    const errorMessage: any = ref('');
    const successClip: any = ref(false);
    const messageToClip: any = ref('');
    const loanding: any = ref(false);
    let timer: any;

    const showLoanding = () => {
        $q.loading.show({
            message: 'Buscando dados ...'
        });

        timer = setTimeout(() => {
            $q.loading.hide()
            timer = void 0;
        }, 2000);

    };

    const hideLoanding = () => {
        if(timer !== void 0)
        {
            clearTimeout(timer)
            $q.loading.hide();
            
        }
    }

    const getWinners = async () => {
        showLoanding()
        try {
            const afterDate = new Date(after.value + 'T00:00:00');
            const beforeDate = new Date(before.value + 'T00:00:00');
            console.log('after.value: ', format(afterDate, 'dd/MM/yyyy'))
            console.log('before.value: ', format(beforeDate, 'dd/MM/yyyy'))

            const res = await api.post('/winners', { 
                after: format(afterDate, 'dd/MM/yyyy'),
                before: format(beforeDate, 'dd/MM/yyyy')

            }, { 
                headers: {
                    'user-token': LocalStorage.getItem("user")
                }
            });

            const data = res.data;

            if(data.success)
            {
                listWinners.value = data.winners;

                messageToClip.value = `Equipes vencedoras ${listWinners.value[0].color}`
                hideLoanding();

            };
            
        } catch (error) {
            console.error('Erro: ', error)
        };
    };

    const clipBoardBtn = async () => {
        try {
            const res = await clipBoard();
            successClip.value = res;
            
        } catch (error) {
            successClip.value = error;
            
        };
    };
</script>
