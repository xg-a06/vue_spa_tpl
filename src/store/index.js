import { createStore } from 'vuex';

const isDev = process.env.NODE_ENV !== 'production';

const store = createStore({
  strict: isDev,
  state: {
    num: 3,
  },
  getters: {
    isEven: (state) => state.num % 2 === 0,
  },
  mutations: {
    addNum(state, data) {
      state.num += data.num;
    },
  },
  actions: {
    addNumAsync({ commit }, data) {
      setTimeout(() => {
        commit('addNum', data);
      }, 2000);
    },
  },
  modules: {},
});

export default store;
