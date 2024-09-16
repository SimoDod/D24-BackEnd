import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import errMsg from "../utils/errorConstants.js";

const jwtSecret = process.env.JWT_SECRET;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<{ message: string }> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser.generateSuccessMessage();
};

export const loginUser = async (email: string, password: string) => {
  if (!jwtSecret) {
    throw new Error(errMsg.failAcquireToken);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(errMsg.invalidCredentials);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(errMsg.invalidCredentials);
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "1h",
  });

  return { token };
};
