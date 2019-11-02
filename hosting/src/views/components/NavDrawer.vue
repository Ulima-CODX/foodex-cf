<template>
  <v-navigation-drawer permanent height="auto">
    <!--Profile Header-->
    <v-list flat>
      <v-list-item to="/profile">
          <!--Avatar-->
          <v-list-item-avatar>
            <img src="@/resources/assets/foodex1.png" />
          </v-list-item-avatar>
          <!--Profile Description-->
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <!--Admin Links-->
    <v-list dense v-if="roles.isAdmin">
      <v-list-item v-for="(link, id) in adminLinks"
        :key="id"
        :to="link.url"
      >
        <!--Icon-->
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="roles.isAdmin"/>
    <!--Manager Links-->
    <v-list dense v-if="roles.isManager">
      <v-list-item v-for="(link, id) in managerLinks"
        :key="id"
        :to="link.url"
      >
        <!--Icon-->
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="roles.isManager"/>
    <!--Order Handler Links-->
    <v-list dense v-if="roles.isOrderHandler">
      <v-list-item v-for="(link, id) in orderHandlerLinks"
        :key="id"
        :to="link.url"
      >
        <!--Icon-->
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="roles.isOrderHandler"/>
    <!--Receptionist Links-->
    <v-list dense v-if="roles.isReceptionist">
      <v-list-item v-for="(link, id) in receptionistLinks"
        :key="id"
        :to="link.url"
      >
        <!--Icon-->
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="roles.isOrderHandler"/>
    <v-list dense>
      <v-list-item @click="logout">
        <!--Icon-->
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

import { logout } from "@/controllers/user/auth";

export default {
  data(){
    return {
      logout,
      adminLinks: [
        {label: "Lista de Locales", url: "", icon:"mdi-view-list"},
        {label: "Lista de Empleados", url: "", icon:"mdi-view-list"}
      ],
      managerLinks: [
        {label: "Local", url: "/restaurante", icon:"mdi-information"},
        {label: "Menu", url: "/carta_gestor", icon:"mdi-silverware-fork-knife"},
        {label: "Mesas", url: "/mesa_gestor", icon:"mdi-table-chair"}
      ],
      orderHandlerLinks: [
        {label: "Menu", url: "/carta_gestor", icon:"mdi-silverware-fork-knife"},
        {label: "Pedidos", url: "/pedidos_encargado", icon:"mdi-view-list"}
      ],
      receptionistLinks: [
        {label: "Reservas", url: "", icon:"mdi-view-list"},
        {label: "Pedidos", url: "/recepcionista", icon:"mdi-view-list"}
      ]
    }
  },
  computed: {
    ...mapGetters({ roles: "getUserRoles" })
  }
};
</script>

<style></style>
