<template>
  <div class="jumbotron home mb-0">
    <div class="home text-left" v-if="isLogged">
      <h1>Hello, {{ getUser }}!</h1>
      <h3>Welcome to CookBook!</h3>
      <h5>As a logged user you can:</h5>
      <ul>
        <li>See recipe details.</li>
        <li>Edit your recipes.</li>
      </ul>
    </div>
    <div class="home text-left" v-else>
      <h1>Hello, Guest!</h1>
      <h3>Welcome to CookBook!</h3>
      <h5>To use this website fully, please:</h5>
      <ul>
        <li>
          <span>
            First
            <router-link class="nav-link" to="/register"
              >Create A New Account!</router-link
            >
          </span>
        </li>
        <li>
          <span>
            Or if you have one,
            <router-link class="nav-link" to="/login">Login!</router-link>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AuthService } from "../services/auth.service";

export default {
  name: "Home",
  data() {
    return {
      isLogged: AuthService.isLogged()
    };
  },
  computed: {
    getUser() {
      const userEmail = localStorage.getItem("user");

      if (userEmail) {
        return userEmail.split("@")[0];
      }

      return null;
    }
  }
};
</script>

<style scoped>
.home {
  background-color: goldenrod;
}
</style>
