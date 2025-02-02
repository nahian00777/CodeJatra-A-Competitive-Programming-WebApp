import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  contestId: String,
  index: String,
  rating: Number,
  name: String,
  solver: String,
  solved: Boolean,
});

export const Problems = mongoose.model("Problem", problemSchema);
