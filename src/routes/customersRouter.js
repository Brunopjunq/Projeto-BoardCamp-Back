import { Router } from "express";
import { postCustomer } from "../controllers/customersController.js";
import ValidateCustomers from "../middleware/ValidateCustomers.js";

const customersRouter = Router();

customersRouter.post('/customers', ValidateCustomers, postCustomer);

export default customersRouter;