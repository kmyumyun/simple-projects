<template>
  <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand r-href">
      <router-link to="/">Cook</router-link>
    </a>
    <ul class="nav mr-auto">
      <li class="nav-item activ">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item activ">
        <router-link class="nav-link" to="/recipe">Recipes</router-link>
      </li>
    </ul>
    <ul class="nav ml-auto">
      <li class="nav-item" v-if="!isLogged">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li class="nav-item" v-if="!isLogged">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
       <li class="nav-item" v-if="isLogged">
        <router-link class="nav-link" to="/profile">Profile</router-link>
      </li>
      <li class="nav-item" v-if="isLogged">
        <router-link class="nav-link" to="/logout">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { AuthService } from "../../services/auth.service";

export default {
  name: "HeaderNav",
  data() {
    return {
      isLogged: AuthService.isLogged(),
      iss: false
    };
  },
  methods: {
    is() {
      return AuthService.isLogged();
    }
  },
  created() {
    this.$bus.$on("logged", () => {
      this.isLogged = AuthService.isLogged();
      console.log("Bus: ", this.isLogged);
    });
  }
};
</script>

<style scoped>
nav {
  background-color: thistle;
}
</style>
