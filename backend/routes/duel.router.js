import { Router } from "express";
import { createDuel, completeDuel, dropDuel } from "../controllers/duel.controller.js";

const duelRouter = Router();

duelRouter.route("/createDuel").post(createDuel);
duelRouter.route("/completeDuel/:duelId").patch(completeDuel);
// duelRouter.route("/drop-duel/:duelId").delete(dropDuel);

export default duelRouter;