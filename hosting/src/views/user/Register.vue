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
            <v-text-field single-line label="Email" v-model="form.email" />
            <!--Password-->
            <v-text-field
              single-line
              label="Password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <!--Confirm Password-->
            <v-text-field
              single-line
              label="Confirm Password"
              v-model="form.confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </v-col>
          <v-col sm="6">
            <!--First Name-->
            <v-text-field
              single-line
              label="First Name"
              v-model="form.first_name"
            />
            <!--Last Name-->
            <v-text-field
              single-line
              label="Last Name"
              v-model="form.last_name"
            />
            <!--Phone-->
            <v-text-field single-line label="Phone" v-model="form.phone" />
            <!--Country-->
            <v-select
              :items="countries"
              item-text="data.name"
              item-value="id"
              label="Country"
              v-model="form.country_id"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <!--Register Button-->
    <v-card-actions>
      <v-btn color="info" @click="register()">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  getCountries,
  register as UC_register
} from "@/controllers/user/register";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        phone: "",
        country_id: ""
      },
      showPassword: false,
      showConfirmPassword: false,
      countries: []
    };
  },
  methods: {
    register() {
      UC_register(this.form);
    }
  },
  async mounted() {
    this.countries = await getCountries();
  }
};
</script>

<style></style>
