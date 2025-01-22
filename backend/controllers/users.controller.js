import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  // 1. get user information from req.body
  // 2. validate user information
  // 3. check if user already exists
  // 4. check for avatar and coverImage
  // 5. upload avatar and coverImage on cloudinary
  // 6. check if avatar and coverImage uploaded successfully
  // 7. create user object in database
  // 8. check for user object creation
  // 9. return success response

  // 1st step :
  const { fullName, email, username, password } = req.body;
  // 2nd step :
  if (
    [fullName, email, username, password].some((field) => !field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // 3rd step :
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(405, "User already exists");
  }
  // 4th step :
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // let coverImageLocalPath;
  // if (req.files && req.files.coverImage.length > 0) {
  //   coverImageLocalPath = req.files?.coverImage[0]?.path;
  // }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  // 5th step :
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // 6th step :
  if (!avatar) {
    throw new ApiError(500, "Avatar upload failed");
  }
  // 7th step :
  const user = await User.create({
    fullName: fullName,
    email: email,
    username: username.toLowerCase(),
    password: password,
    avatar: avatar.url,
    // coverImage: coverImage?.url || "",
  });

  // 8th step :
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }
  // 9th step :
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  /*
    1. get user information from req.body
    2. check
    3. check user exists or not
    4. password validation
    5. generate access token and refresh token
    6. refresh token store in database
    7. cookies save refresh token and access token
    8. return success response
  */
  // 1st step :
  const { username, password, email } = req.body;
  // 2nd step:
  if (!username && !email) {
    throw new ApiError(400, "Email or username is required");
  }

  // 3rd step :
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 4th step :
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // 5th step :
  const accessToken = await user.generateAccessToken();

  const refreshToken = await user.generateRefreshToken();

  // 6th step :
  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false,
  });

  // hadling error
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "User login failed");
  }

  // cookies can be accessed by only backend user
  const options = await {
    httpOnly: true,
    secure: true,
  };

  // 7th && 8th step :
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = async (req, res) => {
  /*
  1. find the user
  2. update its refresh token to null
  3. clear the cookies
  4. return success response
  */

  // 1st step & 2nd step :
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  // 3rd step & 4th step :
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  /*
    1. access toke expire --> refresh toke expire ?
    2. refresh token --> access token
    3. return success response
    */
  const incomingRefreshToken = req.cookies.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(404, "Invalid refresh token");
  }

  if (incomingRefreshToken != user.refreshToken) {
    throw new ApiError(401, "Refresh Token is invalid");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false,
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Token refreshed successfully"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword != confirmPassword) {
    throw new ApiError(400, "Password and confirm password do not match");
  }

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User found successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body;

  if (!fullName || !email || !username) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName: fullName,
        email: email,
        username: username,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "User update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "User update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(500, "Cover image upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "User update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
};
