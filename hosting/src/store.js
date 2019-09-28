import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employee_id: "",
    links: {
      
    }
  },
  mutations: {
    setEmployee(state, payload) {
      state.employee_id = payload.employee_id;
    },
    unsetEmployee(state) {
      state.employee_id = "";
    },
    addLink(state, payload){
      state.links[payload.name] = payload.url
    },
    removeLink(state, payload){
      delete state.links[payload.name]
    }
  },
  actions: {}
});
