import { Schema } from "mongoose";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId





export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true, min: 0, max: 200 },
  bathrooms: { type: Number, required: true, min: 0, max: 200 },
  levels: { type: Number, required: true, min: 1, max: 30 },
  imgUrl: {
    type: String, default: 'https://external-preview.redd.it/PNav8sKER0BPDEg6PHqPdqCZlHG1gcuEnnY9MbFwvR4.jpg?auto=webp&s=360c8770c552fff16ce224615386ede804675c92'
  },
  year: { type: Number, required: true, min: 0, max: new Date().getFullYear() },
  price: { type: Number, required: true, min: 0, },

  sellerId: { type: ObjectId, required: true, ref: 'Account' }


}, { timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})