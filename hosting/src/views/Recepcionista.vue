<template>
<v-container>
  <v-card min-width="800" max-width="900" class="mx-auto my-4">
    <v-toolbar color="#E41E2B" dark>
      <v-toolbar-title>Pedidos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group v-model="selected" multiple active-class="pink--text">
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
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

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>
                <v-icon v-if="!active" color="grey lighten-1">
                  mdi-star_border
                </v-icon>

                <v-btn icon v-else color="red">
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
  <v-navigation-drawer
      absolute
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="@/resources/assets/foodex1.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>RecpecionistName</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in tasks"
          :key="item.title"
        >
          <!--v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon-->

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</v-container>
</template>

<script>
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
      },
      {
        action: "12 hr",
        headline: "Ceviche",
        title: "Carlos",
        subtitle: "Mesa para 4"
      }
    ],
  tasks: [
    {
      title: "Lista de Pedidos"
    },
    {
      title: "Perfil"
    },
    {
      title: "Logout"
    }
  ]
  })
};
</script>
