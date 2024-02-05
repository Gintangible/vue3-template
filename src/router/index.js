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
  //   path: '/',
  //   name: 'Index',
  //   meta: {
  //     title: '首页',
  //     keepAlive: true,
  //     requireAuth: true
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
