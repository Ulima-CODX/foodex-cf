<template>
  <v-card class="mx-auto my-auto">
    <v-card-text v-if="user != null">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
      <img :src="user.country.flag_url" />
    </v-card-text>
  </v-card>
</template>

<script>
import Store from "@/plugins/vuex";
import UC from "@/controllers/user";

export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    userComputed() {
      return this.user;
    }
  },
  async created() {
    this.user = await UC.getData();
  }
};
</script>

<style></style>
