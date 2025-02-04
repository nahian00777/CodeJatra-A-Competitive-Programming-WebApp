import { Router } from "express";
import { fetchProblems, fetchRatingCount, fetchRatingHistory, fetchSubmissionStats } from "../controllers/problems.controller.js";

const problemsRouter = Router();
problemsRouter.route("/fetchProblems").post(fetchProblems);

problemsRouter.route("/fetchRatingHistory").get(fetchRatingHistory);

problemsRouter.route("/fetchSubmissionStats").get(fetchSubmissionStats);

problemsRouter.route("/fetchRatingCount").get(fetchRatingCount);

export default problemsRouter;