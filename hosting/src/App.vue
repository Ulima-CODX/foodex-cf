<template>
  <div id="app">
    <navbar />
    <router-view> </router-view>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import store from "./store";
import router from "./routes";

if (!(store.state.employee | store.state.admin)) {
  router.push("/");
}

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./resources/style/theme";
body {
  margin: 0px;
}
#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-color;
  background-color: $light-color;
}
a {
  text-decoration: none;
}
button {
  background-color: $primary-color;
  color: $light-color;
  border: 1px solid $primary-color;
  border-radius: 5px;
  font-family: $font;
}
</style>
