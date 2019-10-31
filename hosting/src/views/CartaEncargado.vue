<template>
  <v-card max-width="800" class="mx-auto">
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Carta</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template >
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
                <v-switch v-model="switch1"></v-switch>
              
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import item from "../views/components/Item"

export default {
  data: () => ({
    selected: [],
    items: [
      {
        action: "15 min",
        headline: "Lasagna",
        title: "Sergio Calcina",
        subtitle: "Sin Mesa"
      },
      {
        action: "2 hr",
        headline: "Tallarines Rojos",
        title: "Andre Cabrera",
        subtitle: "Mesa para 2"
      },
      {
        action: "6 hr",
        headline: "Aji de Gallina",
        title: "Daniel Vasquez",
        subtitle: "Mesa para 5"
      },
      {
        action: "12 hr",
        headline: "Lomo Saltado",
        title: "Eduardo",
        subtitle: "Mesa para 1"
      }
    ],
    switch1: true,
    switch2: false,
    
  })
};
</script>