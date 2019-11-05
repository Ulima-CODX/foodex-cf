<template>
  <v-card class="ma-4">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <!--Title-->
      <v-toolbar-title>Locales</v-toolbar-title>
      <v-spacer />
      <!--Search-->
      <v-text-field
        single-line
        hide-details
        placeholder="Nombre de Local"
        v-model="searchedEstablishmentName"
      >
        <v-icon slot="append" @click="search()">mdi-magnify</v-icon>
      </v-text-field>
      <!--Create-->
      <v-btn icon>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-toolbar>
    <!--Establishment List-->
    <v-list two-line v-if="establishments">
      <v-list-item-group
        v-for="(establishment, n) in establishments"
        :key="establishment.id"
      >
        <v-list-item>
          <!--Establishment Name-->
          <v-list-item-title>{{ establishment.data.name }}</v-list-item-title>
          <!--Establishment Description-->
          <v-list-item-subtitle>{{
            establishment.data.description
          }}</v-list-item-subtitle>
        </v-list-item>
        <!--Divider-->
        <v-divider v-if="n + 1 < establishments.length" />
      </v-list-item-group>
    </v-list>
    <!--Loading Animation-->
    <v-skeleton-loader v-else type="list-item" class="mx-auto" />
  </v-card>
</template>

<script>
import { create, read } from "@/controllers/admin/establishments";

export default {
  data() {
    return {
      searchedEstablishmentName: "",
      establishments: {}
    };
  },
  methods: {
    create,
    async search() {
      this.establishments = await read(this.searchedEstablishmentName);
    }
  },
  async created() {
    this.establishments = await read();
  }
};
</script>

<style></style>
