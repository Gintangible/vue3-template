import 'normalize.css/normalize.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

if (process.env.NODE_ENV !== 'production') {
  import eruda from 'eruda';
  eruda.init();
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
