<template>
  <div id="profile">
    <p>{{ employee.last_name }}, {{ employee.first_name }}</p>
    <p>{{ employee.email }}</p>
    <p>{{ employee.phone }}</p>
    <p>{{ employee.country.name }}</p>
    <p></p>
  </div>
</template>

<script>
import { db } from "../../firestore";
export default {
  name: "profile",
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

<style lang="scss" scoped></style>
