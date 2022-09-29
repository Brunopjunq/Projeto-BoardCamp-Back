import categoriesSchema from '../schemas/categoriesSchema.js';

export default function ValidateCategories(req,res,next) {
    const validation = categoriesSchema.validate(req.body, {abortEarly: true});
    
    if(validation.error) {
        res.sendStatus(400);
        return;
    }

    next();
}