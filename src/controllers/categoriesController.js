import connection from '../database/db.js';

export async function getCategories(req,res) {
    try {
        const categories = await connection.query('SELECT * FROM categories');

        res.send(categories.rows);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postCategory(req,res) {
    const {name} = req.body;

    try {
        const categories = await connection.query('SELECT * FROM categories');

        if(categories.rows.some(category => category.name === name)){
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`,[name]);
        res.sendStatus(201);


    } catch (error) {
        res.sendStatus(500);
    }
}