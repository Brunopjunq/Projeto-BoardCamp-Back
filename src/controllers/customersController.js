import connection from "../database/db.js";

export async function postCustomer(req,res) {
    const {name, phone, cpf, birthday} = req.body;

    try {
        await connection.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`, [name,phone,cpf,birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCustomers(req,res) {
    try {
        const customers = await connection.query('SELECT * FROM customers');
        res.send(customers.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getCustomer(req,res) {
    const {id} = req.params;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [id]);
        if(customer.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(customer.rows[0]);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updateCustomer(req,res) {
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;

    try {
        await connection.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name,phone,cpf,birthday,id]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}