<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-btn icon @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
    </v-toolbar>
    <!--Details-->
    <v-card-text class="pa-0">
      <v-list dense>
        <v-list-item>Name: {{ data.name }}</v-list-item>
        <v-list-item>Price: S/.{{ data.price }}</v-list-item>
        <v-list-item>Available: {{ data.available }}</v-list-item>
        <v-list-item>Description: {{ data.description }}</v-list-item>
        <v-list-item>Ingredients:</v-list-item>
        <v-list-item>
          <v-list dense class="pa-0">
            <v-list-item v-for="(ingredient, i) in data.ingredients" :key="i">
              {{ ingredient }}
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-card-text>
    <!---->
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn text color="warning" @click="remove()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Controller Import
import { goToDetailPage as goToDishList } from "@/controllers/manager/menu";

//Schema Import
import { DishDocument } from "../../models/dish/schema";
import { MenuDocument } from '../../models/menu/schema';

//Component Eport
export default {
  props: {
    action: Function
  },
  methods: {
    back(){
      goToDishList();
    },
    remove(){
      this.menu.removeDish(this.dish);
      goToDishList();
    }
  },
  computed: {
    ...mapGetters({
      menu_id: "managerController/getMenuCurrent",
      dish_id: "managerController/getDishCurrent"
    })
  },
  watch: {
    dish_id: async function(dish_id) {
      this.dish = new DishDocument(dish_id);
      this.data = await this.dish.read();
    }
  },
  data(){
    return {
      menu: null,
      dish: null,
      data: {}
    }
  },
  async mounted() {
    this.menu = new MenuDocument(this.menu_id);
    this.dish = new DishDocument(this.dish_id);
    this.data = await this.dish.read();
  }
};
</script>
