<template>
  <div class="log-area">
    <transition name="bounce">
      <p class="lout mb-0" v-if="show">You will be logged out in 3 seconds!</p>
    </transition>
  </div>
</template>

<script>
import { AuthService } from "../../services/auth.service";

export default {
  name: "logout",
  data() {
    return {
      show: false
    };
  },
  created() {
    setTimeout(() => (this.show = true), 50);
    setTimeout(() => AuthService.logout(this), 3500);
  }
};
</script>
<style>
.bounce-enter-active {
  animation: bounce-in 1s;
}
.log-area {
  background-color: hotpink;
}
.lout {
  font-size: 35px;
  font-weight: 700;
  color: wheat;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
