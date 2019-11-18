<template>
  <div>
    <v-list-item
      >{{ title }}<v-spacer />
      <v-btn text icon @click="dialog = true">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-list-item>
    <v-list-item v-if="list != undefined && list.length > 0">
      <v-list dense class="pa-0">
        <v-list-item v-for="e in list" :key="e.id">
          {{ e.first_name }} {{ e.last_name }}<v-spacer />
          <v-btn text icon @click="del(role, e.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-list-item>
    <v-dialog v-model="dialog">
      <employee-selector
        :title="`Add ${title}`"
        :add="add(role)"
        :current="list"
      />
    </v-dialog>
    <v-divider />
  </div>
</template>

<script>
//View Import
import EmployeeSelector from "@/views/admin/EmployeeSelector";

//Component Export
export default {
  name: "establishment-employee-list",
  props: {
    title: String,
    role: String,
    list: Array,
    add: Function,
    del: Function
  },
  components: {
    EmployeeSelector
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
