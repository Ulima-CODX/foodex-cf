<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <!--Menu Details-->
    <v-card-text class="pa-0">
      <v-list dense>
        <template v-for="(dish, n) in dishes">
          <v-list-item :key="dish.id">
            {{ dish }}
          </v-list-item>
          <v-divider v-if="n + 1 < dishes.length" :key="n" />
        </template>
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
