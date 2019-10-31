import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/carta_encargado",
    name: "carta_encargado",
    component: () => import("@/views/CartaEncargado.vue")
  },
  {
    path: "/recepcionista",
    name: "recepcionista",
    component: () => import("@/views/Recepcionista.vue")
  },
  {
    path: "/gestor",
    name: "gestor",
    component: () => import("@/views/Gestor.vue")
  },
  {
    path: "/pedidos_encargado",
    name: "pedidos_encargado",
    component: () => import("@/views/PedidosEncargado.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
