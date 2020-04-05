import axiosDb from "./axios/axios.db";

async function getAll() {
  const recipes = [];
  const res = await axiosDb.get(`recipes.json`);
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

export const RecipeService = {
  getAll
};
