<template>
  <v-app class="grey lighten-4">
    <!--Navigation-->
    <navigation />
    <!--Page Content-->
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "@/views/components/Navigation.vue";

export default Vue.extend({
  name: "App",
  components: {
    Navigation
  },
  data: () => ({})
});
</script>
