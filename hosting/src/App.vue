<template>
  <div id="app">
    <navbar />
    <router-view> </router-view>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./resources/style/colors";
body {
  margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-color;
  background-color: $light-color;
}
</style>
