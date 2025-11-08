import mongoose, { Document, Schema } from "mongoose";
import type { IDistrict } from "./district.model.ts";

export interface ICity extends Document {
  name: string;
  districtId: mongoose.Types.ObjectId | IDistrict;
  latitude?: number;
  longitude?: number;
}

const citySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    districtId: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
      index: true,
    },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true }
);

export const CityModel = mongoose.model<ICity>("City", citySchema);
