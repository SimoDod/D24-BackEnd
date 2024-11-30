import mongoose, { Schema } from "mongoose";
import type ICounter from "../types/interfaces/ICounter";

const CounterSchema = new Schema<ICounter>({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1000 },
});

const Counter = mongoose.model<ICounter>("Counter", CounterSchema);

export default Counter;
