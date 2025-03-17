// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    todos: []
  },
  getters: {
    user: state => state.user,
    todos: state => state.todos
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    }
  },
  actions: {
    fetchUser({ commit }) {
      // 模拟 API 请求
      setTimeout(() => {
        const user = { name: 'John Doe', age: 30 };
        commit('SET_USER', user);
      }, 1000);
    },
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    }
  },
  modules: {
    // 可以在这里添加 Vuex 模块
  }
});