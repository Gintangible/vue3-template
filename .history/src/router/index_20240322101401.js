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
  {
    path: '*',
    name: 'Error404',
    component: () => import('@/views/error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
