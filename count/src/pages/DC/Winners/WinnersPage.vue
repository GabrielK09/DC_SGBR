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
        <div v-if="listAllWinners.length > 0">
            <div v-for="winners in listAllWinners">
                <div class="mt-4">
                    <span>Equipe: {{ winners.color }}</span> |
                    <span>Pontos: {{ winners.score }}</span>

                </div>
            </div>
            <q-btn 
                :data-clipboard-text="messageToClip"
                @click="clipBoardBtn"
                label="Cópiar mensagem" 
                class="btn"
            />
        </div> 

        <div class="bg-red-600 text-center mt-3 p-2 rounded" v-if="errorMessage">
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
    
    type winners = {
        label: string,
        color: string,
        score: number
    }

    const $q = useQuasar();
    const GOAL = 20;
    const after: any = ref(null);
    const before: any = ref(null);
    const errorMessage: any = ref('');
    const successClip: any = ref(false);
    const messageToClip: any = ref('');
    const loanding: any = ref(false);
    const listAllWinners: any = ref([]);
    const listWinners: any = ref([]);

    const showLoanding = () => {
        $q.loading.show({
            message: 'Buscando dados ...'
        });

    };

    const hideLoanding = () => {
        $q.loading.hide();
    }

    const getWinners = async () => {
        showLoanding()
        listAllWinners.value = [];
        listWinners.value = [];
        messageToClip.value = '';

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
            console.log(data);

            if(data.success)
            {
                listAllWinners.value = data.winners;                
                listAllWinners.value.map((c: winners) => {
                    if(c.score >= GOAL)
                    {
                        listWinners.value.push(c);
                        
                    };
                });

                if(listWinners.value.length > 0)
                {
                    messageToClip.value = `                
Bom dia pessoal

Segue as equipes que conseguiram atingir a meta semanal:
${listWinners.value.map((c: winners) =>  `Equipe: ${c.color}, pontos: ${c.score};` ).join('\n')}
Para as equipes acima, fica liberado o energético, salgadinho, refri e play.

As demais equipes permanecem sem as regalias acima.

EQUIPE DESTAQUE DA SEMANA:
${listWinners.value[0].color} com ${listWinners.value[0].score} pontos 👏🏼
`
                }
                
                console.log('listWinners ', listWinners.value);
            } else {
                console.log(data)
            };
            
        } catch (error) {
            console.error('Erro: ', error)
            errorMessage.value = error

        } finally {
            hideLoanding();

        }
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
