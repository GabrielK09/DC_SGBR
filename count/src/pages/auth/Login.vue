<template>
    <div class="container-form">
        <q-form
            @submit="acessLogin"
            class="q-gutter-md forms"
        >
            <h2>Login</h2>
            <div class="bar"></div>
        
            <q-input 
                v-model="cpf" 
                type="text" 
                label="CPF" 
                input-class="centered-input"


            />
            
            <q-input 
                v-model="password" 
                type="password" 
                label="Senha"
                input-class="centered-input"

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

            LocalStorage.set("user", data.apelido)            
        } catch (error) {
            
            
        } finally {
            route.push('/home')
            window.location.reload()

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
        margin: 0 0 0;
    }

    .bar{
        border-bottom: solid 1px #ccc;
    }
    .container-form{ 
        display: flex;
        justify-content: center;
        position: relative;
        top: 150px;
    }

    .forms{
        width: 20rem;
        text-align: center;

        .btn-s{
            background: #23B5D3;
        }
    }

</style>