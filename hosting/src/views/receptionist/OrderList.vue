<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Orders</v-toolbar-title>
    </v-toolbar>
    <!--List-->
    <v-list-item-group>
      <v-item v-for="order in orders" :key="order.id">
        <v-list-item-content>
          {{ order }}
        </v-list-item-content>
      </v-item>
    </v-list-item-group>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Export
export default {
  computed: {
    ...mapGetters({
      orders: "receptionistController/getOrderList"
    })
  }
};
</script>
