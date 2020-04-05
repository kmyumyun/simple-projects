@@ -0,0 +1,116 @@
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
      <div v-if="submitted && !$v.form.email.valid" class="invalid-feedback">
        {{ error.msg }}
      </div>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        class="form-control"
        type="password"
        v-model="form.password"
        name="password"
        ref="password"
        :class="{ 'is-invalid': submitted && $v.form.password.$error }"
      />
      <div
        v-if="submitted && !$v.form.password.required"
        class="invalid-feedback"
      >
        Password is required
      </div>
      <div
        v-if="submitted && !$v.form.password.minLength"
        class="invalid-feedback"
      >
        Password is too short
      </div>
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        class="form-control"
        type="password"
        v-model="form.confirmPassword"
        name="confirmPassword"
        :class="{ 'is-invalid': submitted && $v.form.confirmPassword.$error }"
      />
      <div
        v-if="submitted && !$v.form.confirmPassword.required"
        class="invalid-feedback"
      >
        Confirm Password is required!
      </div>
      <div
        v-if="submitted && !$v.form.confirmPassword.sameAs"
        class="invalid-feedback"
      >
        Passwords do not match
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Register</button>
    </div>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { AuthService } from "../../services/auth.service";

export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      submitted: false,
      error: { msg: "", status: false, taken: "" }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
        valid(value) {
          if (this.error.status) {
            if (this.error.taken !== value) {
              return true;
            }
            return false;
          }
          return true;
        }
      },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs("password") }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      AuthService.register(this.form.email, this.form.password).then(data => {
        if (data.code === "auth/email-already-in-use") {
          this.error.msg = data.message;
          this.error.status = true;
          this.error.taken = this.form.email;
        }
      });
    }
  }
};
</script>

<style scoped></style>
