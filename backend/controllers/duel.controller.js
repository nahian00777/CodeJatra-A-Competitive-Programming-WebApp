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

  // user1Id is handle of the user who is creating the duel
  // user2Id is handle of the user who is accepting the duel
  const user1 = await User.findOne({ handle: user1Id });
  const user2 = await User.findOne({ handle: user2Id });

  // // Validate users
  // const user1 = await User.findById(user1Id);
  // const user2 = await User.findById(user2Id);
  if (!user1 || !user2) {
    throw new ApiError(404, "One or both users not found");
  }

  // Fetch solved problems for user1
  const user1SolvedProblems = await Problems.find({
    solver: user1.handle,
    solved: true,
    rating: rating,
  });
  const user1SolvedSet = new Set(
    user1SolvedProblems.map((p) => `${p.contestId}-${p.index}`)
  );

  // Fetch solved problems for user2
  const user2SolvedProblems = await Problems.find({
    solver: user2.handle,
    solved: true,
    rating: rating,
  });
  const user2SolvedSet = new Set(
    user2SolvedProblems.map((p) => `${p.contestId}-${p.index}`)
  );

  // Fetch all problems from MongoDB
  const allProblems = await Problems.find({ rating: rating });

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
    user1: [user1],
    user2: [user2],
    problem: {
      contestId: selectedProblem.contestId,
      index: selectedProblem.index,
    },
    status: "waiting",
    startTime: null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, duel, "Duel created successfully"));
});

// Drop a duel
export const dropDuel = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  console.log(duelId);

  // Find and delete the duel
  const duel = await Duel.findByIdAndDelete(duelId);

  // console.log(duel);
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
  // console.log(contestId, index);
  // Fetch submissions from Codeforces for both users
  const user1Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user1Handle}&from=1&count=10`
  );
  const user2Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user2Handle}&from=1&count=10`
  );
  // console.log(user1Submissions.data.result);
  // console.log(user2Submissions.data.result);
  // Find the earliest submission time for the problem\
  // console.log(user1Submissions.data.result.problem.contestId);
  // console.log(user1Submissions.data.result);
  // console.log(user1Submissions.data.result.verdict);
  let user1SolvedTime = null;
  let user2SolvedTime = null;
  user1Submissions.data.result.forEach((submission) => {
    if (
      String(submission.problem.contestId) === String(contestId) &&
      String(submission.problem.index) === String(index) &&
      submission.verdict === "OK"
    ) {
      user1SolvedTime = submission.creationTimeSeconds;
    }
  });

  user2Submissions.data.result.forEach((submission) => {
    if (
      String(submission.problem.contestId) === String(contestId) &&
      String(submission.problem.index) === String(index) &&
      submission.verdict === "OK"
    ) {
      user2SolvedTime = submission.creationTimeSeconds;
    }
  });
  // console.log(user1SolvedTime, user2SolvedTime);
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

  // Ensure the duel start time is defined
  const duelStartTime = duel.startTime.getTime() / 1000; // Convert to seconds

  if (user1SolvedTime && user2SolvedTime) {
    if (user1SolvedTime >= duelStartTime && user2SolvedTime >= duelStartTime) {
      winnerId =
        user1SolvedTime < user2SolvedTime
          ? duel.user1[0]._id
          : duel.user2[0]._id;
    } else if (user1SolvedTime >= duelStartTime) {
      winnerId = duel.user1[0]._id;
    } else if (user2SolvedTime >= duelStartTime) {
      winnerId = duel.user2[0]._id;
    }
  } else if (user1SolvedTime && user1SolvedTime >= duelStartTime) {
    winnerId = duel.user1[0]._id;
  } else if (user2SolvedTime && user2SolvedTime >= duelStartTime) {
    winnerId = duel.user2[0]._id;
  }

  // If no winner is determined, handle the case appropriately
  if (!winnerId) {
    console.log("No winner determined");
    // You might want to throw an error or return a specific response here
  } else {
    console.log("Winner ID:", winnerId);
  }

  // Update the duel status to finished and set the winner
  duel.status = "finished";
  duel.winner = winnerId;
  duel.endTime = new Date();
  await duel.save();

  const winner = await User.findById(winnerId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        duel,
        `${winner.handle} has won the duel successfully!`
      )
    );
});

export const getDuel = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Fetch the duel by ID
  const duel = await Duel.findById(duelId).populate("user1 user2");
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  // Return the duel status
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: duel.status,
        user1: duel.user1[0].username,
        user2: duel.user2[0].username,
        problem: duel.problem,
        winner: duel.winner ? duel.winner.username : null,
        startTime: duel.startTime,
        endTime: duel.endTime,
      },
      "Duel status retrieved successfully"
    )
  );
});

export const acceptDuel = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Fetch the duel
  const duel = await Duel.findById(duelId).populate("user1 user2");
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  // Check if the duel is in the waiting state
  if (duel.status !== "waiting") {
    throw new ApiError(400, "Duel is not in a state to be accepted");
  }

  // Update the duel status to ongoing and set invitationAccepted to true
  duel.status = "ongoing";
  duel.invitationAccepted = true;
  duel.startTime = new Date();
  await duel.save();

  return res
    .status(200)
    .json(new ApiResponse(200, duel, "Duel accepted successfully"));
});

export const listUserDuels = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch all duels for the user
  const duels = await Duel.find({
    $or: [{ user1: userId }, { user2: userId }],
  }).populate("user1 user2");

  return res
    .status(200)
    .json(new ApiResponse(200, duels, "User duels retrieved successfully"));
});

// export const cancelDuel = asyncHandler(async (req, res) => {
//   const { duelId } = req.params;

//   // Fetch the duel
//   const duel = await Duel.findById(duelId);
//   if (!duel) {
//     throw new ApiError(404, "Duel not found");
//   }

//   // Check if the duel is in the ongoing state
//   if (duel.status !== "ongoing") {
//     throw new ApiError(400, "Duel cannot be canceled");
//   }

//   // Update the duel status to dropped
//   duel.status = "dropped";
//   await duel.save();

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, {}, "Duel status updated to dropped successfully")
//     );
// });

// Check for new duel requests
export const checkNewDuels = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find duels where the current user is user2 and the status is "waiting"
  const newDuels = await Duel.find({
    user2: userId,
    status: "waiting",
    invitationAccepted: false,
  }).populate("user1", "username");

  if (!newDuels.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No new duel requests"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newDuels, "New duel requests fetched successfully")
    );
});

// get the duel statistics of a user
export const fetchDuelStats = asyncHandler(async (req, res) => {
  const { handle } = req.query;
  console.log("fetching duel stats for" + handle);
  const user = await User.findOne({ handle: handle });
  console.log(user.verdictHistory);

  const data = {
    streak: user.currentStreak,
    duelWon: user.duelWon,
    currentDuelRating: user.currentDuelRating,
  };

  console.log(data);

  return res.status(200).json(data);
});

export const checkInvitation = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Fetch the duel
  const duel = await Duel.findById(duelId);
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { invitationAccepted: duel.invitationAccepted })
    );
});
