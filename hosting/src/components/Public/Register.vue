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
        <input type="text" v-model="first_name" id="first_name" />
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
        .then(async res => {
          const user_id = await res.user.uid;
          const user = await db
            .collection("users")
            .doc(user_id)
            .set({
              first_name: first_name,
              last_name: last_name,
              email: email,
              phone: phone,
              country: db.collection("countries").doc(country)
            })
            .then(() => true)
            .catch(() => false);
          const employee = await db
            .collection("employees")
            .doc(user_id)
            .set({ user: db.collection("users").doc(user_id) })
            .then(() => true)
            .catch(() => false);
          if (user && employee) {
            this.$store.dispatch("login", { user_id });
            this.$router.push("/dashboard/await");
          } else {
            auth.deleteUser(user_id).catch(err => console.error(err));
          }
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
