<template>
    <div class="side-bar bg-black">
        <Images
            v-if="user"
        />
        
        <ul class="ul-itens ml-5">
            <li class="link">
                <router-link to="/check-winners" class="links">Vencedores</router-link>
            </li>

            <li class="link">
                <router-link to="/counter" class="links">Contagem de ligações</router-link>
            </li>

            <li class="link">
                <router-link to="/send-message" class="links">Enviar mensagem</router-link>
            </li>

            <li class="link">
                <NotifyQuestion
                    :amount="amountNotify"

                />
            </li>
            
            <li class="link">
                <router-link to="/all" class="links">Geral</router-link>
            </li>

            <li class="btn-logout">
                <q-btn 
                    color="cyan" 
                    icon="logout" 
                    label="Sair" 
                    @click="logout" 
                />
            </li>
        </ul>
        
        
    </div>
    <div class="router-view">
        <router-view />

    </div>
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import Images from 'src/components/Images.vue';
    import NotifyQuestion from 'src/components/NotifyQuestion.vue';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const route = useRouter();
    const user = ref<string>('')

    const amountNotify = ref<number>(0);

    const logout = () => {
        LocalStorage.removeItem("user")
        const confirmed = confirm('Deseja realmente sair?')
        if(confirmed)
        {
            route.push('/')

        }
    }

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
        
        width: 15rem;
        height: 100vh;

        .ul-itens {
            .link {
                padding: 5px;
            }

            li .links {
                text-decoration: none;
                color: #fff;
                display: inline-block;
                transition: color 0.3s ease, transform 0.3s ease;   
            }

            .circle {
                position: relative;
                text-align: center;
                left: 78px;
                bottom: 30px;
                height: 18px;
                width: 18px;
                border-radius: 50px;
                z-index: 50;
                background-color: red;
                margin: 0 0 -15px 0;

                .count {         
                    
                    bottom: 1px;
                    color: #fff;
                }
            }

            .btn-logout {
                position: fixed;
                bottom: 10px;
            }
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
