<template>
    <div class="container-form">
        <q-form
            @submit="acessLogin"
            class="q-gutter-md forms"
        >
            <h3>Login</h3>
            <div class="bar"></div>
        
            <q-input 
                v-model="cpf" 
                type="text" 
                label="CPF" 
                color="cyan"
                :rules="[
                    val => !!val || 'O CPF é obrigatório'
                ]"
            />
            
            <q-input 
                v-model="password" 
                type="password" 
                label="Senha"
                color="cyan"
                :rules="[
                    val => !!val || 'A senha é obrigatória'
                ]"
            />

            <div>
                <q-btn label="Entrar" type="submit" class="btn-s"/>
                
            </div>
        </q-form>
    </div>
    
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import { acessApi } from 'src/services/acessLogin';
    import { onMounted, ref } from 'vue';    
    import { useRouter } from 'vue-router'

    const route = useRouter();
    const token: any = ref(null);
    const cpf: any = ref('')
    const password: any = ref('')

    const acessLogin = async () => {
        try {
            const res = await acessApi.post('', {
                cpf: cpf.value,
                password: password.value

            });

            const data = res.data.user
            console.log(data)

            LocalStorage.set("user", data.apelido)            
        } catch (error) {
            console.error('Erro: ', error)
            
        } finally {
            route.push('/home')
            

        }
    }

    onMounted(() => {
        LocalStorage.remove("user")
        console.log('Voltou pro login')
    })
</script>

<style lang="scss">
    h2 {
        color: #000;
        
    }

    .bar{
        border-bottom: solid 1px #ccc;

    }

    .container-form{ 
        width: 100vw;
        height: 70vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        

    }

    .forms{
        width: 25rem;
        text-align: center;
        border: solid #ccc;
        border-radius: 10px;
        padding: 2rem;

        .btn-s{
            background: #23B5D3;
            color: #fff;
        }
    }

    .q-html-input__ {
        background-color: #000;
    }

    
</style>