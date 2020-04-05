import firebase from "firebase";
import router from "../router/index";

function logout(comp) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem("user");
      comp.$bus.$emit("logged", "User has logged out!");
      router.push({
        name: "Home"
      });
    });
}

function register(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      router.push({ name: "Login" });
      return data;
    })
    .catch(err => {
      return err;
    });
}

function login(email, password, comp) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem("token", user.uid);
        }
      });
      console.log(data);
      localStorage.setItem("user", email);
      router.push({ name: "Home" });
      comp.$bus.$emit("logged", "User has logged in!");
    })
    .catch(err => {
      console.log(err);
    });
}

function isLogged() {
  return localStorage.getItem("user") !== null;
}

export const AuthService = {
  login,
  register,
  logout,
  isLogged
};
