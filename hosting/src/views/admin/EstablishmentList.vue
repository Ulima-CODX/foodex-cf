<template>
  <v-card class="ma-4 flex">
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
        v-model="searchedName"
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
        <v-list-item @click="goToDetails(establishment.id)">
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
//Controller Import
import { goToDetails } from "@/controllers/admin/establishments";

//Schema Import
import { EstablishmentCollection } from "@/models/establishment/schema";

export default {
  data() {
    return {
      goToDetails,
      searchedName: "",
      establishments: {}
    };
  },
  methods: {
    async search() {
      this.establishments = await EstablishmentCollection.read(
        this.searchedName
      );
    }
  },
  async created() {
    this.establishments = await EstablishmentCollection.read();
  }
};
</script>

<style></style>
