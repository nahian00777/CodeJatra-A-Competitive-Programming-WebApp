import { asyncHandler } from "../utils/AsyncHandler.js";
import { Problems } from "../models/problem.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const fetchProblems = asyncHandler(async (req, res) => {
  // 1. Get the handle from the request body
  const { handle } = req.body;

  // 2. Fetch the user's solved problems from Codeforces API
  const APIresponse = await axios.get(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`
  );
  const responses = APIresponse.data.result;

  console.log(`Fetched ${responses.length} problems from Codeforces`);

  let insertedCount = 0;
  let updatedcnt = 0;

  for (const response of responses) {
    const { contestId, index, name, rating } = response.problem;
    const solver = handle;
    const solved = response.verdict === "OK";

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

  console.log(`Total inserted problems: ${insertedCount}`);
  // 4. Return success response with inserted problems
  return res.status(200).json(
    new ApiResponse(200, {
      message: `Inserted ${insertedCount} new problems. Updated ${updatedcnt} existing problems`,
    })
  );
});


///// get the count of verdicts



///// get the number of ratings



///// get the rating history

const fetchRatingHistory = asyncHandler(async (req, res) => {
    // 1. Get the handle from the request body
    const { handle } = req.query;

    console.log("fetching rating history of " + handle);

    // 2. Fetch the user's rating history from Codeforces API
    const APIresponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const responses = APIresponse.data.result;

    console.log(`Fetched ${responses.length} contest history from Codeforces`);

    let insertedCount = 0;

    const formattedRatings = responses.map(response =>  {
        const { contestId, contestName, rank, ratingUpdateTimeSeconds: date, oldRating, newRating } = response;

        const formattedDate = new Date(date * 1000).toLocaleDateString("en-GB"); // "DD/MM/YYYY"

        return { date: formattedDate, newRating };
    });
    // 4. Return success response with rating history
    return res.status(200).json(formattedRatings);
});

export { fetchProblems, fetchRatingHistory };
