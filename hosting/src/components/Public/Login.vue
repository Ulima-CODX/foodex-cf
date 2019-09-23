<template>
  <div id="login">
    <form @submit.prevent="login(email, password)">
      <p>{{ $t("forms.names.login") }}</p>
      <div>
        <label for="email">{{ $t("forms.prompts.email") }} :</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">{{ $t("forms.prompts.password") }} :</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <div>
        <button type="submit">{{ $t("forms.prompts.login") }}</button>
      </div>
    </form>
    <router-link to="/register">{{ $t("pages.register") }}</router-link>
  </div>
</template>

<script>
import { auth } from "../../firestore";

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    login(email, password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.uid);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
