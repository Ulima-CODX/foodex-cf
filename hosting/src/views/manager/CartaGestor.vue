<template>
  <v-card class="ma-4">
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Carta</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-border-color</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-close-box</v-icon>
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
        title: "Lasagna"
      },
      {
        title: "Tallarines Rojos"
      },
      {
        title: "Aji de Gallina"
      },
      {
        title: "Lomo Saltado"
      }
    ]
  })
};
</script>
