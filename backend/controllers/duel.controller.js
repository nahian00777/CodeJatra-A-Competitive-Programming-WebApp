import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Duel } from "../models/duel.model.js";
import { User } from "../models/users.model.js";
import { Problems } from "../models/problem.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

// Create a new duel
export const createDuel = asyncHandler(async (req, res) => {
  const { user1Id, user2Id, rating } = req.body;

  // Validate users
  const user1 = await User.findById(user1Id);
  const user2 = await User.findById(user2Id);
  if (!user1 || !user2) {
    throw new ApiError(404, "One or both users not found");
  }

  // Fetch solved problems for user1
  const user1SolvedProblems = await Problems.find({
    solver: user1.handle,
    solved: true,
    rating: rating
  });
  const user1SolvedSet = new Set(
    user1SolvedProblems.map((p) => `${p.contestId}-${p.index}`)
  );

  // Fetch solved problems for user2
  const user2SolvedProblems = await Problems.find({
    solver: user2.handle,
    solved: true,
    rating: rating
  });
  const user2SolvedSet = new Set(
    user2SolvedProblems.map((p) => `${p.contestId}-${p.index}`)
  );

  // Fetch all problems from MongoDB
  const allProblems = await Problems.find({rating: rating});

  // Filter unsolved problems
  const unsolvedProblems = allProblems.filter((problem) => {
    const problemKey = `${problem.contestId}-${problem.index}`;
    return !user1SolvedSet.has(problemKey) && !user2SolvedSet.has(problemKey);
  });

  if (unsolvedProblems.length === 0) {
    throw new ApiError(404, "No unsolved problems available for both users");
  }

  // Select a random problem
  const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
  const selectedProblem = unsolvedProblems[randomIndex];

  // Create a new duel
  const duel = await Duel.create({
    user1: [user1Id],
    user2: [user2Id],
    problem: {
      contestId: selectedProblem.contestId,
      index: selectedProblem.index,
    },
    status: "ongoing",
    startTime: new Date(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, duel, "Duel created successfully"));
});

// Drop a duel
export const dropDuel = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Find and delete the duel
  const duel = await Duel.findByIdAndDelete(duelId);
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Duel dropped successfully"));
});

// Complete a duel
export const completeDuel = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Fetch the duel
  const duel = await Duel.findById(duelId).populate("user1 user2");
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  // Check if the duel is ongoing
  if (duel.status !== "ongoing") {
    throw new ApiError(400, "Duel is not ongoing");
  }

  // Get user handles
  const user1Handle = duel.user1[0].handle;
  const user2Handle = duel.user2[0].handle;

  // Fetch problem details
  const { contestId, index } = duel.problem;
  console.log(contestId, index);
  // Fetch submissions from Codeforces for both users
  const user1Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user1Handle}`
  );
  const user2Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user2Handle}`
  );
  console.log("i am not here");
  // Find the earliest submission time for the problem
  const user1SolvedTime = user1Submissions.data.result
    .filter(
      (submission) =>
        submission.problem.contestId === contestId &&
        submission.problem.index === index &&
        submission.verdict === "OK"
    )
    .map((submission) => submission.creationTimeSeconds)
    .sort((a, b) => a - b)[0];

  const user2SolvedTime = user2Submissions.data.result
    .filter(
      (submission) =>
        submission.problem.contestId === contestId &&
        submission.problem.index === index &&
        submission.verdict === "OK"
    )
    .map((submission) => submission.creationTimeSeconds)
    .sort((a, b) => a - b)[0];

  // Check if neither user has solved the problem
  if (!user1SolvedTime && !user2SolvedTime) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, duel, "Neither user has solved the problem yet.")
      );
  }

  // Determine the winner
  let winnerId = null;
  if (user1SolvedTime && user2SolvedTime) {
    winnerId =
      user1SolvedTime < user2SolvedTime ? duel.user1[0]._id : duel.user2[0]._id;
  } else if (user1SolvedTime) {
    winnerId = duel.user1[0]._id;
  } else if (user2SolvedTime) {
    winnerId = duel.user2[0]._id;
  }

  // Update the duel status to finished and set the winner
  duel.status = "finished";
  duel.winner = winnerId;
  duel.endTime = new Date();
  await duel.save();

  return res
    .status(200)
    .json(new ApiResponse(200, duel, "Duel completed successfully"));
});