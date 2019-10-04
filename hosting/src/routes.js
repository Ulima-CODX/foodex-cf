import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Login from "./components/Public/Login.vue";
import Register from "./components/Public/Register.vue";
import About from "./components/Public/About.vue";
import Dashboard from "./components/User/Dashboard.vue";
import Profile from "./components/User/Profile.vue";
import Await from "./components/User/Await.vue";
import EstablishmentList from "./components/Admin/EstablishmentList.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/about", component: About },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "", redirect: "profile" },
      { path: "profile", component: Profile },
      { path: "establishments", component: EstablishmentList },
      { path: "management", component: Profile },
      { path: "orders", component: Profile },
      { path: "await", component: Await }
    ]
  }
];

const router = new VueRouter({ routes, mode: "history" });
export default router;
