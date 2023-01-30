import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  name: {
    type: String,
  },
});
// UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", UserSchema);
export default User;
