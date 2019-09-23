<template>
  <div id="navbar">
    <div v-for="(link, i) in links" :key="i">
      <router-link :to="link.url">{{ $t(`pages.${link.name}`) }}</router-link>
    </div>
    <locale-changer />
  </div>
</template>

<script>
import LocaleChanger from "./LocaleChanger";

export default {
  name: "navbar",
  data: () => ({
    links: [{ name: "about", url: "/about" }]
  }),
  components: {
    LocaleChanger
  }
};
</script>

<style lang="scss" scoped>
@import "../resources/style/colors";
#navbar {
  padding: 10px;
  border-bottom: 1px solid $accent-color;
  background-color: $primary-color;
  color: $light-color;
  display: flex;
}
a {
  text-decoration: none;
  color: $light-color;
}
.locale-changer {
  float: right;
}
</style>
