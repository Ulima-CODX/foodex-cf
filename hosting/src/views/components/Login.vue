<template>
  <v-card width="400" class="mx-auto my-auto">
    <!--Title-->
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <!--Email-->
        <v-text-field
          prepend-icon="mdi-account-circle"
          label="Email"
          v-model="email"
        />
        <!--Password-->
        <v-text-field
          prepend-icon="mdi-lock"
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <!--Login-->
    <v-card-actions>
      <v-btn color="info" @click="login(email, password)">Login</v-btn>
    </v-card-actions>
    <!--Loading Animation-->
    <v-overlay v-if="authStatus == 'login_start'">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import { login as UC_Login } from "@/controllers/user/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapGetters({ authStatus: "getAuthStatus" })
  },
  methods: {
    login(email, password) {
      UC_Login(email, password);
    }
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    }
  }
};
</script>
