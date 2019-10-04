<template>
  <div id="navbar">
    <div v-for="(link, i) in links" :key="i">
      <router-link :to="link.url" class="link" active-class="a-link">{{
        $t(`pages.${link.name}.name`)
      }}</router-link>
    </div>
    <locale-changer />
  </div>
</template>

<script>
import LocaleChanger from "./LocaleChanger";

export default {
  name: "navbar",
  computed: {
    links() {
      let links = [];
      if (this.$store.state.user.id!=null) {
        if (this.$store.state.user.roles.admin == true) {
          console.log("Is Admin");
          links.push({
            name: "establishments",
            url: "/dashboard/establishments"
          });
        }
        if (this.$store.state.user.roles.manager == true) {
          console.log("Is Manager");
        }
        if (this.$store.state.user.roles.orderHandler == true) {
          console.log("Is Order Handler");
        }
        if (
          this.$store.state.user.roles.admin ||
          this.$store.state.user.roles.manager ||
          this.$store.state.user.roles.orderHandler
        ) {
          links.push({ name: "profile", url: "/dashboard/profile" });
        }
      } else {
        links.push({ name: "login", url: "/login" });
      }
      links.push({ name: "about", url: "/about" });
      return links;
    }
  },
  components: {
    LocaleChanger
  }
};
</script>

<style lang="scss" scoped>
@import "../resources/style/theme";
#navbar {
  background-color: $primary-color;
  color: $light-color;
  padding: 10px;
  border-bottom: 1px solid $accent-color;
  display: flex;
}
.link {
  color: $light-color;
  border-radius: 2px;
  padding: 5px;
  margin: 2px;
}
.link:hover,
.a-link {
  background-color: $accent-color;
  color: $light-color;
  border-radius: 2px;
  padding: 5px;
}
.locale-changer {
  float: right;
}
</style>
