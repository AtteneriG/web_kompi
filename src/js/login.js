import { logInFirebase, logInGoogle, logInFacebook, userLogued, setUser, setPers } from "./fbauth.js";

const logInButton = document.querySelector(".btn-login-email");
const logGoogle = document.querySelector(".btn-login-google");
const logFacebook = document.querySelector(".btn-login-facebook");

logInButton.addEventListener("click", () => {
  const email = document.querySelector(".input-email").value;
  const password = document.querySelector(".input-password").value;
  setPers(email, password);
  logInFirebase(email, password);

  console.log(setUser());
});

logGoogle.addEventListener("click", () => {
  logInGoogle();
});

// Login con facebook
logFacebook.addEventListener("click", () => {
  logInFacebook();
});