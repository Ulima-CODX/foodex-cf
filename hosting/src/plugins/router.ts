import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/carta_encargado",
    name: "carta_encargado",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CartaEncargado.vue")
  },
  {
    path: "/recepcionista",
    name: "recepcionista",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Recepcionista.vue")
  },
  {
    path: "/gestor",
    name: "gestor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Gestor.vue")
  },
  {
    path: "/pedidos_encargado",
    name: "pedidos_encargado",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PedidosEncargado.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
