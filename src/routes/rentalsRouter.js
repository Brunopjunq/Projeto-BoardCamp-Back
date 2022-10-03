import { Router } from "express";
import { deleteRental, finishRental, getRentals, postRental } from "../controllers/rentalsController.js";
import ValidateRentals from "../middleware/ValidateRentals.js";


const rentalsRouter = Router();

rentalsRouter.post('/rentals', ValidateRentals, postRental);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;