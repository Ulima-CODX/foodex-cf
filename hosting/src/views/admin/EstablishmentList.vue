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
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </v-toolbar>
    <!--Establishment List-->
    <v-list two-line v-if="establishments">
      <v-list-item
        v-for="(establishment, n) in establishments"
        :key="establishment.id"
        @click="goToDetailPage(establishment.id)"
      >
        <!--Establishment Name-->
        <v-list-item-title>{{ establishment.data.name }}</v-list-item-title>
        <!--Establishment Description-->
        <v-list-item-subtitle>{{
          establishment.data.description
        }}</v-list-item-subtitle>
        <!--Divider-->
        <v-divider v-if="n + 1 < establishments.length" />
      </v-list-item>
    </v-list>
    <!--Dialog-->
    <v-dialog v-model="dialog">
      <establishment-new />
    </v-dialog>
  </v-card>
</template>

<script>
//Controller Import
import { goToDetailPage } from "@/controllers/admin/establishment";

//View Import
import EstablishmentNew from "@/views/admin/EstablishmentNew";

//Schema Import
import { EstablishmentCollection } from "@/models/establishment/schema";

export default {
  name: "establishment-list",
  components: {
    EstablishmentNew
  },
  data() {
    return {
      goToDetailPage,
      searchedName: "",
      dialog: false,
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
