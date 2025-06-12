<template>
    <div class="text-3xl mt-10">
        <div v-if="successClip" class="fixed -z-10 bg-green-400 p-1 text-white rounded ">
            <span class="flex"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span class="mt-auto mb-auto ml-1">Mensagem copiada com sucesso</span>
                
            </span>
        </div>
        
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
                        val => !!val || `O campo ANTES é obrigatório`,
                        val => {
                            if(!val || !before) return true;
                            return new Date(val) <= new Date(before) ||  'A data de ANTES não pode ser maior que DEPOIS';

                        } 
                    ]"
                />
                
                <q-input 
                    v-model="before" 
                    type="date" 
                    label="Depois" 
                    :rules = "[
                        val => !!val || `O campo DEPOIS é obrigatório`,
                        val => {
                            if(!val || !after) return true;
                            return new Date(val) >= new Date(after) ||  'A data de DEPOIS não pode ser maior que ANTES';

                        } 
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
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage, useQuasar } from 'quasar';
    import { api } from 'src/boot/axios';
    import { ref } from 'vue';
    import { format } from 'date-fns';
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

    const reset = () => {
        window.location.reload()
    }
</script>
