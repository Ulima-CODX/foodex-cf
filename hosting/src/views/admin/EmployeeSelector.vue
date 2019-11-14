<template>
  <v-card class="flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <!--Title-->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <!--Search-->
      <v-text-field single-line hide-details placeholder="Nombre de Local">
        <v-icon slot="append">mdi-magnify</v-icon>
      </v-text-field>
    </v-toolbar>
    <!--Employee List-->
    <v-list one-line>
      <v-list-item v-for="(employee, n) in employees" :key="employee.id">
        <v-list-item @click="toogleSelection(employee.id)">
          <v-list-item-content>
            <!--Employee Name-->
            <v-list-item-title
              >{{ employee.data.first_name }}
              {{ employee.data.last_name }}</v-list-item-title
            >
            <!--Employee Establishment-->
            <v-list-item-subtitle>{{
              employee.data.establishment_name
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-checkbox input-value="true"></v-checkbox>
        </v-list-item>
        <!--Divider-->
        <v-divider v-if="n + 1 < employees.length" />
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="doAction()">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//Schema Import
import { EmployeeCollection } from "@/models/employee/schema";

export default {
  name: "employee-selector",
  props: {
    role: String,
    action: Function
  },
  data() {
    return {
      employees: {},
      title: "Add Employees",
      selection: [],
      checkbox1: true
    };
  },
  methods: {
    toogleSelection: function(id) {
      const n = this.selection.find(val => val == id);
      if (n) this.selection.splice(id);
      else this.selection.push(id);
    },
    doAction: function() {
      this.action(this.selection);
      this.selection = [];
    }
  },
  watch: {
    role: function(role) {
      switch (role) {
        case "manager":
          this.title = "Add Managers";
          break;
        case "order_handler":
          this.title = "Add Order Handlers";
          break;
        case "receptionist":
          this.title = "Add Receptionists";
          break;
      }
    }
  },
  async created() {
    this.employees = await EmployeeCollection.read();
  }
};
</script>
