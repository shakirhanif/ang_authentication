import bcrypt from "bcrypt";
export const passwordHash = async (password) => {
  const HashedPassword = await bcrypt.hash(password, 5);
  return HashedPassword;
};

export const hashCompare = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
