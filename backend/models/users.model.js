import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true, // URL
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // duelRatingHistory: [
    //   {
    //     rating: { type: Number, required: true },
    //     date: { type: Date, default: Date.now },
    //   },
    // ],
    ratingHistory: [
      {
        rating: { type: Number, default: 1500 },
        date: { type: Date, default: Date.now },
      },
    ],
    verdictHistory: {
      Accepted: { type: Number, default: 0 },
      WRONG_ANSWER: { type: Number, default: 0 },
      Others: { type: Number, default: 0 },
      TIME_LIMIT_EXCEEDED: { type: Number, default: 0 },
      MEMORY_LIMIT_EXCEEDED: { type: Number, default: 0 },
    },
    refreshToken: {
      type: String,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
