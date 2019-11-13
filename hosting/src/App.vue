<template>
  <v-app class="grey lighten-4">
    <!--Navigation Bar-->
    <nav-bar />
    <!--Content-->
    <v-row no-gutters>
      <!--Navigation Drawer-->
      <nav-drawer v-if="user_id" :width="user_id ? '300px' : ''" />
      <!--Page Content-->
      <router-view width="auto" />
    </v-row>
  </v-app>
</template>

<script lang="ts">
//Vue & Plugin Imports
import Vue from "vue";
import { mapGetters } from "vuex";
import Store from "@/plugins/vuex";

//Controller Imports
import { userController } from "@/controllers/user";
Store.registerModule("userController", userController);
console.log(Store.getters);

//Component Imports
import NavBar from "@/views/user/NavBar.vue";
import NavDrawer from "@/views/user/NavDrawer.vue";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapGetters({ user_id: "userController/getUserCurrent" })
  },
  components: {
    NavBar,
    NavDrawer
  }
});
</script>
