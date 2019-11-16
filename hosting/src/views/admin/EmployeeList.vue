<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <!--Title-->
      <v-toolbar-title>Empleados</v-toolbar-title>
      <v-spacer />
      <!--Search-->
      <v-text-field single-line hide-details placeholder="Nombre de Empleado">
        <v-icon slot="append">mdi-magnify</v-icon>
      </v-text-field>
    </v-toolbar>
    <!--Employee List-->
    <v-list one-line>
      <v-list-item v-for="employee in employees" :key="employee.id">
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
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Export
export default {
  name: "employee-list",
  computed: {
    ...mapGetters({
      employees: "adminController/getEmployeeList"
    })
  }
};
</script>
