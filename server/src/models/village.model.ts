import mongoose, { Document, Schema } from "mongoose";
import type { ICity } from "./city.model.ts";

export interface IVillage extends Document {
  name: string;
  cityId: mongoose.Types.ObjectId | ICity;
}

const villageSchema = new Schema<IVillage>(
  {
    name: { type: String, required: true },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const VillageModel = mongoose.model<IVillage>("Village", villageSchema);
