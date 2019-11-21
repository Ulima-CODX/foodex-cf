<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Pedidos</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <!--List-->
    <p>{{ orders }}</p>
    <p>{{ selected }}</p>
    <p>{{ selected.map(s => orders[s].id) }}</p>
    <v-list-item-group
      two-line
      v-model="selected"
      multiple
      active-class="pink--text"
    >
      <template v-for="(order, n) in orders">
        <v-list-item :key="order.id">
          <template v-slot:default="{ active, toggle }">
            <v-list-item-content>
              <v-list-item-title v-text="order.data.client_id" />
              <v-list-item-subtitle
                class="text--primary"
                v-text="order.data.dish_ids"
              />
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-text="order.data.time" />
              <v-btn icon v-if="active" color="red">
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider v-if="n + 1 < orders.length" :key="n"></v-divider>
      </template>
    </v-list-item-group>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Export
export default {
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapGetters({
      orders: "orderHandlerController/getOrderList"
    })
  }
};
</script>
