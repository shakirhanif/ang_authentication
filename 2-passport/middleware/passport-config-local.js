import { Strategy as localStrategy } from "passport-local";
import User from "../model/User.js";
import bcrypt from "bcrypt";
const passportConfig = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ email: username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
  passport.use(
    "userSignUp",
    new localStrategy((username, password, done) => {
      User.findOne({ email: username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        const hash = await bcrypt.hash(password, 5);
        if (!user) {
          const newUser = new User({
            email: username,
            password: hash,
          });
          await newUser.save();
          return done(null, newUser);
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};

export default passportConfig;
