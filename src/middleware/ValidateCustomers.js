import connection from "../database/db.js";
import customersSchema from '../schemas/customersSchema.js';

export default async function ValidateCustomers(req,res,next) {
    const validation = customersSchema.validate(req.body, {abortEarly: true});

    if(validation.error) {
        res.sendStatus(400);
        return;
    }

    const {cpf} = req.body;

    try {
        const customers = await connection.query('SELECT cpf FROM customers WHERE cpf=$1',[cpf]);

        if(customers.rows.length !== 0) {
            return res.sendStatus(409);
        }

        next();

    } catch (error) {
        res.sendStatus(500);
    }
}