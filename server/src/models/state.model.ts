import mongoose, { Document, Schema } from "mongoose";
import type { ICountry } from "./country.model.ts";

export interface IState extends Document {
  name: string;
  code: string;
  countryId: mongoose.Types.ObjectId | ICountry;
}

const stateSchema = new Schema<IState>(
  {
    name: { type: String, required: true },
    code: { type: String },
    countryId: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const StateModel = mongoose.model<IState>("State", stateSchema);
