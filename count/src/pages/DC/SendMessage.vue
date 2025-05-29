<template>
    <div class="index-page">
        <q-input 
            v-model="message" 
            type="text" 
            label="Mensagem para envio" 
            class="msg-input"
            
        />

        <div class="fix-amount">
            <q-btn 
                color="primary"
                label="+3" 
                @click="sendMessage(3)" 
                class="btn-fix"
                :disable="!message.trim()"

            />

            <q-btn 
                color="primary"
                label="+5" 
                @click="sendMessage(5)" 
                class="btn-fix"
                :disable="!message.trim()"

            />

            <q-btn 
                color="primary"
                label="+7" 
                @click="sendMessage(7)" 
                class="btn-fix"
                :disable="!message.trim()"

            />

            <q-btn 
                color="primary"
                label="+12" 
                @click="sendMessage(12)" 
                class="btn-fix"
                :disable="!message.trim()"

            />

            <q-input 
                v-model.number="amount" 
                type="number" 
                label="Quantia personalizada" 
                class="input-amout"
                :disable="!message.trim()"
                
            />

            <q-btn 
                v-if="amount > 0"
                color="primary" 
                class="btn-custom"
                label="OK" 
                @click="sendMessage(null)"
                :disable="!message.trim()"

            />

            <div class="success" v-if="successMessage" @click="successMessage = ''">
                {{ successMessage }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import { api } from 'src/boot/axios';
    import { ref } from 'vue'

    const message = ref<string>('');
    const successMessage = ref<string>('');
    const amount = ref<number>(0);

    const sendMessage = async (fixAmount: number|null) => {
        if(message.value && (fixAmount! > 0 || amount.value > 0))
        {
            const res = await api.post('/send-message', {
                message: message.value,
                amount: fixAmount! > 0 ? fixAmount : amount.value
    
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "user-token": LocalStorage.getItem("user")

                }
            })
            message.value = '';
            amount.value = 0;

            if(res.data.success)
            {
                successMessage.value = res.data.message
            }
        } else {
            console.error('If ta errado')
        }
    }

</script>

<style lang="scss">
    .index-page{
        color: #000;

        .msg-input {
            width: 110%;
        }

        .fix-amount, .input-amout, .btn-custom {
            margin: 15px 0 0 0;
            
            .btn-fix{
                margin: 0 10px 0 10px;
            }
        }

        .success {
            margin: 10px 0 0 0;
            color: #fff;
            background-color: #53DD6C;
            width: max-content;
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;

        }
    }

</style>