import mongoose from "mongoose";

const secretSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  secret: {
    type: String,
  },
});

const Secret = mongoose.model("secret", secretSchema);
export default Secret;
