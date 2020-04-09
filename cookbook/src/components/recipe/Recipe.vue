<template>
  <div>
    <div class="justify-content-end">
      <div class="add-field">
        <router-link class="nav-link" to="/recipe/add">
          <button>Add new Recipe</button>
        </router-link>
      </div>
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

<style scoped>
.add-field {
  background-color: indianred;
  margin-bottom: 20px;
}
</style>
