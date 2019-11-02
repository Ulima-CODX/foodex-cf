<template>
  <v-app class="grey lighten-4">
    <!--Navigation-->
    <nav-bar/>
    <!--Page Content-->
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/views/components/NavBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    NavBar
  }
});
</script>
