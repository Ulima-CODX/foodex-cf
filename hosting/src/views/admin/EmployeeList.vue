<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <!--Title-->
      <v-toolbar-title>Empleados</v-toolbar-title>
      <v-spacer />
      <!--Search-->
      <v-text-field single-line hide-details placeholder="Nombre de Local">
        <v-icon slot="append">mdi-magnify</v-icon>
      </v-text-field>
    </v-toolbar>
    <!--Employee List-->
    <v-list one-line v-if="employees">
      <v-list-item-group v-for="(employee, n) in employees" :key="employee.id">
        <v-list-item>
          <v-list-item-content>
            <!--Employee Name-->
            <v-list-item-title
              >{{ employee.data.first_name }}
              {{ employee.data.last_name }}</v-list-item-title
            >
            <v-spacer />
            <!--Employee Establishment-->
            <v-list-item-subtitle>{{
              employee.data.establishment_name
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!--Divider-->
        <v-divider v-if="n + 1 < employees.length" />
      </v-list-item-group>
    </v-list>
    <!--Loading Animation-->
    <v-skeleton-loader v-else type="list-item" class="mx-auto" />
  </v-card>
</template>

<script>
import { read } from "@/controllers/admin/employee";

export default {
  data() {
    return {
      employees: {}
    };
  },
  async created() {
    this.employees = await read();
  }
};
</script>

<style></style>
