<template>
  <div class="employee-list">
    <div class="employee-list-header">
      {{ $t(`pages.establishments.${type}s`) }}
      <form
        :id="`add-${type}`"
        class="inline-form ml"
        @submit.prevent="add(new_employee)"
      >
        <select v-model="new_employee">
          <option
            v-for="employee in employees"
            :key="employee.id"
            :value="employee"
          >
            {{ employee.user.first_name }} {{ employee.user.last_name }}
          </option>
        </select>
        <button type="submit">+</button>
      </form>
      <span :id="`add-${type}-btn`" class="btn ml" v-on:click="toggleForm"
        >+</span
      >
    </div>
    <div v-if="list.length > 0">
      <div class="employee" v-for="employee in list" :key="employee.id">
        <p class="tab-1 hl-tb">
          {{ employee.user.first_name }} {{ employee.user.last_name }}
          <span class="btn del-btn" v-on:click="del(employee)">x</span>
        </p>
      </div>
    </div>
    <p v-else class="tab-1 gray">
      {{ $t(`pages.establishments.missing_${type}s`) }}
    </p>
  </div>
</template>

<script>
import { db, FieldValue } from "../../firestore";

export default {
  name: "employee-list",
  props: ["type", "establishment_id", "list"],
  data: () => ({
    establishment: null,
    selection: [],
    employees: [],
    isAdding: false,
    new_employee: null
  }),
  firestore: {
    employees: db.collection("employees")
  },
  watch: {
    establishment_id: {
      immediate: true,
      handler(establishment_id) {
        this.$bind(
          "establishment",
          db.collection("establishments").doc(establishment_id)
        )
          .then(res => (this.establishment = res))
          .catch(err => console.error(err));
      }
    }
  },
  methods: {
    toggleForm() {
      this.isAdding = !this.isAdding;
      const button = document.getElementById(`add-${this.type}-btn`);
      const form = document.getElementById(`add-${this.type}`);
      if (this.isAdding) {
        button.textContent = "x";
        form.style.display = "inline-flex";
      } else {
        button.textContent = "+";
        form.style.display = "none";
      }
    },
    add(new_employee) {
      console.log(this.establishment_id, new_employee);
      const update = {};
      update[`employees.${this.type}s`] = FieldValue.arrayUnion(
        db.collection("employees").doc(new_employee.id)
      );
      if (new_employee) {
        db.collection("establishments")
          .doc(this.establishment_id)
          .update(update)
          .catch(err => console.error(err));
      } else {
        alert("Select Employee!");
      }
    },
    del(employee) {
      const update = {};
      update[`employees.${this.type}s`] = FieldValue.arrayRemove(
        db.collection("employees").doc(employee.id)
      );
      db.collection("establishments")
        .doc(this.establishment_id)
        .update(update)
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss">
@import "../../resources/style/theme";
.gray {
  color: $gray-color;
}
.btn {
  color: $accent-color;
  cursor: pointer;
}
.del-btn {
  float: right;
  display: none;
}
.employee:hover {
  .del-btn {
    display: inline-flex;
  }
}
.inline-form {
  display: none;
}
.employee-list-header {
  text-align: left;
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
}
.ml {
  margin-left: 5px;
}
</style>
