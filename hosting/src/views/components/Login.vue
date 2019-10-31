<template>
  <v-card width="400" class="mx-auto my-auto">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account-circle"
          label="Email"
          v-model="email"
        />
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
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="info" @click="login(email, password)">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UC from "@/controllers/user";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    login: UC.login
  }
};
</script>
