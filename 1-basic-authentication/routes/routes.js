import express from "express";
import { loginUser, registerUser } from "../controller/user-controller.js";

const route = express.Router();
route.get("/", (req, res) => {
  res.render("home");
});
route.get("/login", (req, res) => {
  res.render("login");
});
route.post("/login", loginUser);
route.get("/register", (req, res) => {
  res.render("register");
});
route.post("/register", registerUser);
export default route;
