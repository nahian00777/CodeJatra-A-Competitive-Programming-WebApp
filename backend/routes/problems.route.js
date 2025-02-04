import { Router } from "express";
import { fetchProblems, fetchRatingCount, fetchRatingHistory, fetchSubmissionStats, deleteProblems } from "../controllers/problems.controller.js";

const problemsRouter = Router();
problemsRouter.route("/fetchProblems").post(fetchProblems);

problemsRouter.route("/fetchRatingHistory").get(fetchRatingHistory);

problemsRouter.route("/delete").delete(deleteProblems);
problemsRouter.route("/fetchSubmissionStats").get(fetchSubmissionStats);

problemsRouter.route("/fetchRatingCount").get(fetchRatingCount);

export default problemsRouter;