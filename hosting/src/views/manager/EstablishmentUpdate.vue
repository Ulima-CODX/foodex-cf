<template>
  <v-card class="flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Edit Establishment</v-toolbar-title>
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
          setName(form.name);
          setDescription(form.description);
          setAddress(form.address);
          setPhone(form.phone);
          dialog = false;
        "
        >Modificar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";
//Controller Import
import { getData } from "@/controllers/manager/establishment";

//Schema Import
import { CountryCollection } from "@/models/country/schema";
import { EstablishmentCollection } from "@/models/establishment/schema";
import { EstablishmentDocument } from "@/models/establishment/schema";

export default {
  name: "establishment-update",
  methods: {
    setName: function(name) {
      this.establishment.setName(name);
    },
    setDescription: function(description) {
      this.establishment.setDescription(description);
    },
    setAddress: function(address) {
      this.establishment.setAddress(address);
    },
    setPhone: function(phone) {
      this.establishment.setPhone(phone);
    }
  },
  data() {
    return {
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
  },
  computed: {
    ...mapGetters({
      establishment_id: "userController/getUserEstablishment"
    })
  },
  async created() {
    this.establishment = new EstablishmentDocument(this.establishment_id);
    this.data = await getData();
  }
};
</script>
