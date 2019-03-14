import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '../api';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  state: {
    // 书籍目录
    bookRoot: '',
    // 书籍
    books: []
  },
  mutations: {
    setBookRoot(state, root) {
      state.bookRoot = root;
    }
  },
  actions: {
    // 初始化环境
    initEnv({ commit }) {
      const bookRoot = api.getBookRoot();
      commit('setBookRoot', bookRoot);
      return Promise.resolve(bookRoot);
    },
    setBookRoot({ commit }, root) {
      api.setBookRoot(root);
      commit('setBookRoot', root);
      return Promise.resolve(root);
    }
  }
});
