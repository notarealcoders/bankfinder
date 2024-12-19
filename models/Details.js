import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema({
  BANK: String,
  IFSC: String,
  BRANCH: String,
  ADDRESS: String,
  CITY1: String,
  CITY2: String,
  STATE: String,
  "STD CODE": Number,
  PHONE: Number,
});

export default mongoose.models.Details ||
  mongoose.model("Details", DetailsSchema);
