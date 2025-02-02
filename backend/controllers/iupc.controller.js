import { asyncHandler } from "../utils/AsyncHandler.js";
import { IUPC } from "../models/iupc.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getIUPCs = asyncHandler(async (req, res) => {
  // 1. Fetch all IUPCs from the database
  const iupcs = await IUPC.find();

  // 2. Return success response with the IUPCs
  return res.status(200).json(new ApiResponse(200, iupcs));
});

const addIUPC = asyncHandler(async (req, res) => {
  // 1. Get the IUPC data from the request body
  const { contestName, host, date, duration, location, platform } = req.body;

  // 2. Create a new IUPC document
  const iupc = new IUPC({
    contestName,
    host,
    date,
    duration,
    location,
    platform,
  });

  // 3. Save the IUPC document to the database
  await iupc.save();

  // 4. Return success response with the new IUPC
  return res.status(201).json(new ApiResponse(201, iupc));
});

export { getIUPCs, addIUPC };
