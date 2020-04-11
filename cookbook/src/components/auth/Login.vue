<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        class="form-control"
        type="email"
        v-model="form.email"
        name="email"
        :class="{ 'is-invalid': submitted && $v.form.email.$error }"
      />
      <div v-if="submitted && !$v.form.email.required" class="invalid-feedback">
        Email required!
      </div>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        class="form-control"
        type="password"
        v-model="form.password"
        name="password"
        :class="{ 'is-invalid': submitted && $v.form.password.$error }"
      />
      <div
        v-if="submitted && !$v.form.password.required"
        class="invalid-feedback"
      >
        Password required!
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Login</button>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { AuthService } from "../../services/auth.service.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      submitted: false
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      AuthService.login(this.form.email, this.form.password, this);
    }
  }
};
</script>

<style scoped></style>
