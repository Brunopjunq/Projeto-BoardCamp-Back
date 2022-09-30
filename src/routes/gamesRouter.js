import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesController.js";
import ValidateGames from "../middleware/ValidateGames.js";

const gamesRouter = Router();

gamesRouter.post('/games', ValidateGames, postGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;