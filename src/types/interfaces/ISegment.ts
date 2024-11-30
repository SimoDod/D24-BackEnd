import type { Document, Types } from "mongoose";

type ISegment = {
  name: string;
  selectedTechBuckets: Types.ObjectId[];
} & Document;

export default ISegment;
