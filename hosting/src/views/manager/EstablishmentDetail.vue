<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="#E41E2B" color="#FFFFFF" grow>
          <v-tab href="#details">Details</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <!--Tabs-->
    <v-tabs-items v-model="tab">
      <!--Establishment Details-->
      <v-tab-item value="details">
        <v-card-text class="pa-0">
          <v-list dense>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>         
              <v-list-item-content>Address: {{ data.address }}</v-list-item-content>   
              <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>            
              <v-list-item-content>Phone: {{ data.phone }}</v-list-item-content>
              <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
            </v-list-item>

          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <!--Dialog-->
    <v-dialog v-model="dialog"> </v-dialog>
  </v-card>
</template>

<script>
//Controller Import
import { getData } from "@/controllers/admin/establishments";

//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";

export default {
  name: "establishment-detail",
  methods: {
    showDialog(role) {
      this.dialog = true;
    }
  },
  data() {
    return {
      tab: null,
      dialog: false,
      role: "",
      establishment: null,
      data: {
        country: {},
        employees: {}
      }
    };
  },
  async created() {
    this.establishment = new EstablishmentDocument(this.$route.params.id);
    this.data = await getData(this.establishment);
  }
};
</script>
