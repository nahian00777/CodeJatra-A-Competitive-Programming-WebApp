import mongoose from "mongoose";

const duelSchema = new mongoose.Schema(
  {
    user1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    problem: {
      name: String,
      contestId: String,
      index: String,
    },
    status: {
      type: String,
      enum: ["waiting", "ongoing", "finished", "rejected"],
      default: "waiting",
    },
    invitationAccepted: {
      type: Boolean,
      default: false,
    },
    invitationRejected: {
      type: Boolean,
      default: false,
    },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    droppedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    startTime: Date,
    endTime: Date,
  },
  {
    timestamps: true,
  }
);

export const Duel = mongoose.model("Duel", duelSchema);
