<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-toolbar>
    <!--Menu Details-->
    <v-card-text class="pa-0">
      <v-list dense>
        <v-list-item-group v-for="(dish, n) in dishes" :key="dish.id">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{dish.data.name}}</v-list-item-title>
              <v-list-item-subtitle>{{dish.data.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer />
          S/.{{ dish.data.price }}
          </v-list-item>
          <!--Divider-->
          <v-divider v-if="n + 1 < dishes.length" :key="n" />
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <!--Dialog-->
    <v-dialog v-model="dialog">
      <dish-new />
    </v-dialog>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Import
import DishNew from "@/views/manager/DishNew";

//Component Export
export default {
  components: {
    DishNew
  },
  computed: {
    ...mapGetters({
      menu_id: "managerController/getMenuCurrent",
      dishes: "managerController/getDishList"
    })
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
