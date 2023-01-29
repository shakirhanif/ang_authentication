import passport from "passport";
import User from "../model/User.js";
import { hashCompare, passwordHash } from "../utils/bcrypt-encryption.js";

export const registerUser = async (req, res) => {
  try {
    const registeredUser = await User.register(
      {
        username: req.body.username,
      },
      req.body.password
    );
    if (registeredUser) {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  } catch (error) {
    res.redirect("/register");
    console.log("error while registering user...", error.message);
  }
};

export const loginUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    req.login(user, (err) => {
      if (!err) {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      } else {
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
  // try {
  //   const authenticate = User.authenticate();
  //   const userLogin = await authenticate(req.body.username, req.body.password);
  //   if (userLogin.user) {
  //     passport.authenticate("local")(req, res, () => {
  //       res.redirect("/secrets");
  //     });
  //   } else {
  //     res.redirect("/login");
  //   }
  // } catch (error) {
  //   console.log("error while login user...", error.message);
  // }
};
