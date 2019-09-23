import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "./components/Public/Login.vue";
import Register from "./components/Public/Register.vue";
import About from "./components/Public/About.vue";

const routes = [
  { path: "/register", component: Register },
  { path: "/about", component: About },
  { path: "/", component: Login }
];

export default new VueRouter({ routes, mode: "history" });
