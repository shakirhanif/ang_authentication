import User from "../model/User.js";
import { hashCompare, passwordHash } from "../utils/bcrypt-encryption.js";

export const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.username });
    if (userExists) {
      return res.send("User Already Exists");
    }
    const hashedPassword = await passwordHash(req.body.password);
    const newUser = new User({
      email: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.render("secrets");
  } catch (error) {
    console.log("error while creating user", error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.username });
    if (userExists) {
      const match = await hashCompare(req.body.password, userExists.password);
      if (match) {
        return res.render("secrets");
      } else {
        return res.send("password is incorrect");
      }
    }
    return res.send("please register");
  } catch (error) {
    console.log("error while creating user", error.message);
  }
};
