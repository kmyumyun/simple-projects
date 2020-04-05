@@ -0,0 +1,32 @@
<template>
  <div>
    {{ data }}
    <ul>
      <li v-for="recipe in data" :key="recipe.id">{{ recipe.title }}</li>
    </ul>
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
  }
};
</script>

<style scoped></style>
