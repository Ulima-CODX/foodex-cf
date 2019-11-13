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
import { mapGetters } from "vuex";

import { AuthStatus } from "@/controllers/user/auth";
import { getData } from "@/controllers/user/profile";

export default {
  data() {
    return {
      user: {
        country: {}
      }
    };
  },
  computed: {
    ...mapGetters({
      user_id: "userController/getUserCurrent"
    })
  },
  watch: {
    user_id: async function(user_id) {
      this.user = await getData(user_id);
    }
  },
  async mounted() {
    this.user = await getData(this.user_id);
  }
};
</script>
