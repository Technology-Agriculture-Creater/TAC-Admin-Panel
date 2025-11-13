import mongoose, { Document, Schema } from "mongoose";
import type { ISubDivision } from "./subdivision.model.ts";

export interface ITaluka extends Document {
  name: string;
  subDivisionId: mongoose.Types.ObjectId | ISubDivision;
  isUrban?: boolean;
}

const talukaSchema = new Schema<ITaluka>(
  {
    name: { type: String, required: true },
    subDivisionId: {
      type: Schema.Types.ObjectId,
      ref: "SubDivision",
      required: true,
      index: true,
    },
    isUrban: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TalukaModel = mongoose.model<ITaluka>("Taluka", talukaSchema);
