<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-border-color</v-icon>
      </v-btn>
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
                <v-icon>mdi-silverware</v-icon>
              </v-list-item-action>
              <v-list-item-content>Name: {{ data.name }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-information-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>Description: {{ data.description }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>
              <v-list-item-content
                >Address: {{ data.address }}</v-list-item-content
              >
              <v-spacer></v-spacer>
              <v-btn icon @click="setAddress('Calle 1')">
                <v-icon>mdi-border-color</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>Phone: {{ data.phone }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-flag</v-icon>
              </v-list-item-action>
              <v-list-item-content>Country: {{ data.country.name }}</v-list-item-content>
            </v-list-item> 
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-briefcase</v-icon>
              </v-list-item-action>
              <v-list-item-content>Working Hours: <v-list-item>
              <v-list dense class="pa-0">
                <v-list-item v-for="(wh, i) in data.working_hours" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="mr-1" v-for="day in wh.days" :key="day">{{
                        day
                      }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >{{ wh.open }}  {{ wh.close }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item></v-list-item-content>
            </v-list-item> 
          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <!--Dialog-->
    <v-dialog v-model="dialog">
      <establishment-update />
    </v-dialog>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Controller Import
import { getData } from "@/controllers/manager/establishment";

//View Import
import EstablishmentUpdate from "@/views/manager/EstablishmentUpdate";

//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";

export default {
  name: "establishment-detail",
  components: {
    EstablishmentUpdate
  },
  methods: {
    showDialog: function(role) {
      this.dialog = true;
    },
    setAddress: function(address) {
      this.establishment.setAddress(address);
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
