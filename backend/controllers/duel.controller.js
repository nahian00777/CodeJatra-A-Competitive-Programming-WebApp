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
      name: selectedProblem.name,
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
  // req.user is populated by your verifyJWT middleware,
  // regardless of whether the token came from a cookie or an Authorization header.
  // verifyJWT is responsible for extracting the token (from cookies in this case),
  // verifying it, and attaching the user payload to req.user.
  const userIdDropping = req.user?._id;

  if (!userIdDropping) {
    // This means verifyJWT didn't populate req.user, which indicates an authentication issue.
    throw new ApiError(401, "Unauthorized. User not identified.");
  }

  const duel = await Duel.findById(duelId);

  if (!duel) {
    throw new ApiError(404, "Duel not found.");
  }

  // Extract participant IDs from arrays.
  const user1Id = duel.user1 && duel.user1.length > 0 ? duel.user1[0] : null;
  const user2Id = duel.user2 && duel.user2.length > 0 ? duel.user2[0] : null;

  // Authorization: Check if the user dropping is actually a participant
  const isUser1Dropping =
    user1Id && user1Id.toString() === userIdDropping.toString();
  const isUser2Dropping =
    user2Id && user2Id.toString() === userIdDropping.toString();

  if (!isUser1Dropping && !isUser2Dropping) {
    throw new ApiError(
      403,
      "Forbidden. You are not a participant in this duel."
    );
  }
  console.log(`User ${userIdDropping} is dropping the duel ${duelId}.`); // Debugging log
  // This action is intended for forfeiting an "ongoing" duel.
  if (duel.status !== "ongoing") {
    throw new ApiError(
      400,
      `Duel cannot be forfeited because its status is '${duel.status}', not 'ongoing'.`
    );
  }

  // Update duel to "finished" state due to forfeiture
  duel.status = "finished"; // Using "finished" as discussed
  duel.endTime = new Date();
  duel.droppedBy = userIdDropping; // Mark who initiated the forfeit

  // Assign winner: the other participant
  let winnerId = null;
  let loserId = null;
  if (isUser1Dropping && user2Id) {
    duel.winner = user2Id;
    winnerId = user2Id;
    loserId = user1Id;
  } else if (isUser2Dropping && user1Id) {
    duel.winner = user1Id;
    winnerId = user1Id;
    loserId = user2Id;
  } else {
    console.warn(
      `Duel ${duelId} (status: ongoing) forfeited by ${userIdDropping}, but the other participant could not be determined to assign a winner.`
    );
  }

  // Call the function with the winner's and loser's IDs and rating changes
  const ratingChangeWinner = 25; // Positive number for winner
  const ratingChangeLoser = -25; // Negative number for loser

  updateDuelRecords(winnerId, loserId, ratingChangeWinner, ratingChangeLoser);

  await duel.save();

  return res.status(200).json(
    new ApiResponse( // Assuming this is your standard response wrapper
      200,
      {
        duelId: duel._id,
        status: duel.status,
        winner: duel.winner,
        droppedBy: duel.droppedBy,
        endTime: duel.endTime,
      },
      "Duel forfeited successfully. The duel is now finished."
    )
  );
});

async function updateDuelRecords(
  winnerId,
  loserId,
  ratingChangeWinner,
  ratingChangeLoser
) {
  try {
    // Retrieve both user documents
    const [winner, loser] = await Promise.all([
      User.findById(winnerId),
      User.findById(loserId),
    ]);

    if (!winner || !loser) {
      throw new Error("Winner or loser not found");
    }

    // Current date for both entries
    const duelKey = new Date().toISOString();
    const currentDate = new Date();

    // Update winner's stats
    winner.currentDuelRating += ratingChangeWinner;
    winner.duelWon += 1;
    winner.currentStreak += 1;

    // Format the date to 'DD/MM/YYYY'
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`; // e.g., '05/11/2023'

    // Add the new rating to the history
    winner.duelRatingHistory.push({
      date: formattedDate,
      newRating: winner.currentDuelRating,
    });

    // Update loser's stats
    loser.currentDuelRating += ratingChangeLoser; // ratingChangeLoser is typically negative
    loser.currentStreak = 0; // Reset streak on loss

    loser.duelRatingHistory.push({
      date: formattedDate,
      newRating: loser.currentDuelRating,
    });

    // Save both users
    // console.log(winner)
    await Promise.all([winner.save(), loser.save()]);

    // console.log('Duel records updated successfully for both winner and loser!');
  } catch (error) {
    console.error("Error updating duel records:", error);
    // Handle errors appropriately
  }
}

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
  // Fetch submissions from Codeforces for both users
  const user1Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user1Handle}&from=1&count=10`
  );
  const user2Submissions = await axios.get(
    `https://codeforces.com/api/user.status?handle=${user2Handle}&from=1&count=10`
  );
  // Find the earliest submission time for the problem\

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
  let loserId = null;

  // Ensure the duel start time is defined
  const duelStartTime = duel.startTime.getTime() / 1000; // Convert to seconds

  if (user1SolvedTime && user2SolvedTime) {
    if (user1SolvedTime >= duelStartTime && user2SolvedTime >= duelStartTime) {
      winnerId =
        user1SolvedTime < user2SolvedTime
          ? duel.user1[0]._id
          : duel.user2[0]._id;
      loserId =
        user1SolvedTime > user2SolvedTime
          ? duel.user1[0]._id
          : duel.user2[0]._id;
    } else if (user1SolvedTime >= duelStartTime) {
      winnerId = duel.user1[0]._id;
      loserId = duel.user2[0]._id;
    } else if (user2SolvedTime >= duelStartTime) {
      winnerId = duel.user2[0]._id;
      loserId = duel.user1[0]._id;
    }
  } else if (user1SolvedTime && user1SolvedTime >= duelStartTime) {
    winnerId = duel.user1[0]._id;
    loserId = duel.user2[0]._id;
  } else if (user2SolvedTime && user2SolvedTime >= duelStartTime) {
    winnerId = duel.user2[0]._id;
    loserId = duel.user1[0]._id;
  }

  // If no winner is determined, handle the case appropriately
  if (!winnerId) {
    console.log("No winner determined");
    // You might want to throw an error or return a specific response here
  } else {
  }

  const winner = await User.findById(winnerId);

  // Call the function with the winner's and loser's IDs and rating changes
  const ratingChangeWinner = 25; // Positive number for winner
  const ratingChangeLoser = -25; // Negative number for loser

  updateDuelRecords(winnerId, loserId, ratingChangeWinner, ratingChangeLoser);

  // Update the duel status to finished and set the winner
  duel.status = "finished";
  duel.winner = winnerId;
  duel.endTime = new Date();
  await duel.save();

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

export const rejectDuel = asyncHandler(async (req, res) => {
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
  duel.status = "rejected";
  duel.invitationRejected = true;
  duel.startTime = new Date();
  await duel.save();

  return res
    .status(200)
    .json(new ApiResponse(200, duel, "Duel rejected successfully"));
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
  const user = await User.findOne({ handle: handle });

  const data = {
    streak: user.currentStreak,
    duelWon: user.duelWon,
    currentDuelRating: user.currentDuelRating,
    totalDuels: user.duelRatingHistory.length,
    avatar: user.avatar,
    duelRatingHistory: user.duelRatingHistory,
  };

  return res.status(200).json(data);
});

export const checkInvitation = asyncHandler(async (req, res) => {
  const { duelId } = req.params;

  // Fetch the duel
  const duel = await Duel.findById(duelId);
  if (!duel) {
    throw new ApiError(404, "Duel not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        invitationAccepted: duel.invitationAccepted,
        invitationRejected: duel.invitationRejected,
      },
      "Invitation status retrieved successfully"
    )
  );
});

export const recentDuels = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const userId = req.user._id;
  // console.log(userId);
  if (!userId) {
    throw new ApiError(404, "User not found");
  }
  const duels = await Duel.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: "finished",
  })
    .sort({ createdAt: -1 })
    .populate("user1 user2", "username email handle");
  return res.status(200).json(new ApiResponse(200, duels));
});

export const listUserDuel = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  // Fetch all duels for the user
  const duels = await Duel.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: "ongoing",
  }).populate("user1 user2");

  if (!duels) {
    throw new ApiError(404, "No ongoing duels found for the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, duels, "User duels retrieved successfully"));
});
