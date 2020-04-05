import axios from "axios";

const instance = axios.create({
  baseURL: "https://cook-vue.firebaseio.com/",
  headers: { "Content-Type": "application/json" }
});

// Add token to every request
instance.interceptors.request.use(config => {
  // header -> Authorization (Basic/Kinvey)
  config.url = `${config.url}?uid=${localStorage.getItem("token")}`;

  return config;
});

export default instance;
