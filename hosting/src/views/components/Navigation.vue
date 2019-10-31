<template>
  <nav>
    <!--Navigation Drawer-->
    <v-navigation-drawer v-model="sidebar" app />
    <!--App Toolbar-->
    <v-app-bar color="#E41E2B" flat>
      <!--Navigation Drawer Toogle-->
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="sidebar = !sidebar"
      />
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
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: () => ({
    sidebar: false
  })
};
</script>
