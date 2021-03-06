import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/auth/Login.vue";
import Logout from "../components/auth/Logout.vue";
import Register from "../components/auth/Register.vue";
import { AuthService } from "../services/auth.service";
import RecipeAll from "../components/recipe/RecipeAll.vue";
import RecipeAdd from "../components/recipe/RecipeAdd.vue";
import Recipe from "../components/recipe/Recipe.vue";
import RecipeDetails from "../components/recipe/RecipeDetails.vue";
import RecipeEdit from "../components/recipe/RecipeEdit.vue";
import NotFound from "../components/error/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/recipe",
    component: Recipe,
    children: [
      {
        path: "/",
        component: RecipeAll
      },
      {
        path: "add",
        component: RecipeAdd
      },
      {
        path: "details/:id",
        name: "details",
        component: RecipeDetails
      },
      {
        path: "edit/:id",
        name: "edit",
        component: RecipeEdit
      }
    ]
  },
  {
    path: "*",
    name: "notfound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const guestAreas = ["/", "/login", "/register", "/recipe", "/notfound"];
  const isRestricted = !guestAreas.includes(to.path);
  const loggedIn = AuthService.isLogged();

  if (loggedIn && (to.path == "/login" || to.path == "/register")) {
    return next("/");
  }

  if (isRestricted && !loggedIn && to.path !== "/login") {
    return next({
      path: "/login",
      query: {
        returnURL: to.path
      }
    });
  } else {
    next();
  }
});

export default router;
