import { createRouter, createWebHistory } from 'vue-router';

import TEST_ROUTES from './test';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
  },
  ...TEST_ROUTES,
  // https://router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6-%E8%B7%AF%E7%94%B1
  {
    path: '/:pathMatch(.*)',
    name: 'Error404',
    component: () => import('@/views/error-404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
