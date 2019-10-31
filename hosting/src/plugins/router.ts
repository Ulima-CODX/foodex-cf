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
    path: "/carta_gestor",
    name: "carta_gestor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CartaGestor.vue")
  },
  {
    path: "/pedidos_encargado",
    name: "pedidos_encargado",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PedidosEncargado.vue")
  },
  {
    path: "/mesa_gestor",
    name: "mesa_gestor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MesaGestor.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Administrador.vue")
  },
  {
    path: "/restaurante",
    name: "restaurante",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Restaurante.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
