import mongoose, { Document, Schema } from "mongoose";
import type { ITaluka } from "./taluka.model.ts";

export interface IBlock extends Document {
  name: string;
  talukaId: mongoose.Types.ObjectId | ITaluka;
}

const blockSchema = new Schema<IBlock>(
  {
    name: { type: String, required: true },
    talukaId: {
      type: Schema.Types.ObjectId,
      ref: "Taluka",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const BlockModel = mongoose.model<IBlock>("Block", blockSchema);
