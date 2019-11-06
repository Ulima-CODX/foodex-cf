<template>
  <v-card class="ma-4 flex">
    <v-card-text v-if="user != null">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
      <img :src="user.country.flag_url" />
    </v-card-text>
  </v-card>
</template>

<script>
import { getData } from "@/controllers/user/profile";

export default {
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    this.user = await getData();
  }
};
</script>

<style></style>
