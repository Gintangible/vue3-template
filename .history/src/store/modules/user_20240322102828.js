import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => {
    return {
        name: 'hps',
    }
  },
  // other options...
});

export default useUserStore;
