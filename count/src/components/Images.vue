<template>
    <div v-if="user">
        <img :src=urlImg alt="User">

    </div>
    
</template>

<script setup lang="ts">
    import { LocalStorage } from 'quasar';
    import { ref, onMounted } from 'vue';
    
    const user = ref<string>(''); 
    const urlImg = ref<null | any >(null);

    const setImage = () => {
        switch (user.value) {
            case 'LUCAS':
                urlImg.value = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/411201853_1547623769325476_5156293160024252157_n.jpg?ccb=11-4&oh=01_Q5Aa1gHWvfdGCa-iNEETI_JRvlXZMta7cvwYsIYi1NdFhA2WoA&oe=6841FBF1&_nc_sid=5e03e0&_nc_cat=100";

                break;

            case 'FILIPE':
                urlImg.value = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/423956213_401886075572352_4310424711342247844_n.jpg?ccb=11-4&oh=01_Q5Aa1gGVjt5bKwJJVtJ1vccfK5WYL6pbnSQl66dYl9nspeM7qA&oe=6842092C&_nc_sid=5e03e0&_nc_cat=108";
                break;

            case 'COLLA':
                urlImg.value = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/422466784_1407055789936565_3353322438069270532_n.jpg?ccb=11-4&oh=01_Q5Aa1gGf6CNnoxmvr9zyIOLq5kII0ppVgW_8utA5_JiNnJl9Og&oe=6841E77B&_nc_sid=5e03e0&_nc_cat=106";
                break;

            case 'GUILHERME':
                urlImg.value = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/430247043_945126050606392_1870397334104195703_n.jpg?ccb=11-4&oh=01_Q5Aa1gEZJV9oQ2Aje02N8q2sEgfu6YBojIz8Ij_ci2s7bHWKqw&oe=68421113&_nc_sid=5e03e0&_nc_cat=109";
                break;

            case 'KOCHEM':
                console.log('Bateu no KOCHEM')
                urlImg.value = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/441215577_1579258322621253_252254737559837277_n.jpg?ccb=11-4&oh=01_Q5Aa1gFHyiPmgmMEmg2qTccFccBom_55qeMbFJKTe_wQozIK_Q&oe=68434495&_nc_sid=5e03e0&_nc_cat=109";
                break;
        
            default:
                break;
        }
    }

    onMounted(() => {
        const storedUser = LocalStorage.getItem("user");
        if(storedUser)
        {
            user.value = storedUser as string;
            setImage()
        }
    })

</script>