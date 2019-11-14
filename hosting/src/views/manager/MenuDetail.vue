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
      <!--Menu Details-->
      <v-tab-item value="details">
        <v-card-text class="pa-0">
          <v-list dense>
            <v-list-item>Name: {{ data.name }}</v-list-item>
            <v-list-item>Description: {{ data.description }}</v-list-item>
          </v-list>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {};
</script>
