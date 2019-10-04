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
p {
  margin: 0px;
}
button {
  background-color: $primary-color;
  color: $light-color;
  border: 1px solid $primary-color;
  border-radius: 5px;
  font-family: $font;
}
.column {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}
.card {
  border: 1px solid $accent-color;
  border-radius: 5px;
  margin: 20px;
  .header,
  .segment,
  .footer {
    padding: 10px 20px 10px 20px;
  }
  .header,
  .segment {
    border-bottom: 1px solid $accent-color;
  }
  p {
    text-align: left;
  }
}
@for $i from 1 to 4 {
  .tab-#{$i} {
    margin-left: 20px * $i;
  }
  .tab-#{$i}.hlr:hover {
    margin-left: (20 * $i)-1px;
  }
}
.hl-r:hover {
  border: 1px solid $accent-color;
  border-radius: 5px;
  margin: -1px;
}
.hl-tb:hover {
  border-top: 1px solid $accent-color;
  border-bottom: 1px solid $accent-color;
  margin-top: -1px;
  margin-bottom: -1px;
}
</style>
