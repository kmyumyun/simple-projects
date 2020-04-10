<template>
  <div class="notfound pb-0">
    <span class="e404">404</span>
    <p class="error-text">Page not found!</p>
  </div>
</template>

<script>
export default {
  name: "notfound",
  data() {
    return {};
  }
};
</script>

<style scoped>
.notfound {
  background-color: honeydew;
}

.e404 {
  font-size: 200px;
}

.error-text {
  font-size: 80px;
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
