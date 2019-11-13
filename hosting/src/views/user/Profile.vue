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
      user: null
    };
  },
  computed: {
    ...mapGetters({
      authStatus: "userController/getAuthStatus"
    })
  },
  watch: {
    authStatus: function(authStatus) {
      console.log(authStatus);
      if (authStatus == AuthStatus.login_ok) {
        this.user = getData();
      }
    }
  }
};
</script>
