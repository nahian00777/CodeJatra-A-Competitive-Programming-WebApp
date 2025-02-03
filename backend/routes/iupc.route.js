import { Router } from "express";
import { getIUPCs, addIUPC } from "../controllers/iupc.controller.js";

const iupcRouter = Router();
iupcRouter.route("/get-iupc").get(getIUPCs);
iupcRouter.route("/add-iupc").post(addIUPC);

export default iupcRouter;
