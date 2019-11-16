<template>
  <v-card class="flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Add New Establishment</v-toolbar-title>
    </v-toolbar>
    <!--Establishment Form-->
    <v-card-text>
      <v-form>
        <!--Name-->
        <v-text-field single-line label="Name" v-model="form.name" />
        <!--Description-->
        <v-text-field
          single-line
          label="Description"
          v-model="form.description"
        />
        <!--Address-->
        <v-text-field single-line label="Address" v-model="form.address" />
        <!--Phone-->
        <v-text-field single-line label="Phone" v-model="form.phone" />
        <!--Country-->
        <v-select
          :items="countries"
          item-text="data.name"
          item-value="id"
          label="Country"
          v-model="form.country_id"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <!--Create Button-->
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="info"
        @click="
          create(form);
          dialog = false;
        "
        >Crear</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
//Controller Import
import { create } from "@/controllers/admin/establishment";

//Schema Import
import { CountryCollection } from "@/models/country/schema";
import { EstablishmentCollection } from "@/models/establishment/schema";

export default {
  name: "establishment-new",
  data() {
    return {
      create,
      form: {
        name: "",
        description: "",
        address: "",
        phone: "",
        country_id: ""
      },
      countries: []
    };
  },
  async mounted() {
    this.countries = await CountryCollection.read();
  }
};
</script>
