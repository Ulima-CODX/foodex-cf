<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-btn icon @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="remove()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="#E41E2B" color="#FFFFFF" grow>
          <v-tab href="#details">Details</v-tab>
          <v-tab href="#employees">Employees</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <!--Tabs-->
    <v-tabs-items v-model="tab">
      <!--Establishment Details-->
      <v-tab-item value="details">
        <v-card-text class="pa-0">
          <v-list dense>
            <v-list-item>Name: {{ data.name }}</v-list-item>
            <v-list-item>Description: {{ data.description }}</v-list-item>
            <v-list-item>Address: {{ data.address }}</v-list-item>
            <v-list-item>Phone: {{ data.phone }}</v-list-item>
            <v-list-item
              >Country:
              <img class="ml-2 mr-1" :src="data.country.flag_url" />
              {{ data.country.name }}</v-list-item
            >
            <v-list-item>Working Hours:</v-list-item>
            <v-list-item>
              <v-list dense class="pa-0">
                <v-list-item v-for="(wh, i) in data.working_hours" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="mr-1" v-for="day in wh.days" :key="day">{{
                        day
                      }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >{{ wh.open }} - {{ wh.close }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-tab-item>
      <!--Establishment Employees-->
      <v-tab-item value="employees">
        <v-card-text class="pa-0">
          <v-list dense class="pa-0">
            <establishment-employee-list
              title="Managers"
              role="manager"
              :list="data.employees.managers"
              :add="addEmployee"
              :del="delEmployee"
            />
            <establishment-employee-list
              title="Order Handlers"
              role="order_handler"
              :list="data.employees.order_handlers"
              :add="addEmployee"
              :del="delEmployee"
            />
            <establishment-employee-list
              title="Recepcionists"
              role="receptionist"
              :list="data.employees.receptionists"
              :add="addEmployee"
              :del="delEmployee"
            />
          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Controller Imports
import { getData } from "@/controllers/admin/establishment";
import { goToListPage } from "@/controllers/admin/establishment";

//View Import
import EstablishmentEmployeeList from "@/views/admin/EstablishmentEmployeeList";

//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";
import { EmployeeDocument } from "@/models/employee/schema";

//Controller Export
export default {
  name: "establishment-detail",
  components: {
    EstablishmentEmployeeList
  },
  data() {
    return {
      tab: null,
      establishment: null,
      data: {
        country: {},
        employees: {}
      }
    };
  },
  computed: {
    ...mapGetters({
      establishment_id: "adminController/getEstablishmentCurrent"
    })
  },
  methods: {
    back: function() {
      goToListPage();
    },
    addEmployee: function(role) {
      return function(employee_ids) {
        employee_ids.map(employee_id => {
          this.establishment.assignEmployee(
            new EmployeeDocument(employee_id),
            role
          );
        });
      };
    },
    delEmployee: function(role, employee_id) {
      this.establishment.dismissEmployee(
        new EmployeeDocument(employee_id),
        role
      );
    },
    remove: function() {
      this.establishment.delete();
    }
  },
  watch: {
    establishment_id: async function(establishment_id) {
      this.establishment = new EstablishmentDocument(establishment_id);
      this.data = await getData(this.establishment);
    }
  },
  async created() {
    this.establishment = new EstablishmentDocument(this.establishment_id);
    this.data = await getData(this.establishment);
  }
};
</script>
