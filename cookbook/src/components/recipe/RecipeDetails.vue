<template>
  <div>
    <div>{{ data.title }}</div>
    <div>{{ data.bdescription }}</div>
  </div>
</template>

<script>
import { RecipeService } from "../../services/recipe.service";

export default {
  name: "RecipeDetails",
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  created() {
    RecipeService.getRecipe(this.$route.params.id).then(data => {
      this.data = data;
    });
  }  
};
</script>

<style scoped></style>
