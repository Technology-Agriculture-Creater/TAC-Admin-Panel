import mongoose, { Document, Schema } from "mongoose";

export interface ICountry extends Document {
  name: string;
  isoCode: string;
  phoneCode: string;
}

const countrySchema = new Schema<ICountry>(
  {
    name: { type: String, required: true, unique: true },
    isoCode: { type: String, required: true },
    phoneCode: { type: String, required: true },
  },
  { timestamps: true }
);

export const CountryModel = mongoose.model<ICountry>("Country", countrySchema);
