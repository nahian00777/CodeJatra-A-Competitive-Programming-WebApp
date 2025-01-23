import { asyncHandler } from "../utils/AsyncHandler.js";
import { IUPC } from "../models/iupc.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getIUPCs = asyncHandler(async (req, res) => {
  // 1. Fetch all IUPCs from the database
  const iupcs = await IUPC.find();

  // 2. Return success response with the IUPCs
  return res.status(200).json(new ApiResponse(200, iupcs));
});

export { getIUPCs };
