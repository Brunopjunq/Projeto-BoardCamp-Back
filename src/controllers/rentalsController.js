import connection from "../database/db.js";
import dayjs from "dayjs";

export async function postRental(req,res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const game = await connection.query(`SELECT games.* FROM games WHERE games.id=$1`, [gameId]);
        const pricePerDay = game.rows[0].pricePerDay;
        const originalPrice = pricePerDay * daysRented;
        const rentDate = dayjs().format('YYYY-MM-DD');

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

