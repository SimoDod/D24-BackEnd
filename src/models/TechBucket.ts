import { Schema, model } from "mongoose";
import errMsg from "../utils/errorConstants";
import type ITechBucket from "../types/interfaces/ITechBucket";

const TechBucketSchema = new Schema<ITechBucket>(
  {
    name: { type: String, required: [true, errMsg.duplicateValue], unique: true },
  },
  { timestamps: true, collection: 'techBuckets' },
);

const TechBucket = model<ITechBucket>("techBuckets", TechBucketSchema);

export default TechBucket;
