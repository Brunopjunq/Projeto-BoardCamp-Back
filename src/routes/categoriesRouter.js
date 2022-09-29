import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categoriesController.js";
import ValidateCategories from '../middleware/ValidateCategories.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', ValidateCategories, postCategory);

export default categoriesRouter;