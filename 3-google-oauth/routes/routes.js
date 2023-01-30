import express from "express";
import passport from "passport";
import { submitSecret } from "../controller/secret-controller.js";
import { registerUserLocal } from "../controller/user-controller-local.js";
import { loginUser, registerUser } from "../controller/user-controller.js";
import Secret from "../model/Secret.js";

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
  if (req.isAuthenticated()) {
    res.redirect("/secrets");
  }
  res.render("register", { message: req.flash("registerMessage") });
});
route.post(
  "/register",
  passport.authenticate("userSignUp", { failureRedirect: "/register" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);
route.get("/secrets", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user._id;
    const secrets = await Secret.find({ userId });
    res.render("secrets", { user: req.user, secrets });
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
route.get("/auth", passport.authenticate("google", { scope: ["profile"] }));

route.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

route.post("/submit", submitSecret);
export default route;
