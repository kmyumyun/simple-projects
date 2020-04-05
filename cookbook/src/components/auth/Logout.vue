<template>
  <p>You will be logged out in 3 sec!</p>
</template>

<script>
import { AuthService } from "../../services/auth.service";

export default {
  name: "logout",
  data() {
    return {};
  },
  created() {
    setInterval(AuthService.logout(this), 3000);
  }
};
</script>
