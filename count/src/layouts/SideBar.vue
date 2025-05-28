<template>
    <div class="side-bar">
        <Images
            v-if="user"
        />
        
        <ul class="ul-itens">
            <li class="link">
                <router-link to="/counter" class="links">Contagem de ligações</router-link>
            </li>

            <li class="link">
                <router-link to="/a" class="links">Teste</router-link>
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
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const user = ref<string>('')
    const route = useRouter();

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
        background: #0C120C;
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
