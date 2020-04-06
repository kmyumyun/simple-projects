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

async function addNew() {
  const payload = {
    title: "Post Test",
    description: "Post test recipe"
  };
  await axiosDb.post(`/recipes.json`, payload).then(res => {
    console.log(res);
  });
}

export const RecipeService = {
  getAll,
  addNew
};
