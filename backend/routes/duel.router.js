import { Router } from "express";
import {
  createDuel,
  completeDuel,
  dropDuel,
  getDuel,
  acceptDuel,
  listUserDuels,
  cancelDuel,
  checkNewDuels,
  fetchDuelStats,
} from "../controllers/duel.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Assuming you have authentication middleware

const duelRouter = Router();

duelRouter.route("/createDuel").post(createDuel);
duelRouter.route("/completeDuel/:duelId").patch(completeDuel);
duelRouter.route("/dropDuel/:duelId").delete(dropDuel);
duelRouter.route("/getDuel/:duelId").get(getDuel);
duelRouter.route("/fetchDuelStats").get(fetchDuelStats);

// New routes
duelRouter.route("/acceptDuel/:duelId").patch(verifyJWT, acceptDuel);
duelRouter.route("/listUserDuels").get(verifyJWT, listUserDuels);
duelRouter.route("/cancelDuel/:duelId").delete(verifyJWT, cancelDuel);
duelRouter.route("/checkNew").get(verifyJWT, checkNewDuels); // Add this route

export default duelRouter;
