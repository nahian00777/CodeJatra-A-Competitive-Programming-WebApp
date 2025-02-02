import mongoose from "mongoose";

const duelSchema = new mongoose.Schema(
  {
    user1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    problem: {
      contestId: String,
      index: String,
    },
    status: {
      type: String,
      enum: ["waiting", "ongoing", "finished"],
      default: "waiting",
    },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startTime: Date,
    endTime: Date,
  },
  {
    timestamps: true,
  }
);

export const Duel = mongoose.model("Duel", duelSchema);
