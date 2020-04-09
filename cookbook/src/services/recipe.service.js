import axiosDb from "./axios/axios.db";

async function getAll() {
  const recipes = [];
  const res = await axiosDb.get(`recipes.json`);
  console.log(res.data);
  for (const id in res.data) {
    console.log("ID: ", id);
    if (res.data[id]) {
      const rec = {
        id,
        ...res.data[id]
      };
      recipes.push(rec);
    }
  }

  return recipes;
}

async function addNew(payload) {
  await axiosDb.post(`/recipes.json`, payload);
}

async function getRecipe(id) {
  const res = await axiosDb.get(`/recipes/${id}.json`);

  return res.data;
}

export const RecipeService = {
  getAll,
  addNew,
  getRecipe
};
