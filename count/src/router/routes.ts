import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/home', 
    component: () => import('layouts/SideBar.vue'),
    children: [
      {
        path: '/counter',
        component: () => import('pages/DC/CountCall.vue'),
        name: 'CountCall'

      },
      {
        path: '/send-message',
        component: () => import('pages/DC/SendMessage.vue'),
        name: 'SendMessage'
      },
      {
        path: '/check-winners',
        component: () => import('pages/DC/Winners/WinnersPage.vue'),
        name: 'WinnersPage'
      },
      
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
];

export default routes;
