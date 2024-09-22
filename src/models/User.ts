import { Schema, model } from "mongoose";
import errMsg from "../utils/errorConstants";
import type IUser from "../types/interfaces/IUser";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "centralAdmin", "localAdmin"],
      default: "user",
    },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
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
