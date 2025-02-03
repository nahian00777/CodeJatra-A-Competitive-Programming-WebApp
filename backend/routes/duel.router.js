import { Router } from "express";
import {
  createDuel,
  completeDuel,
  dropDuel,
  getDuel,
} from "../controllers/duel.controller.js";

const duelRouter = Router();

duelRouter.route("/createDuel").post(createDuel);
duelRouter.route("/completeDuel/:duelId").patch(completeDuel);
duelRouter.route("/dropDuel/:duelId").delete(dropDuel);
duelRouter.route("/getDuel/:duelId").get(getDuel);

export default duelRouter;
