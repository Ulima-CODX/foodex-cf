<template>
  <nav>
    <!--App Toolbar-->
    <v-app-bar color="#E41E2B" flat dense>
      <!--Logo-->
      <v-img
        class="mx-2"
        src="@/resources/assets/foodex1.png"
        max-height="65"
        max-width="65"
        contain
        alt="logo"
      >
      </v-img>
      <!--App Name-->
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-black">Foodex</span>
      </v-toolbar-title>
      <!--Tab links-->
      <v-toolbar-items>
        <v-btn v-if="!logged" to="/register">Register</v-btn>
        <v-btn v-else @click="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
import Store from "@/plugins/vuex";
import { logout as UC_logout } from "@/controllers/user/auth";
import { UserController as UC } from "@/controllers/userC";

export default {
  data() {
    return {
      activeTab: 0,
      logged: Store.state.user.id != "",
      links: [{ label: "Admin", url: "/" }, { label: "Manager", url: "/" }]
    };
  },
  computed: {
    linksComputed() {
      return this.links;
    }
  },
  methods: {
    logout() {
      UC_logout();
    }
  }
};
</script>
