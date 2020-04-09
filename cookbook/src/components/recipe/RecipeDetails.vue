<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-6 text-left">
        <h3>{{ data.title }}</h3>
      </div>
      <div class="col-6 text-right">
        <div>
          <span>Likes:</span>
          <span>{{ data.likes }}</span>
        </div>
        <div class="author" v-if="data.author">
          <span>Author:</span>
          <span>{{ data.author }}</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-6">
        <span>Type:</span>
        <span class="type">{{ getMealType(data.type) }}</span>
      </div>
      <div class="col-6">
        <span class="vegan" v-if="data.isvegan">Vegan</span>
        <span class="notvegan" v-if="!data.isvegan">Not Vegan</span>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-6">
        <div>
          <b-img :src="data.imgURL" fluid-grow alt></b-img>
        </div>
      </div>
      <div class="col-6 text-left">
        <span class="title-text">Ingredients:</span>
        <p>{{ data.ingredients }}</p>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12 text-left">
        <span class="title-text">Instructions:</span>
        <p>{{ data.instructions }}</p>
      </div>
    </div>
    <span v-if="!liked" @click="like" class="btn btn-primary">Like</span>
    <div v-if="data.author == user">
      <hr />
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
        <span class="btnm btn-secondary btn-sm">Edit</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { RecipeService } from "../../services/recipe.service";
import resources from "../../resources/resources.json";

export default {
  name: "RecipeDetails",
  data() {
    return {
      data: {},
      user: localStorage.getItem("user"),
      liked: false
    };
  },
  methods: {
    like() {
      RecipeService.likeRecipe(this.$route.params.id).then(() => {
        this.data.likes += 1;
        this.liked = true;
      });
    },
    getMealType(id) {
      const meals = resources.mealTypes;

      return meals.find(obj => {
        return obj.value == id;
      })?.name;
    }
  },
  created() {
    RecipeService.getRecipe(this.$route.params.id).then(data => {
      if (data) {
        this.data = data;
      } else {
        this.$router.push({ path: "/" });
      }
    });
  }
};
</script>
<style scoped>
.vegan {
  color: green;
}

.notvegan {
  color: red;
}

.type,
.vegan,
.notvegan {
  font-size: 20px;
}

.author {
  font-size: 12px;
}

.title-text {
  text-decoration: underline;
  font-size: 25px;
  font-weight: 600;
}
</style>
