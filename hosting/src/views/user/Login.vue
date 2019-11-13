<template>
  <v-card width="400" class="mx-auto my-auto">
    <!--Title-->
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <!--Login Form-->
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
    <!--Login Button-->
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

import { login } from "@/controllers/user/auth";

export default {
  data() {
    return {
      login,
      email: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapGetters({ authStatus: "userController/getAuthStatus" })
  }
};
</script>
