<template>
  <div id="profile">
    <div v-if="user">
      <p>{{ $t("forms.prompts.first_name") }}: {{ user.first_name }}</p>
      <p>{{ $t("forms.prompts.last_name") }}: {{ user.last_name }}</p>
      <p>{{ $t("forms.prompts.email") }}: {{ user.email }}</p>
      <p>{{ $t("forms.prompts.phone") }}: {{ user.phone }}</p>
      <p>{{ $t("forms.prompts.country") }}: {{ user.country.name }}</p>
    </div>
  </div>
</template>

<script>
import { db } from "../../firestore";

export default {
  name: "profile",
  data: () => ({
    user: null
  }),
  computed: {
    user_id() {
      return this.$store.state.user.id;
    }
  },
  watch: {
    user_id: {
      immediate: true,
      handler(user_id) {
        this.$bind("user", db.collection("users").doc(user_id))
          .then(res => {
            this.user = res;
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
