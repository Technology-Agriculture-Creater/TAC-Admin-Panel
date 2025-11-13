import mongoose, { Document, Schema } from "mongoose";
import type { IState } from "./state.model.ts";

export interface IDivision extends Document {
  name: string;
  stateId: mongoose.Types.ObjectId | IState;
}

const divisionSchema = new Schema<IDivision>(
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

export const DivisionModel = mongoose.model<IDivision>("Division", divisionSchema);
