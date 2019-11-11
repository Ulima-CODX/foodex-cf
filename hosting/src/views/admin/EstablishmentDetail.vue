<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>{{ data.name }}</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="#E41E2B" color="#FFFFFF" grow>
          <v-tab href="#details">Details</v-tab>
          <v-tab href="#employees">Employees</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <!--Establishment Details-->
    <v-tabs-items v-model="tab">
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
      <v-tab-item value="employees">
        <v-card-text class="pa-0">
          <v-list dense>
            <v-list-item
              >Managers:<v-spacer />
              <v-btn text icon @click="showDialog('manager')">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-list dense class="pa-0">
                <v-list-item v-for="m in data.employees.managers" :key="m.id">
                  {{ m.first_name }} {{ m.last_name }}<v-spacer />
                  <v-btn text icon @click="deleteEmployee('manager', m.id)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-list-item>
            <v-divider />
            <v-list-item
              >Order Handlers:<v-spacer />
              <v-btn text icon @click="showDialog('order_handler')">
                <v-icon>mdi-pencil</v-icon>
              </v-btn></v-list-item
            >
            <v-list-item>
              <v-list dense class="pa-0">
                <v-list-item
                  v-for="o in data.employees.order_handlers"
                  :key="o.id"
                >
                  {{ o.first_name }} {{ o.last_name }}<v-spacer />
                  <v-btn
                    text
                    icon
                    @click="deleteEmployee('order_handler', o.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-list-item>
            <v-divider />
            <v-list-item
              >Receptionists:<v-spacer />
              <v-btn text icon @click="showDialog('receptionist')">
                <v-icon>mdi-pencil</v-icon>
              </v-btn></v-list-item
            >
            <v-list-item>
              <v-list dense class="pa-0">
                <v-list-item
                  v-for="r in data.employees.receptionists"
                  :key="r.id"
                >
                  {{ r.first_name }} {{ r.last_name }}<v-spacer />
                  <v-btn
                    text
                    icon
                    @click="deleteEmployee('receptionist', r.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <!--Employee Selector Dialog-->
    <v-dialog v-model="dialog">
      <employee-selector :role="role" :action="addEmployees" />
    </v-dialog>
  </v-card>
</template>

<script>
//Controllers
import { getData } from "@/controllers/admin/establishments";

//Views
import EmployeeSelector from "@/views/admin/EmployeeSelector";

//Schema Imports
import { EstablishmentDocument } from "@/models/establishment/schema";

export default {
  components: {
    EmployeeSelector
  },
  methods: {
    showDialog(role) {
      this.dialog = true;
      this.role = role;
    },
    addEmployees(employees) {
      this.dialog = false;
      console.log(this.role, employees);
    },
    deleteEmployee(role, employee) {
      console.log(role, employee);
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
