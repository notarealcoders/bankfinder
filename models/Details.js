import mongoose from "mongoose";

const DetailsSchema = new mongoose.Schema(
  {
    BANK: { type: String, required: true },
    IFSC: { type: String, required: true },
    BRANCH: { type: String, required: true },
    ADDRESS: { type: String, required: true },
    CITY1: { type: String, required: true },
    CITY2: String,
    STATE: { type: String, required: true },
    STD_CODE: Number,
    PHONE: Number,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Create a single compound index for common queries
DetailsSchema.index(
  {
    IFSC: 1,
    BANK: 1,
    STATE: 1,
    CITY1: 1,
  },
  {
    unique: true,
    partialFilterExpression: { IFSC: { $exists: true } },
  }
);

const Details =
  mongoose.models.Details || mongoose.model("Details", DetailsSchema);

export default Details;
