import { Router } from "express";
import { postRental } from "../controllers/rentalsController.js";
import ValidateRentals from "../middleware/ValidateRentals.js";


const rentalsRouter = Router();

rentalsRouter.post('/rentals', ValidateRentals, postRental);

export default rentalsRouter;