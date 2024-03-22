import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // {
  //   path: '/login',
  //   name: 'Login',
  //   meta: {
  //     keepAlive: true,
  //     requireAuth: false
  //   },
  // },
  // {
  // 未知路由重定向
  {
    path: '/:pathMatch(.*)',
    name: 'Error404',
    component: () => import('@/views/error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
