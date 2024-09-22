import type { Document } from "mongoose";

type ICounter = {
  name: string;
  seq: number;
} & Document;

export default ICounter;
