import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createJwt } from "../utils/jwt.js";

// register
export const registerUser = async ({ name, address, email, password }) => {
  if (!password) {
    throw new Error("password is required");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    address,
    email,
    password: hashedPassword,
  });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: createJwt({ id: user._id }),
  };
};

// login
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("invalid email or password");
  }
  const isMath = await bcrypt.compare(password, user.password);
  if (!isMath) {
    throw new Error("invalid email or password");
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: createJwt({ id: user._id }),
  };
};
