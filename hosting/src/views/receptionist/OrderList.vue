<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Orders</v-toolbar-title>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <!--List-->
    <v-list two-line>
    <v-list-item-group>
      <v-list-item v-for="order in orders" :key="order.id">
        <template v-slot:default="{ active, toggle }">
        <v-list-item-content>
          <!--v-list-item-title v-text="`ID: ${order.id}`"/-->
          <v-list-item-title v-text="`Juanito Alcachofa`"/>
          <!--v-list-item-subtitle
          class="text-primary"
          v-text="`Client ID: ${order.data.client_id}`"/-->
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Dish IDs: ${Object.entries(order.data.dish_ids)}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Status: ${order.data.status}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Comment: ${order.data.comment}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Sub-total: ${order.data.total}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Discount: ${order.data.discount}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Total: ${order.data.total_to_pay}`"/>
          <v-list-item-subtitle
          class="text-primary"
          v-text="`Time Stamp: ${order.data.timestamp}`"/>
        </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text
        v-text="order.action"/>
        <v-icon v-if="!active" color="grey lighten-1">
          mdi-star_border
        </v-icon>
        <v-btn icon v-else color="red">
          <v-icon>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-list-item-action>
      </template>
      </v-list-item>
    </v-list-item-group>
    </v-list>
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
