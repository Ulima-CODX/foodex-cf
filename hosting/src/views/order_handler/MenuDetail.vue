<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Menu</v-toolbar-title>
    </v-toolbar>
    <!--Menu Details-->
    <v-card-text class="pa-0">
      <v-list dense>
        <template v-for="(dish, n) in dishes">
          <v-list-item :key="dish.id">
            <v-list-item-content>
              <v-list-item-title>{{ dish.data.name }}</v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{
                dish.data.description
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="text--primary">
                S/.{{ dish.data.price }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer />
            <v-switch :input-value="dish.data.available" />
          </v-list-item>
          <!--Divider-->
          <v-divider v-if="n + 1 < dishes.length" :key="n" />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Export
export default {
  computed: {
    ...mapGetters({
      menu_id: "orderHandlerController/getMenuCurrent",
      dishes: "orderHandlerController/getDishList"
    })
  }
};
</script>
