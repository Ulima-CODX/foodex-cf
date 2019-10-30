import Vue from "vue";
import Vuex from "vuex";
import { UserRoles } from "@/models/user/data";

Vue.use(Vuex);

const initRoles: UserRoles = {
  isAdmin: false,
  isManager: false,
  isOrderHandler: false,
  isReceptionist: false,
  isClient: false
};

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      roles: initRoles
    }
  },
  mutations: {
    setUser(state, user_id: string) {
      state.user.id = user_id;
    },
    unsetUser(state) {
      state.user.id = "";
    },
    setRoles(state, userRoles: UserRoles) {
      state.user.roles = userRoles;
    },
    unsetRoles(state) {
      state.user.roles = initRoles;
    }
  },
  actions: {
    login({ commit }, user: { id: string; roles: UserRoles }) {
      commit("setUser", user.id);
      commit("setRoles", user.roles);
    },
    logout({ commit }) {
      commit("unsetUser");
      commit("unsetRoles");
    }
  },
  modules: {}
});
