<template>
  <nav>
    <!--App Toolbar-->
    <v-app-bar color="#E41E2B" flat dense dark>
      <!--Logo-->
      <v-img
        class="mx-2"
        src="@/resources/assets/logoBlancoIMG.png"
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
      <v-spacer />
      <!--Tab links-->
      <v-toolbar-items>
        <v-btn text v-if="showLogin" to="/login">Login</v-btn>
        <v-btn text v-if="showRegister" to="/register">Register</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
//Plugin Imports
import { mapGetters } from "vuex";
import { route } from "@/plugins/router";

export default {
  data() {
    return {
      showLogin: route() != "login" && !this.user_id,
      showRegister: route() != "register" && !this.user_id
    };
  },
  computed: {
    ...mapGetters({ user_id: "userController/getUserCurrent" })
  },
  watch: {
    $route(to, from) {
      this.showLogin = to.name != "login" && !this.user_id;
      this.showRegister = to.name != "register" && !this.user_id;
    }
  }
};
</script>
