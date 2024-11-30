import type { Document } from "mongoose";

type IOffice = {
  name: string;
} & Document;

export default IOffice;
