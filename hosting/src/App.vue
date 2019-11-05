<template>
  <v-app class="grey lighten-4">
    <!--Navigation Bar-->
    <nav-bar />
    <!--Content-->
    <v-row no-gutters>
      <!--Navigation Drawer-->
      <nav-drawer v-if="user_id" :width="user_id ? '300px' : ''" />
      <!--Page Content-->
      <v-layout child-flex>
        <router-view width="auto" />
      </v-layout>
    </v-row>
  </v-app>
</template>

<script lang="ts">
//Vue & Plugin Imports
import Vue from "vue";
import { mapGetters } from "vuex";

//Component Imports
import NavBar from "@/views/components/NavBar.vue";
import NavDrawer from "@/views/components/NavDrawer.vue";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapGetters({ user_id: "getUserID" })
  },
  components: {
    NavBar,
    NavDrawer
  }
});
</script>
