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

export async function getRentals(req,res) {
    const { customerId, gameId } = req.query;

    try {
        const {rows: rentals} = await connection.query(`SELECT 
        rentals.*,
        customers.name AS "customerName",
        customers.id AS "customerId",
        games.id AS "gameId",
        games.name AS "gameName", 
        categories.name AS "categoryName", 
        categories.id AS "categoryId" 
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        ${customerId ? `WHERE customers.id = ${parseInt(customerId)}` : ""}
        ${gameId ? `WHERE games.id = ${parseInt(gameId)}` : ""}`);

        const rentalsformat = rentals.map((rental) => {
            const rentalmod = {
                ...rental,
                rentDate: dayjs(rental.rentDate).format("YYYY-MM-DD"),
                customer: {
                    id: rental.customerId,
                    name: rental.customerName,
                  },
                  game: {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName,
                  }
            }

            delete rentalmod.customerId;
            delete rentalmod.customerName;
            delete rentalmod.gameId;
            delete rentalmod.gameName;
            delete rentalmod.categoryId;
            delete rentalmod.categoryName;
      
            return rentalmod;

        })

        res.send(rentalsformat);
        
    } catch (error) {
        res.sendStatus(500);
    }
}