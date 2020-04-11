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
          >Title is required</div>
          <div
            v-if="submitted && !$v.form.title.maxLength"
            class="invalid-feedback"
          >Title is too long</div>
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
          >Brief Description is required</div>
          <div
            v-if="submitted && !$v.form.bdescription.maxLength"
            class="invalid-feedback"
          >Brief Description is too long</div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <select v-model="form.type" class="form-control">
                <option selected disabled value="-1">Select type</option>
                <option v-for="type in types" :key="type.name" :value="type.value">{{ type.name }}</option>
              </select>
              <div
                v-if="submitted && !$v.form.type.valid"
                class="invalid-feedback"
              >Field is required</div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="form.isvegan" name="isvegan" />
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
            class="invalid-feedback"
          >Ingredients are required</div>
          <div
            v-if="submitted && !$v.form.ingredients.maxLength"
            class="invalid-feedback"
          >Ingredients are too long</div>
          <div
            v-if="submitted && !$v.form.ingredients.minLength"
            class="invalid-feedback"
          >Ingredients are too short</div>
        </div>
      </div>
    </div>
    <div class="row my-4 justify-content-center">
      <div class="col-6">
        <div v-if="form.imgURL">
          <b-img :src="form.imgURL" fluid-grow alt></b-img>
        </div>
        <div>
          <div class="align-items-center mt-2">
            <label for="imgupload">Set new Picture:</label>
            <input name="imgupload" type="file" @change="previewImage" accept="image/*" />
          </div>
          <div
            v-if="submitted && !(form.imgURL || this.imageData)"
            class="invalid-feedback"
          >Image is required</div>
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
          >Instructions are required</div>
          <div
            v-if="submitted && !$v.form.instructions.minLength"
            class="invalid-feedback"
          >Instructions are too short</div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Update Recipe</button>
    </div>
  </form>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import resources from "../../resources/resources.json";
import { RecipeService } from "../../services/recipe.service";
import firebase from "firebase";

export default {
  name: "RecipeEdit",
  data() {
    return {
      form: {
        title: "",
        bdescription: "",
        instructions: "",
        ingredients: "",
        isvegan: false,
        type: -1,
        likes: 0,
        imgURL: ""
      },
      types: resources.mealTypes,
      submitted: false,
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  validations: {
    form: {
      title: { required, maxLength: maxLength(30) },
      bdescription: { required, maxLength: maxLength(50) },
      instructions: { required, minLength: minLength(10) },
      ingredients: {
        required,
        maxLength: maxLength(250),
        minLength: minLength(5)
      },
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

      this.$v.$touch();
      if (this.$v.$invalid || (!this.form.imgURL && !this.imageData)) {
        return;
      }

      this.onUpload();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      if (this.imageData) {
        this.picture = null;
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          snapshot => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              console.log(url);
              this.form.imgURL = url;
              console.log(this.form);
              RecipeService.updateRecipe(this.form, this.$route.params.id).then(
                () => {
                  this.$router.push({
                    name: "details",
                    params: { id: this.$route.params.id }
                  });
                }
              );
            });
          }
        );
      } else {
        RecipeService.updateRecipe(this.form, this.$route.params.id).then(
          () => {
            this.$router.push({
              name: "details",
              params: { id: this.$route.params.id }
            });
          }
        );
      }
    }
  },
  created() {
    RecipeService.getRecipe(this.$route.params.id).then(data => {
      if (data && data.author == localStorage.getItem("user")) {
        this.form = data;
      } else {
        this.$router.push({ name: "notfound" });
      }
    });
  }
};
</script>

<style scoped>
img.preview {
  width: 200px;
}

textarea {
  height: 200px !important;
}
.invalid-feedback {
  display: block !important;
}
</style>
