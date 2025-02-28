import express from "express";
import cors from "cors";
import userRouter from "./routes/users.route.js";
import cookieParser from "cookie-parser";
import iupcRouter from "./routes/iupc.route.js";
import problemsRouter from "./routes/problems.route.js";
import duelRouter from "./routes/duel.router.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/iupcs", iupcRouter);
app.use("/api/v1/problems", problemsRouter);
app.use("/api/v1/duel", duelRouter);
// app.use("api/v1/video", videoRouter);
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.static("public"));

export default app;
