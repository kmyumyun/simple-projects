<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            class="form-control"
            type="text"
            v-model="form.title"
            name="title"
            :class="{ 'is-invalid': submitted && $v.form.title.$error }"
          />
          <div
            v-if="submitted && !$v.form.title.required"
            class="invalid-feedback"
          >Field is required</div>
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
          >Field is required</div>
        </div>
        <div class="row">
          <div class="col-6">
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
              >Field is required</div>
            </div>
          </div>
          <div class="col-6">
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
              >Field is required</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <textarea
            class="form-control"
            type="text"
            v-model="form.ingredients"
            name="ingredients"
            :class="{ 'is-invalid': submitted && $v.form.ingredients.$error }"
          ></textarea>
          <div
            v-if="submitted && !$v.form.ingredients.required"
            class="invalid-feedback"
          >Field is required</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="instructions">Instructions:</label>
          <textarea
            class="form-control"
            type="text"
            v-model="form.instructions"
            name="instructions"
            :class="{ 'is-invalid': submitted && $v.form.instructions.$error }"
          ></textarea>
          <div
            v-if="submitted && !$v.form.instructions.required"
            class="invalid-feedback"
          >Field is required</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Create Recipe</button>
    </div>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "RecipeAdd",
  data() {
    return {
      form: {
        title: "",
        bdescription: "",
        instructions: "",
        ingredients: ""
      },
      submitted: false
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
    },
    addIngredient() {}
  }
};
</script>

<style scoped>
textarea {
  height: 125px;
}
</style>
