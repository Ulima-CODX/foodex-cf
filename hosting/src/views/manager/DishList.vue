<template>
  <v-card class="ma-4 flex">
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "dish-list",
  data() {
    return {
      dishes: []
    };
  }
};
</script>
