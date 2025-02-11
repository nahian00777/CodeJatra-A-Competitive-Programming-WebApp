import { asyncHandler } from "../utils/AsyncHandler.js";
import { Problems } from "../models/problem.model.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";


const ratingCounts = {};
const verditCounts = {};
const visited = new Set();

const fetchProblems = asyncHandler(async (req, res) => {
  // 1. Get the handle from the request body
  const { handle } = req.body;
  // console.log("fetching problems of " + handle);

  // 2. Fetch the user's solved problems from Codeforces API
  const APIresponse = await axios.get(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`
  );
  const responses = APIresponse.data.result;

  let insertedCount = 0;
  let updatedcnt = 0;

  for (const response of responses) {
    const { contestId, index, name, rating } = response.problem;
    const solver = handle;
    const solved = response.verdict === "OK";

    // Check if contestId length > 4 and rating is not defined
    // create map for verdicts
    if (response.verdict === "OK") {
      verditCounts["Accepted"] = (verditCounts["Accepted"] || 0) + 1;
    } else if (
      response.verdict === "WRONG_ANSWER" ||
      response.verdict === "TIME_LIMIT_EXCEEDED" ||
      response.verdict === "MEMORY_LIMIT_EXCEEDED"
    ) {
      verditCounts[response.verdict] =
        (verditCounts[response.verdict] || 0) + 1;
    } else {
      verditCounts["Others"] = (verditCounts["Others"] || 0) + 1;
    }

    // creating the map for barchart of solved rating!
    if (solved && rating != null && !visited.has(name)) {
      visited.add(name);
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    }

    // Skip this iteration if the conditions are met
    if (!rating) {
      continue; // Skip this iteration if the conditions are met
    }


    // Check if the problem already exists
    const existingProblem = await Problems.findOne({
      contestId,
      index,
      solver,
    });

    if (!existingProblem) {
      // Insert new problem
      const problem = await Problems.create({
        contestId,
        index,
        rating,
        name,
        solver,
        solved,
      });
      insertedCount++;
    } else {
      // Update existing problem
      if (solved && !existingProblem.solved) {
        existingProblem.solved = true;
        await existingProblem.save();
        updatedcnt++;
      }
    }
  }

  // console.log(`Total inserted problems: ${insertedCount}`);
  // console.log(ratingCounts);

  const result = await User.findOneAndUpdate(
    { handle: handle }, // Find the user by their unique ID
    { 
      verdictHistory: verditCounts,
      problemRatings: ratingCounts
    }, // Update the verdictHistory field
    { new: true } // Return the updated document
  );
  if(result){
    console.log("Updated verdict history for user: ", result);
  }

  // 4. Return success response with inserted problems
  return res.status(200).json(
    new ApiResponse(200, {
      message: `Inserted ${insertedCount} new problems. Updated ${updatedcnt} existing problems`,
    })
  );
});

const deleteProblems = asyncHandler(async (req, res) => {
  try {
    // Deleting problems where contestId length > 4 or rating is not defined
    const result = await Problems.deleteMany({
      $or: [
        { $expr: { $gt: [{ $strLenCP: "$contestId" }, 4] } }, // contestId length > 4
        { rating: { $exists: false } }, // rating not defined
      ],
    });

    // console.log(`Deleted ${result.deletedCount} problems.`);

    // Return a success response with the number of deleted problems
    return res.status(200).json({
      message: `${result.deletedCount} problems deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting problems:", error);
    return res.status(500).json({
      message: "Error deleting problems",
      error: error.message,
    });
  }
});

///// get the count of verdicts
const fetchSubmissionStats = asyncHandler(async (req, res) => {
  const { handle } = req.query;
  const user = await User.findOne({ handle: handle });
  
  const data = Object.entries(user.verdictHistory).map(([key, value]) => ({
    status: key,
    count: value
  }));
  return res.status(200).json(data);
});

///// get the number of ratings
const fetchRatingCount = asyncHandler(async (req, res) => {
  const { handle } = req.query;
  const user = await User.findOne({ handle: handle });
  
  const data = Array.from(user.problemRatings.entries()).map(([key, value]) => ({
    rating: key,
    count: value
  }));
  
  return res.status(200).json(data);
});

///// get the rating history for line chart
const fetchRatingHistory = asyncHandler(async (req, res) => {
  // 1. Get the handle from the request body
  const { handle } = req.query;

  // console.log("fetching rating history of " + handle);

  // 2. Fetch the user's rating history from Codeforces API
  const APIresponse = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );
  const responses = APIresponse.data.result;

  const formattedRatings = responses.map((response) => {
    const {
      contestId,
      contestName,
      rank,
      ratingUpdateTimeSeconds: date,
      oldRating,
      newRating,
    } = response;

    const formattedDate = new Date(date * 1000).toLocaleDateString("en-GB"); // "DD/MM/YYYY"

    return { date: formattedDate, newRating };
  });
  // 4. Return success response with rating history
  // console.log(formattedRatings);
  return res.status(200).json(formattedRatings);
});


export {
  fetchProblems,
  fetchRatingHistory,
  fetchSubmissionStats,
  fetchRatingCount,
  deleteProblems,
};
