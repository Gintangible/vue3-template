import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Test',
    component: () => import('@/views/test.vue'),
  },
  // 未知路由重定向
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
