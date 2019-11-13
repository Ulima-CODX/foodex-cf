<template>
  <v-navigation-drawer permanent height="auto">
    <!--Profile Header-->
    <v-list flat class="pa-0">
      <v-list-item to="/profile">
        <!--Avatar-->
        <v-list-item-avatar>
          <img src="@/resources/assets/logoNegro.png" />
        </v-list-item-avatar>
        <!--Profile Description-->
        <v-list-item-content v-if="user">
          <v-list-item-title
            >{{ user.first_name }} <br />
            {{ user.last_name }}</v-list-item-title
          >
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <!--Admin Links-->
    <nav-link-list :show="roles.isAdmin" :links="adminLinks" />
    <!--Manager Links-->
    <nav-link-list :show="roles.isManager" :links="managerLinks" />
    <!--Order Handler Links-->
    <nav-link-list :show="roles.isOrderHandler" :links="orderHandlerLinks" />
    <!--Receptionist Links-->
    <nav-link-list :show="roles.isReceptionist" :links="receptionistLinks" />
    <!--Logout Links-->
    <nav-link-list :links="logoutLinks" :divider="false" />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

import { logout, AuthStatus } from "@/controllers/user/auth";
import { getData } from "@/controllers/user/profile";

import NavLinkList from "@/views/components/NavLinkList";

export default {
  components: {
    NavLinkList
  },
  data() {
    return {
      user: null,
      adminLinks: [
        {
          label: "Lista de Locales",
          name: "admin_establishment_list",
          icon: "mdi-view-list"
        },
        {
          label: "Lista de Empleados",
          name: "admin_employee_list",
          icon: "mdi-view-list"
        }
      ],
      managerLinks: [
        {
          label: "Local",
          name: "manager_establishment",
          icon: "mdi-information"
        },
        {
          label: "Menu",
          name: "manager_menu",
          icon: "mdi-silverware-fork-knife"
        },
        {
          label: "Mesas",
          name: "manager_tables",
          icon: "mdi-table-chair"
        }
      ],
      orderHandlerLinks: [
        {
          label: "Menu",
          name: "order_handler_menu",
          icon: "mdi-silverware-fork-knife"
        },
        {
          label: "Pedidos",
          name: "order_handler_orders",
          icon: "mdi-view-list"
        }
      ],
      receptionistLinks: [
        {
          label: "Reservas",
          name: "receptionist_reservations",
          icon: "mdi-view-list"
        },
        {
          label: "Pedidos",
          name: "receptionist_orders",
          icon: "mdi-view-list"
        }
      ],
      logoutLinks: [
        {
          label: "Logout",
          icon: "mdi-logout",
          action: logout
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      roles: "userController/getUserRoles",
      user_id: "userController/getUserCurrent"
    })
  },
  watch: {
    user_id: async function(user_id) {
      this.user = await getData(user_id);
    }
  },
  async mounted() {
    this.user = await getData(this.user_id);
  }
};
</script>
