import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ 
    baseURL: process.env.API_SGBR_DC! 
});

export default defineBoot(({ app, router }) => {
    api.interceptors.request.use(
        (config) => {
            const user = LocalStorage.getItem("user");

            if(!user)
            {
                router.push('/');
            }
            
            return config;
        }
    )

    app.config.globalProperties.$axios = axios;
  

    app.config.globalProperties.$api = api;
  
});

export { api };
