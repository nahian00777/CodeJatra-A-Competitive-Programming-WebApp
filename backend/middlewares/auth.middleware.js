import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1. Get token from request
    // console.log(req.cookies);
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.accessToken ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : null);
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // 2. Decode token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3. Check if user exists
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Set user in request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
});
