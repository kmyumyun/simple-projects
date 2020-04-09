<template>
  <div>
    <div class="row px-4 my-2">
      <div
        v-for="recipe in data"
        :key="recipe.id"
        class="card col-6 pt-2"
        style="width: 18rem;"
      >
        <img
          height="200"
          width="200"
          class="card-img-top"
          :src="recipe.imgURL"
          alt="Card image cap"
        />
        <div class="card-body">
          <h3 class="card-title">{{ recipe.title }}</h3>
          <h6 class="card-text">{{ recipe.bdescription }}</h6>
          <div class="row">
            <div class="col-6">
              <span>Likes: </span>
              <span>{{ recipe.likes }}</span>
            </div>
            <div class="col-6">
              <router-link :to="{ name: 'details', params: { id: recipe.id } }">
                <a class="card-link">Details...</a>
              </router-link>
            </div>
          </div>
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
