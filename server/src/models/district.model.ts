import mongoose, { Document, Schema } from "mongoose";
import type { IState } from "./state.model.ts";

export interface IDistrict extends Document {
  name: string;
  stateId: mongoose.Types.ObjectId | IState;
}

const districtSchema = new Schema<IDistrict>(
  {
    name: { type: String, required: true },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const DistrictModel = mongoose.model<IDistrict>("District", districtSchema);
