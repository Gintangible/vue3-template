import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    name: 'hps',
  }),
});

export default useUserStore;
