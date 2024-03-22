import { createApp } from 'vue';
import 'normalize.css/normalize.css';
import 'amfe-flexible'

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

if (import.meta.env.MODE !== 'production') {
  // eslint-disable-next-line
  import('eruda').then((eruda) => {
    eruda.init();
  });
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
