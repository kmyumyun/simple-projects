<template>
  <div class="container" id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/nav/Header.vue";
import Footer from "./components/nav/Footer.vue";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
