import connection from "../database/db.js";
import rentalsSchema from '../schemas/rentalsSchema.js';

export default async function ValidateRentals(req,res,next) {
    const validation = rentalsSchema.validate(req.body, {abortEarly: false});

    if(validation.error) {
        res.sendStatus(400);
        console.log(validation.error);
        return;
    }

    const CustomerExist = await connection.query(`SELECT * FROM customers WHERE id=$1`, [req.body.customerId]);
    if(CustomerExist.rows.length === 0) {
        return res.sendStatus(400);
    }

    const GameExist = await connection.query(`SELECT * FROM games WHERE id=$1`, [req.body.gameId]);
    if(GameExist.rows.length === 0) {
        return res.sendStatus(400);
    }

    const GameAvailable = await connection.query(`SELECT rentals.*, games."stockTotal" FROM rentals JOIN games ON games.id=rentals."gameId" WHERE rentals."returnDate" IS NULL`);

    if(GameAvailable.rowCount === 0) {
        return next();
    }

    if(GameAvailable.rows.length > GameAvailable.rows[0].stockTotal) {
        return res.sendStatus(400);
    }

    next();
}