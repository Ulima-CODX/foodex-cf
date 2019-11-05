<template>
  <v-card min-width="600" class="mx-auto my-auto">
    <!--Title-->
    <v-card-title>
      <h1 class="display-1">Register</h1>
    </v-card-title>
    <!--Register Form-->
    <v-card-text>
      <v-form>
        <v-row>
          <v-col sm="6">
            <!--Email-->
            <v-text-field single-line label="Email" v-model="email" />
            <!--Password-->
            <v-text-field
              single-line
              label="Password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <!--Confirm Password-->
            <v-text-field
              single-line
              label="Confirm Password"
              v-model="confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </v-col>
          <v-col sm="6">
            <!--First Name-->
            <v-text-field single-line label="First Name" v-model="first_name" />
            <!--Last Name-->
            <v-text-field single-line label="Last Name" v-model="last_name" />
            <!--Phone-->
            <v-text-field single-line label="Phone" v-model="phone" />
            <!--Country-->
            <v-select :items="countries" label="Country" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <!--Register Button-->
    <v-card-actions>
      <v-btn color="info" @click="console.log('Register')">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      country_id: "",
      showPassword: false,
      showConfirmPassword: false,
      countries: ["Peru", "Chile ;-;"]
    };
  }
};
</script>

<style></style>
