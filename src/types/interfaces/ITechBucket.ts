import type { Document } from "mongoose";

type ITechBucket = {
  name: string;
} & Document;

export default ITechBucket;
