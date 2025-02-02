import { Router } from "express";
import { fetchProblems } from "../controllers/problems.controller.js";

const problemsRouter = Router();
problemsRouter.route("/fetchProblems").post(fetchProblems);

export default problemsRouter;