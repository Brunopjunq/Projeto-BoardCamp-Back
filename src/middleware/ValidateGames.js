import connection from '../database/db.js';
import gamesSchema from '../schemas/gamesSchema.js';

export default async function ValidateGames(req,res,next){
    const validation = gamesSchema.validate(req.body, {abortEarly: false});

    if(validation.error) {
        res.sendStatus(400);
        console.log(validation.error);
        return;
    }

    const { name, categoryId } = req.body;

    try {
        const category = await connection.query("SELECT id from categories WHERE id=$1", [categoryId]);

        const repeatName = await connection.query("SELECT id from games WHERE name=$1", [name]);
    
        if(category.rows.length === 0) {
            return res.sendStatus(400);
            
        }

        if(repeatName.rows.length !== 0) {
            return res.sendStatus(409);
        }

        next();
    
    } catch (error) {

        res.sendStatus(500);
        console.log(error);
    }
}