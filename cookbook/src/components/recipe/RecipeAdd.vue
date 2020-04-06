<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        class="form-control"
        type="text"
        v-model="form.title"
        name="title"
        :class="{ 'is-invalid': submitted && $v.form.title.$error }"
      />
      <div v-if="submitted && !$v.form.title.required" class="invalid-feedback">
        Field is required
      </div>
    </div>
    <div class="form-group">
      <label for="bdescription">Brief Description</label>
      <input
        class="form-control"
        type="text"
        v-model="form.bdescription"
        name="bdescription"
        :class="{ 'is-invalid': submitted && $v.form.bdescription.$error }"
      />
      <div
        v-if="submitted && !$v.form.bdescription.required"
        class="invalid-feedback"
      >
        Field is required
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Create Recipe</button>
    </div>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { RecipeService } from "../../services/recipe.service";

export default {
  name: "RecipeAdd",
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
