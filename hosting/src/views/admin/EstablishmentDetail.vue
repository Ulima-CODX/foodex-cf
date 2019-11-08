<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
    </v-toolbar>
    <!--Establishment Details-->
    <v-list v-if="data">
      <editable-field :value="data.name" :action="show" />
      <editable-field :value="data.address" :action="show" />
      <editable-field :value="data.phone" :action="show" />
    </v-list>
  </v-card>
</template>

<script>
//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";

import EditableField from "@/views/components/EditableField";

export default {
  components: {
    EditableField
  },
  data() {
    return {
      establishment: null,
      data: null,
      updatingName: false,
      updatingAddress: false,
      updatingPhone: false
    };
  },
  methods: {
    show(value) {
      console.log(value);
    }
  },
  async mounted() {
    this.establishment = new EstablishmentDocument(this.$route.params.id);
    this.data = await this.establishment.read();
  }
};
</script>

<style></style>
