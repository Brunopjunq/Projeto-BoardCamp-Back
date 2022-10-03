import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsController.js";
import ValidateRentals from "../middleware/ValidateRentals.js";


const rentalsRouter = Router();

rentalsRouter.post('/rentals', ValidateRentals, postRental);
rentalsRouter.get('/rentals', getRentals);

export default rentalsRouter;