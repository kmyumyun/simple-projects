<template>
  <div>
    <div class="row px-4 my-2">
      <div v-for="recipe in data" :key="recipe.id" class="card col-6" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ recipe.title }}</h5>
          <p class="card-text">{{ recipe.description }}</p>
          <a href="#" class="card-link">Card link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RecipeService } from "../../services/recipe.service";

export default {
  name: "All",
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  created() {
    RecipeService.getAll().then(x => (this.data = x));
    console.log(this.data);
  }
};
</script>

<style scoped>
.card {
  display: inline-block;
}
</style>
