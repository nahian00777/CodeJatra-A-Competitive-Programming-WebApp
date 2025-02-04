import { Router } from "express";
import { fetchProblems, fetchRatingHistory, deleteProblems } from "../controllers/problems.controller.js";

const problemsRouter = Router();
problemsRouter.route("/fetchProblems").post(fetchProblems);

problemsRouter.route("/fetchRatingHistory").get(fetchRatingHistory);

problemsRouter.route("/delete").delete(deleteProblems);

export default problemsRouter;