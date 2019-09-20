<template>
  <div>
    <p>{{ id }}</p>
  </div>
</template>

<script>
import { db } from "../../firestore";
export default {
  name: "EmployeeProfile",
  props: {
    id: String
  },
  data: () => ({
    employee: null
  }),
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$bind("employee", db.collection("employees").doc(id));
      }
    }
  }
};
</script>

<style></style>
