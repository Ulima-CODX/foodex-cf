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
//Plugin Import
import { mapGetters } from "vuex";

//Controller Imports
import { logout, AuthStatus } from "@/controllers/user/auth";
import { getData } from "@/controllers/user/profile";
import { goToListPage as adminGoToEstablishmentPage } from "@/controllers/admin/establishment";
import { goToListPage as adminGoToEmployeePage } from "@/controllers/admin/employee";
import { goToDetailPage as managerGoToEstablishmentPage } from "@/controllers/manager/establishment";
import { goToDetailPage as managerGoToMenuPage } from "@/controllers/manager/menu";
import { goToDetailPage as orderHandlerGoToMenuPage } from "@/controllers/order_handler/menu";
import { goToListPage as orderHandlerGoToOrderPage } from "@/controllers/order_handler/order";
import { goToListPage as receptionistGoToOrderPage } from "@/controllers/receptionist/orders";
import { goToListPage as receptionistGoToReservationPage } from "@/controllers/receptionist/reservations";

//Component Import
import NavLinkList from "@/views/components/NavLinkList";

//Component Export
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
          action: adminGoToEstablishmentPage,
          icon: "mdi-view-list"
        },
        {
          label: "Lista de Empleados",
          action: adminGoToEmployeePage,
          icon: "mdi-view-list"
        }
      ],
      managerLinks: [
        {
          label: "Local",
          action: managerGoToEstablishmentPage,
          icon: "mdi-information"
        },
        {
          label: "Menu",
          action: managerGoToMenuPage,
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
          action: orderHandlerGoToMenuPage,
          icon: "mdi-silverware-fork-knife"
        },
        {
          label: "Pedidos",
          action: orderHandlerGoToOrderPage,
          icon: "mdi-view-list"
        }
      ],
      receptionistLinks: [
        {
          label: "Reservas",
          action: receptionistGoToOrderPage,
          icon: "mdi-view-list"
        },
        {
          label: "Pedidos",
          action: receptionistGoToReservationPage,
          icon: "mdi-view-list"
        }
      ],
      logoutLinks: [
        {
          label: "Logout",
          action: logout,
          icon: "mdi-logout"
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
