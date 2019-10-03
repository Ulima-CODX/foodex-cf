<template>
  <div id="register">
    <form
      @submit.prevent="
        register(first_name, last_name, email, password, phone, country)
      "
    >
      <p>{{ $t("forms.names.register") }}</p>
      <div>
        <label for="first_name">{{ $t("forms.prompts.first_name") }} :</label>
        <input type="text" v_model="first_name" id="first_name" />
      </div>
      <div>
        <label for="last_name">{{ $t("forms.prompts.last_name") }} :</label>
        <input type="text" v-model="last_name" id="last_name" />
      </div>
      <div>
        <label for="email">{{ $t("forms.prompts.email") }} :</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">{{ $t("forms.prompts.password") }} :</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <div>
        <label for="phone">{{ $t("forms.prompts.phone") }} :</label>
        <input type="tel" v-model="phone" id="phone" />
      </div>
      <div>
        <label for="country">{{ $t("forms.prompts.country") }} :</label>
        <select v-model="country" id="country">
          <option v-for="(c, i) in countries" :key="i" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div>
        <button type="submit">{{ $t("forms.prompts.register") }}</button>
      </div>
    </form>
    <router-link to="/">{{ $t("pages.login.name") }}</router-link>
  </div>
</template>

<script>
import { db, auth } from "../../firestore";

export default {
  name: "register",
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    countries: []
  }),
  firestore: {
    countries: db.collection("countries").orderBy("code")
  },
  methods: {
    register(first_name, last_name, email, password, phone, country) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          db.collection("users")
            .doc(res.user.uid)
            .set({
              first_name: first_name,
              last_name: last_name,
              email: email,
              phone: phone,
              country: db.collection("countries").doc(country)
            });
        })
        .then(res => {
          this.$store.dispatch("login", { user_id: res.user.uid });
          this.$router.push("/dashboard/await");
        })
        .catch(error => {
          alert(error.message);
          this.$store.dispatch("logout");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
