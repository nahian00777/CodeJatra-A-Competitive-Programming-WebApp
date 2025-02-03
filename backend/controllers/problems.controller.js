import { asyncHandler } from "../utils/AsyncHandler.js";
import { Problems } from "../models/problem.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const fetchProblems = asyncHandler(async (req, res) => {
  // 1. Get the handle from the request body
  const { handle } = req.body;

  // 2. Fetch the user's solved problems from Codeforces API
  const APIresponse = await axios.get(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`
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

export { fetchProblems };
