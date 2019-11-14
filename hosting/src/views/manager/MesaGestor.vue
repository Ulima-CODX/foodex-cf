<template>
  <v-card class="ma-4 flex">
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Disponibilidad de Mesas</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                small
                color="blue"
                v-on:click="item.nroMesas -= 1"
                v-if="item.nroMesas > 0"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <!--input
                v-model="defaultSelected"
                item-value="10"
                type="number"
                step="1"
                min="0"
                max="10"/-->
              <v-text-field
                v-model="item.nroMesas"
                v-if="item.nroMesas > -1 && item.nroMesas < 11"
                disabled
                style="font-weight:bold;"
              />
              <v-btn
                small
                color="blue"
                v-on:click="item.nroMesas += 1"
                v-if="item.nroMesas < 10"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-list-item>
          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    items: [
      {
        title: "Mesa para 2",
        nroMesas: 10
      },
      {
        title: "Mesa para 4",
        nroMesas: 10
      },
      {
        title: "Mesa para 6",
        nroMesas: 10
      },
      {
        title: "Mesa para 8",
        nroMesas: 10
      }
    ]
  })
};
</script>
