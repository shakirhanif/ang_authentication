import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import flash from "connect-flash";
const passportGoogleConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, async (err, user) => {
          if (err) {
            return done(err);
          }
          if (!profile) {
            return done(err, false);
          }
          if (!user) {
            const user = new User({
              googleId: profile.id,
              name: profile.displayName,
            });
            await user.save();
            return done(null, user);
          }
          return done(null, user);
        });
      }
    )
  );
};

export default passportGoogleConfig;
