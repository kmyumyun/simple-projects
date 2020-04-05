<template>
  <div></div>
</template>

<script>
import { RecipeService } from "../services/recipe.service";

export default {
  name: "Home",
  data() {
    return {
      data: RecipeService.getAll()
    };
  },
  methods: {}
};
</script>

<style scoped></style>
