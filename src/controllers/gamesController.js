import connection from "../database/db.js";

export async function getGames(req,res) {
    try {

        //FALTA A PARTE DE QUERY
        const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;');

        res.send(games.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }


}

export async function postGame(req,res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const games = await connection.query('SELECT * FROM games');

        if(games.rows.some(game => game.name === name)) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [name,image,stockTotal,categoryId,pricePerDay]);
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}