<template>
  <div id="login">
    <form @submit.prevent="login(email, password)">
      <p>{{ form_prompt }}</p>
      <div>
        <label for="email">{{ email_prompt }}</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">{{ password_prompt }}</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <div>
        <button type="submit">{{ login_prompt }}</button>
      </div>
    </form>
    <router-link to="/register">{{ register_prompt }}</router-link>
  </div>
</template>

<script>
import { auth } from "../../firestore";

export default {
  name: "Login",
  data: () => ({
    form_prompt: "Logearse",
    email_prompt: "Correo",
    email: "",
    password_prompt: "Contraseña",
    password: "",
    login_prompt: "Ingresar",
    register_prompt: "Registrese"
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

<style lang="sass" scoped></style>
