import type { Document } from "mongoose";
import { Schema, model } from "mongoose";
import errMsg from "../utils/errorConstants";

type IUser = Document & {
  name: string;
  email: string;
  password: string;
  role: "user" | "centralAdmin" | "localAdmin";
  generateSuccessMessage(): { message: string; user: object };
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "centralAdmin", "localAdmin"],
      default: "user",
    },
  },
  { timestamps: true },
);

UserSchema.methods.generateSuccessMessage = function () {
  return {
    message: errMsg.createSuccess,
    user: {
      id: this._id,
      name: this.name,
      email: this.email,
    },
  };
};

const User = model<IUser>("Users", UserSchema);

export default User;
