<template>
  <div id="establishment-list" v-if="establishments">
    <div
      v-for="establishment in establishments"
      :key="`${establishment.id}`"
      class="card"
    >
      <div class="header">
        <p class="establishment-name">{{ establishment.name }}</p>
        <p class="establishment-country">
          {{ establishment.country.name }}
          <img
            class="country-flag"
            :src="
              `https://www.countryflags.io/${establishment.country.iso}/shiny/16.png`
            "
          />
        </p>
        <p class="establishment-address">{{ establishment.address }}</p>
      </div>
      <div class="segment">
        <p>{{ $t("pages.establishments.employees") }}</p>
        <employee-list
          class="tab-1"
          type="manager"
          :establishment_id="establishment.id"
          :list="establishment.employees.managers"
        />
        <employee-list
          class="tab-1"
          type="orderHandler"
          :establishment_id="establishment.id"
          :list="establishment.employees.orderHandlers"
        />
        <employee-list
          class="tab-1"
          type="receptionist"
          :establishment_id="establishment.id"
          :list="establishment.employees.receptionists"
        />
      </div>
      <div class="footer">
        <p>{{ $t("pages.establishments.open_on") }}:</p>
        <div v-for="(set, j) in establishment.working_hours" :key="`${j}`">
          <p class="tab-1">
            {{ set.days.map(day => $t(`days.${day}`)).join(" ") }}
          </p>
          <p class="tab-2">{{ set.hours.open }} - {{ set.hours.close }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firestore";
import EmployeeList from "./EmployeeList.vue";

export default {
  name: "establishment-list",
  components: {
    EmployeeList
  },
  data: () => ({
    establishments: []
  }),
  firestore: {
    establishments: db.collection("establishments")
  }
};
</script>

<style lang="scss" scoped>
@import "../../resources/style/theme";
.establishment-name {
  font-size: 2rem;
}
.establishment-address {
  font-size: 1rem;
}
.establishment-country {
  display: flex;
  font-size: 1rem;
  align-items: center;
  .country-flag {
    margin-left: 5px;
    width: 1rem;
    height: 1rem;
  }
}
</style>
