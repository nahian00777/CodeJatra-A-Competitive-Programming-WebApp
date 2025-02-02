import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  contestId: String,
  index: String,
  rating: Number,
  name: String,
});

export const Problem = mongoose.model("Problem", problemSchema);
