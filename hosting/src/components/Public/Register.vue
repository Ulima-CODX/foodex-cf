<template>
  <div id="register">
    <form
      @submit.prevent="
        register(first_name, last_name, email, password, phone, country)
      "
    >
      <p>{{ form_prompt }}</p>
      <div>
        <label for="first_name">{{ first_name_prompt }}</label>
        <input type="text" v_model="first_name" id="first_name" />
      </div>
      <div>
        <label for="last_name">{{ last_name_prompt }}</label>
        <input type="text" v-model="last_name" id="last_name" />
      </div>
      <div>
        <label for="email">{{ email_prompt }}</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">{{ password_prompt }}</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <div>
        <label for="phone">{{ phone_prompt }}</label>
        <input type="tel" v-model="phone" id="phone" />
      </div>
      <div>
        <label for="country">{{ country_prompt }}</label>
        <select v-model="country" id="country">
          <option v-for="(c, i) in countries" :key="i" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div>
        <button type="submit">{{ register_prompt }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db, auth } from "../../firestore";

export default {
  name: "Register",
  data: () => ({
    form_prompt: "Registrarse",
    first_name_prompt: "Nombres",
    first_name: "",
    last_name_prompt: "Apellidos",
    last_name: "",
    email_prompt: "Correo",
    email: "",
    password_prompt: "Contraseña",
    password: "",
    phone_prompt: "Teléfono",
    phone: "",
    country_prompt: "País",
    country: "",
    register_prompt: "Registro",
    countries: []
  }),
  firestore: {
    countries: db.collection("countries").orderBy("code")
  },
  methods: {
    getCountryURL(iso) {
      return `https://www.countryflags.io/${iso}/shiny/16.png`;
    },
    register(first_name, last_name, email, password, phone, country) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          db.collection("employees")
            .doc(res.user.uid)
            .set({
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: password,
              phone: phone,
              country: db.collection("countries").doc(country)
            });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped></style>
