<template>
  <div id="app">
    <EmployeeRegister />
  </div>
</template>

<script>
import EmployeeRegister from "./components/Employee/Register";

export default {
  name: "app",
  components: {
    EmployeeRegister
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
