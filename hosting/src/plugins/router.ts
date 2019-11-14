import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/user/Login.vue";

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
    path: "/register",
    name: "register",
    component: () => import("@/views/user/Register.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/user/Profile.vue")
  },
  {
    path: "/admin/establishments",
    name: "admin_establishment_list",
    component: () => import("@/views/admin/EstablishmentList.vue")
  },
  {
    path: "/admin/establishment/:id",
    name: "admin_establishment_detail",
    component: () => import("@/views/admin/EstablishmentDetail.vue")
  },
  {
    path: "/admin/employees",
    name: "admin_employee_list",
    component: () => import("@/views/admin/EmployeeList.vue")
  },
  {
    path: "/manager/establishment",
    name: "manager_establishment",
    component: () => import("@/views/manager/Restaurante.vue")
  },
  {
    path: "/manager/menu",
    name: "manager_menu",
    component: () => import("@/views/manager/CartaGestor.vue")
  },
  {
    path: "/manager/tables",
    name: "manager_tables",
    component: () => import("@/views/manager/MesaGestor.vue")
  },
  {
    path: "/order_handler/menu",
    name: "order_handler_menu",
    component: () => import("@/views/order_handler/CartaEncargado.vue")
  },
  {
    path: "/order_handler/orders",
    name: "order_handler_orders",
    component: () => import("@/views/order_handler/PedidosEncargado.vue")
  },
  {
    path: "/receptionist/reservations",
    name: "receptionist_reservations",
    component: () => import("@/views/receptionist/Reservas.vue")
  },
  {
    path: "/receptionist/orders",
    name: "receptionist_orders",
    component: () => import("@/views/receptionist/Recepcionista.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

import { Dictionary } from "vuex";

//route
export function route(): string {
  return router.currentRoute.name ? router.currentRoute.name : "";
}

//safePush: pushes a route the browser is not currently into.
export function safePush(
  route_name: string,
  params?: Dictionary<string>
): void {
  if (route() != route_name) {
    if (!params) router.push({ name: route_name });
    else router.push({ name: route_name, params });
  }
}
