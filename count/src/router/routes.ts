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
        component: () => import('pages/IndexPage.vue')

      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
];

export default routes;
