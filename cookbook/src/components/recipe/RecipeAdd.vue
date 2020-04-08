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
          >
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
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <select v-model="form.type" class="form-control">
                <option selected disabled value="-1">Select type</option>
                <option
                  v-for="type in types"
                  :key="type.name"
                  :value="type.value"
                  >{{ type.name }}</option
                >
              </select>
              <div
                v-if="submitted && !$v.form.type.valid"
                class="invalid-feedback"
              >
                Field is required
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.isvegan"
                name="isvegan"
              />
              <label class="form-check-label" for="isvegan">Is Vegan?</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <textarea
            class="form-control"
            type="select"
            v-model="form.ingredients"
            name="ingredients"
            :class="{ 'is-invalid': submitted && $v.form.ingredients.$error }"
          ></textarea>
          <div
            v-if="submitted && !$v.form.ingredients.required"
            class="invalid-feedback">Field is required</div>
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
          >
            Field is required
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Create Recipe</button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import resources from "../../resources/resources.json";

export default {
  name: "RecipeAdd",
  data() {
    return {
      form: {
        title: "",
        bdescription: "",
        instructions: "",
        ingredients: "",
        isvegan: false,
        type: -1
      },
      types: resources.mealTypes,
      submitted: false
    };
  },
  validations: {
    form: {
      title: { required },
      bdescription: { required },
      instructions: { required },
      ingredients: { required },
      type: {
        valid(value) {
          return value != -1;
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    }
  }
};
</script>

<style scoped>
textarea {
  height: 200px !important;
}
.invalid-feedback {
  display: block !important;
}
</style>
