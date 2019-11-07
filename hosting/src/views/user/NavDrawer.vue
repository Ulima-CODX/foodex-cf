<template>
  <v-navigation-drawer permanent height="auto">
    <!--Profile Header-->
    <v-list flat>
      <v-list-item to="/profile">
        <!--Avatar-->
        <v-list-item-avatar>
          <img src="@/resources/assets/logoNegro.png" />
        </v-list-item-avatar>
        <!--Profile Description-->
        <v-list-item-content v-if="user">
          <v-list-item-title
            >{{ user.first_name }} {{ user.last_name }}</v-list-item-title
          >
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <!--Admin Links-->
    <v-list dense v-if="roles.isAdmin">
      <v-list-item
        v-for="(link, id) in adminLinks"
        :key="id"
        :to="{ name: link.name }"
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
    <v-divider v-if="roles.isAdmin" />
    <!--Manager Links-->
    <v-list dense v-if="roles.isManager">
      <v-list-item
        v-for="(link, id) in managerLinks"
        :key="id"
        :to="{ name: link.name }"
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
    <v-divider v-if="roles.isManager" />
    <!--Order Handler Links-->
    <v-list dense v-if="roles.isOrderHandler">
      <v-list-item
        v-for="(link, id) in orderHandlerLinks"
        :key="id"
        :to="{ name: link.name }"
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
    <v-divider v-if="roles.isOrderHandler" />
    <!--Receptionist Links-->
    <v-list dense v-if="roles.isReceptionist">
      <v-list-item
        v-for="(link, id) in receptionistLinks"
        :key="id"
        :to="{ name: link.name }"
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
    <v-divider v-if="roles.isReceptionist" />
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
import { getData } from "@/controllers/user/profile";

export default {
  data() {
    return {
      user: null,
      logout,
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
      ]
    };
  },
  computed: {
    ...mapGetters({
      roles: "getUserRoles"
    })
  },
  async mounted() {
    this.user = await getData();
  }
};
</script>

<style></style>
