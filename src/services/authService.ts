import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import errMsg from "../utils/errorConstants.js";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(errMsg.failAcquireToken);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: userPassword, ...safeUserData } = user;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user: safeUserData };
};

export const loginUser = async (email: string, password: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(errMsg.failAcquireToken);
  }

  const user = await User.findOne({ email }).lean();

  if (!user) {
    throw new Error(errMsg.invalidCredentials);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(errMsg.invalidCredentials);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: userPassword, ...safeUserData } = user;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user: safeUserData };
};

export const findUserById = async (userId: string) =>
  await User.findById(userId).select("-password");
