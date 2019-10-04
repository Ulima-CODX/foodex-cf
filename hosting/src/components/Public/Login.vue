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
    <router-link to="/register">{{ $t("pages.register.name") }}</router-link>
  </div>
</template>

<script>
import { db, auth } from "../../firestore";

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
        .then(async res => {
          const user_id = res.user.uid;
          const isAdmin = await db
            .collection("admins")
            .doc(user_id)
            .get()
            .then(res => res.exists)
            .catch(() => false);
          const { isManager, isOrderHandler } = await db
            .collection("employees")
            .doc(user_id)
            .get()
            .then(async res => {
              if (!res.data().establishment) {
                return { isManager: false, isOrderHandler: false };
              }
              const employees = await res
                .data()
                .establishment.get()
                .then(res => res.data().employees)
                .catch(() => null);
              const isManager =
                (await employees.managers.filter(
                  employee => employee.id == user_id
                )[0]) != null;
              const isOrderHandler =
                (await employees.order_handlers.filter(
                  employee => employee.id == user_id
                )[0]) != null;
              return { isManager, isOrderHandler };
            })
            .catch(() => ({
              isManager: false,
              isOrderHandler: false
            }));
          this.$store.dispatch("login", {
              user_id,
              isAdmin,
              isManager,
              isOrderHandler
            });
          if (isAdmin || isManager || isOrderHandler) {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/dashboard/await");
          }
        })
        .catch(error => {
          alert(error.message);
          console.error(error);
          this.$store.dispatch("logout");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
