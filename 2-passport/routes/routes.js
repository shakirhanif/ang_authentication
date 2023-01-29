import express from "express";
import passport from "passport";
import { registerUserLocal } from "../controller/user-controller-local.js";
import { loginUser, registerUser } from "../controller/user-controller.js";

const route = express.Router();
route.get("/", (req, res) => {
  res.render("home");
});
route.get("/login", (req, res) => {
  res.render("login");
});
route.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);
route.get("/register", (req, res) => {
  res.render("register");
});
route.post(
  "/register",
  passport.authenticate("userSignUp", { failureRedirect: "/register" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);
route.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets", { user: req.user });
  } else {
    res.redirect("/login");
  }
});
route.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
export default route;
