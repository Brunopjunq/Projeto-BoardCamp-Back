import { Router } from "express";
import { postGame } from "../controllers/gamesController.js";
import ValidateGames from "../middleware/ValidateGames.js";

const gamesRouter = Router();

gamesRouter.post('/games', ValidateGames, postGame);

export default gamesRouter;