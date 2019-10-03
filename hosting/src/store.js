import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      id: null,
      roles: {
        admin: false,
        manager: false,
        orderHandler: false
      }
    }
  },
  mutations: {
    setUser(state, { user_id, isAdmin, isManager, isOrderHandler }) {
      state.user.id = user_id;
      state.user.roles.admin = isAdmin;
      state.user.roles.manager = isManager;
      state.user.roles.orderHandler = isOrderHandler;
    },
    unsetUser(state) {
      state.user.id = null;
      state.user.roles.admin = false;
      state.user.roles.manager = false;
      state.user.roles.orderHandler = false;
    }
  },
  actions: {
    login({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("unsetUser");
    }
  }
});

export default store;
