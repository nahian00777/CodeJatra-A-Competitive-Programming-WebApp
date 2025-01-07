import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// connect to mongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database: ", error.message);
}

app.listen(PORT, () => {
  console.log(`Example of listening at http://localhost:${PORT}`);
});
