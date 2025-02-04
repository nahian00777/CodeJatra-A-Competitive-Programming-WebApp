import { Router } from "express";
import { fetchProblems, fetchRatingHistory } from "../controllers/problems.controller.js";

const problemsRouter = Router();
problemsRouter.route("/fetchProblems").post(fetchProblems);

problemsRouter.route("/fetchRatingHistory").get(fetchRatingHistory);

export default problemsRouter;