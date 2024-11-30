import { Schema, model, Types } from "mongoose";
import errMsg from "../utils/errorConstants";
import type ISegment from "../types/interfaces/ISegment";

const SegmentSchema = new Schema<ISegment>(
  {
    name: {
      type: String,
      required: [true, errMsg.duplicateValue],
      unique: true,
    },
    selectedTechBuckets: [{ type: Types.ObjectId, ref: "techBuckets" }],
  },
  { timestamps: true },
);

const Segment = model<ISegment>("segments", SegmentSchema);

export default Segment;
