import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import routes from "./routes";

Vue.config.productionTip = false;

new Vue({
  store,
  routes,
  render: h => h(App)
}).$mount("#app");
