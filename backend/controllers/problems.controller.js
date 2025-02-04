import { asyncHandler } from "../utils/AsyncHandler.js";
import { Problems } from "../models/problem.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import redis from "redis";

const client = redis.createClient({
  host: "127.0.0.1", // Replace with your Redis host
  port: 6379,        // Replace with your Redis port
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});


const ratingCounts = {};
const verditCounts = {};
const visited = new Set();

const fetchProblems = asyncHandler(async (req, res) => {
  // 1. Get the handle from the request body
  const { handle } = req.body;

  const redisKey = `user:${handle}`;

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

    // create map for verdicts
    if(response.verdict === "OK"){
      verditCounts['Accepted'] = (verditCounts['Accepted'] || 0) + 1;
    }
    else if(response.verdict === "WRONG_ANSWER" || response.verdict === "TIME_LIMIT_EXCEEDED" || response.verdict === "MEMORY_LIMIT_EXCEEDED"){
      verditCounts[response.verdict] = (verditCounts[response.verdict] || 0) + 1;
    }
    else {
      verditCounts['Others'] = (verditCounts['Others'] || 0) + 1; 
    }
    
    // creating the map for barchart of solved rating!
    if (solved && rating != null && !visited.has(name)) {
        visited.add(name);
        ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
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

  console.log(`Total inserted problems: ${insertedCount}`);
  // Store ratingCounts and verdictCounts
  await client.hSet(redisKey, {
    ratingCounts: JSON.stringify(ratingCounts),
    verdictCounts: JSON.stringify(verditCounts),
  });
  
  // 4. Return success response with inserted problems
  return res.status(200).json(
    new ApiResponse(200, {
      message: `Inserted ${insertedCount} new problems. Updated ${updatedcnt} existing problems`,
    })
  );
});


///// get the count of verdicts
const fetchSubmissionStats = asyncHandler(async (req, res) => {
  const { handle } = req.query;
  const redisKey = `user:${handle}`;
  
  if (!client.isOpen) {
    await client.connect();
  }
  
  const data = await client.hGetAll(redisKey);
  
  const jsonverdictCounts = data.verdictCounts ? JSON.parse(data.verdictCounts) : {};

  const verdictCounts = Object.entries(jsonverdictCounts).map(([key, value]) => ({
    name: key,
    value: parseInt(value, 10), // Ensure the value is a number
  }));

  console.log("Verdict Countsasfadf:", verdictCounts);

  return res.status(200).json(verdictCounts);
});



///// get the number of ratings
const fetchRatingCount = asyncHandler(async (req, res) => {
  const { handle } = req.query;
  const redisKey = `user:${handle}`;
  
  if (!client.isOpen) {
    await client.connect();
  }
  
  const data = await client.hGetAll(redisKey);
  
  const jsonratingCounts = data.ratingCounts ? JSON.parse(data.ratingCounts) : {};

  const ratingCounts = Object.entries(jsonratingCounts).map(([key, value]) => ({
    rating: key,
    count: parseInt(value, 10), // Ensure the value is a number
  }));

  console.log("Verdict Count:", ratingCounts);

  return res.status(200).json(ratingCounts);
});


///// get the rating history

const fetchRatingHistory = asyncHandler(async (req, res) => {
    // 1. Get the handle from the request body
    const { handle } = req.query;

    console.log("fetching rating history of " + handle);

    // 2. Fetch the user's rating history from Codeforces API
    const APIresponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const responses = APIresponse.data.result;

    console.log(`Fetched ${responses.length} contest history from Codeforces`);

    let index = 0;

    const formattedRatings = responses.map(response =>  {
        const { contestId, contestName, rank, ratingUpdateTimeSeconds: date, oldRating, newRating } = response;
        
        index++;

        const formattedDate = new Date(date * 1000).toLocaleDateString("en-GB"); // "DD/MM/YYYY"

        return { date: formattedDate, newRating, index };
    });
    // 4. Return success response with rating history
    return res.status(200).json(formattedRatings);
});

export { fetchProblems, fetchRatingHistory, fetchSubmissionStats, fetchRatingCount};
