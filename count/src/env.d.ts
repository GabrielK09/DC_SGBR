declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'history';
    VUE_ROUTER_BASE: string | undefined;
    
  }
  
}
