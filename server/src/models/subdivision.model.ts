import mongoose, { Document, Schema } from "mongoose";
import type { IDistrict } from "./district.model.ts";

export interface ISubDivision extends Document {
  name: string;
  districtId: mongoose.Types.ObjectId | IDistrict;
}

const subDivisionSchema = new Schema<ISubDivision>(
  {
    name: { type: String, required: true },
    districtId: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const SubDivisionModel = mongoose.model<ISubDivision>(
  "SubDivision",
  subDivisionSchema
);
