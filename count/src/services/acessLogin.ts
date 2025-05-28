import { boot } from 'quasar/wrappers';
import axios from 'axios';

const acessApi = axios.create({
    baseURL: 'https://acessorestrito.sgbr.com.br/api/auth/login',
    headers: {
        Authorization: 'API Key 5L/8K//}#$@dwKgf/)XqqQB6ZnrhFHX4qm[Y*=wX&%sxSvU5S;nsBm&U=K=7'
    }
})

export default boot(( { app }) => {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$api = acessApi;

})

export { acessApi };