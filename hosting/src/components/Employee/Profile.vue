<template>
  <div id="profile">
    <div v-if="employee">
      <p>{{ $t("forms.prompts.first_name") }}: {{ employee.first_name }}</p>
      <p>{{ $t("forms.prompts.last_name") }}: {{ employee.last_name }}</p>
      <p>{{ $t("forms.prompts.email") }}: {{ employee.email }}</p>
      <p>{{ $t("forms.prompts.phone") }}: {{ employee.phone }}</p>
      <p>{{ $t("forms.prompts.country") }}: {{ employee.country.name }}</p>
      <p>
        {{ $t("forms.prompts.establishment") }}:
        {{ employee.establishment.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { db } from "../../firestore";

export default {
  name: "profile",
  data: () => ({
    employee: null
  }),
  computed: {
    employee_id() {
      return this.$store.state.employee_id;
    }
  },
  watch: {
    employee_id: {
      immediate: true,
      handler(employee_id) {
        this.$bind("employee", db.collection("employees").doc(employee_id))
          .then(employee => {
            console.log(employee);
            this.employee = employee;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
