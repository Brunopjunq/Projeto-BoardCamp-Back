import { Router } from "express";
import { getCustomer, getCustomers, postCustomer, updateCustomer } from "../controllers/customersController.js";
import ValidateCustomers from "../middleware/ValidateCustomers.js";

const customersRouter = Router();

customersRouter.post('/customers', ValidateCustomers, postCustomer);
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.put('/customers/:id', ValidateCustomers, updateCustomer);

export default customersRouter;