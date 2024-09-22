import type { Document, Types } from "mongoose";

type IUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "centralAdmin" | "localAdmin";
  generateSuccessMessage(): { message: string; user: object };
  reports: Types.ObjectId[];
} & Document;

export default IUser;
