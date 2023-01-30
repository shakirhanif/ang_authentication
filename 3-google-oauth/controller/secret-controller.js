import Secret from "../model/Secret.js";

export const submitSecret = async (req, res) => {
  const user = req.user;
  const secret = new Secret({ userId: user._id, secret: req.body.secret });
  await secret.save();
  res.redirect("/secrets");
};
