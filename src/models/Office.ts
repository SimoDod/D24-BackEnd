import { Schema, model } from "mongoose";
import errMsg from "../utils/errorConstants";
import type IOffice from "../types/interfaces/IOffice";

const OfficeSchema = new Schema<IOffice>(
  {
    name: { type: String, required: [true, errMsg.duplicateValue], unique: true },
  },
  { timestamps: true },
);

const Office = model<IOffice>("offices", OfficeSchema);

export default Office;
