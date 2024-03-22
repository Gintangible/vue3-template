import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import config from '@/config';

console.log('gxw get ', config);
console.log('gxw get ', import.meta.env);

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
