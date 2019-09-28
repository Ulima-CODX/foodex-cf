import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "./components/Public/Login.vue";
import Register from "./components/Public/Register.vue";
import About from "./components/Public/About.vue";
import Dashboard from "./components/Employee/Dashboard.vue";
import Profile from "./components/Employee/Profile.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/about", component: About },
  {
    path: "/dashboard*",
    component: Dashboard,
    children: [{ path: "/", component: Profile }]
  }
];

export default new VueRouter({ routes, mode: "history" });
