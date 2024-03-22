import 'normalize.css/normalize.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

if (import.meta.env.MODE !== 'production') {
  // eslint-disable-next-line
  const eruda = await import('eruda');
  eruda.init();
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
