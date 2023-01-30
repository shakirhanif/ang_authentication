import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
import connection from "./database/db.js";
import User from "./model/User.js";
import session from "express-session";
import passport from "passport";
import passportConfig from "./middleware/passport-config-local.js";
import flash from "connect-flash";
import passportGoogleConfig from "./middleware/google-oauth-config.js";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "this is secret",
    resave: false,
    saveUninitialized: "false",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
connection();
passportConfig(passport);
passportGoogleConfig(passport);
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
app.use("/", route);
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runing at ${PORT}`);
});
