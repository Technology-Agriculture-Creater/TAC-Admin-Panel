import mongoose, { Document, Schema } from "mongoose";
import type { ICity } from "./city.model.ts";

export interface IWard extends Document {
  name: string;
  cityId: mongoose.Types.ObjectId | ICity;
  wardNumber?: string;
}

const wardSchema = new Schema<IWard>(
  {
    name: { type: String, required: true },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true,
    },
    wardNumber: { type: String },
  },
  { timestamps: true }
);

export const WardModel = mongoose.model<IWard>("Ward", wardSchema);
