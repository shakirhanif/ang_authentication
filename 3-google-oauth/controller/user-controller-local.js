import User from "../model/User.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const registerUserLocal = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 5);
    const user = new User({ email: req.body.username, password: hash });
    await user.save();
    res.redirect("/secrets");
  } catch (error) {
    res.redirect("/register");
    console.log("error while registering user...", error.message);
  }
};
