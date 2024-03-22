import 'normalize.css/normalize.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

console.log('gxw get ', import.meta);
if (import.meta.env.MODE !== 'production') {
  // import eruda from 'eruda';
  // eruda.init();
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
