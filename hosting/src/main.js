import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import i18n from "./i18n";

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  i18n,
  render: h => h(App)
});
