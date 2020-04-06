<template>
  <div>
    <div class="justify-content-end">
      <h5>
        <router-link class="nav-link" to="/">
          <button>Add new Recipe</button>
        </router-link>
      </h5>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RecipeService } from "../../services/recipe.service.js";

export default {
  name: "Recipe",
  data() {
    return {};
  },
  methods: {
    addNew: function() {
      console.log("Added");
      RecipeService.addNew();
    }
  }
};
</script>

<style scoped></style>
