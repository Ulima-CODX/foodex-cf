<template>
  <div></div>
</template>

<script>
import { db } from "../../firestore";
export default {
  name: "EmployeeList",
  data: () => {
    return {
      employees: []
    };
  },
  firestore: {
    employees: db.collection("employees")
  }
};
</script>

<style></style>
