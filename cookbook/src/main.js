import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "firebase";
import Vuelidate from "vuelidate";
import connection from "../connection.json";
import EventBus from "./helpers/EventBus";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.$bus = EventBus;
firebase.initializeApp(connection.firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem("user", user.email);
    localStorage.setItem("token", user.uid);
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
