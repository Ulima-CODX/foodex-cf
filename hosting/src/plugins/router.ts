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
    path: "/carta_gestor",
    name: "carta_gestor",
    component: () => import("@/views/CartaGestor.vue")
  },
  {
    path: "/pedidos_encargado",
    name: "pedidos_encargado",
    component: () =>
      import("../views/PedidosEncargado.vue")
  },
  {
    path: "/mesa_gestor",
    name: "mesa_gestor",
    component: () =>
      import("../views/MesaGestor.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import("../views/Administrador.vue")
  },
  {
    path: "/restaurante",
    name: "restaurante",
    component: () =>
      import("../views/Restaurante.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
