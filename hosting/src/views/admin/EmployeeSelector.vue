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
      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        @click="toogleSelection(employee.id)"
      >
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
        <v-checkbox :value="employee.id in selection" />
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="action()">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//Schema Import
import { EmployeeCollection } from "@/models/employee/schema";

//Controller Export
export default {
  name: "employee-selector",
  props: {
    title: String,
    add: Function,
    current: Array
  },
  data() {
    return {
      employees: {},
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
    action: function() {
      this.add(this.selection);
      this.selection = [];
    }
  },
  async created() {
    this.employees = await EmployeeCollection.read();
  }
};
</script>
