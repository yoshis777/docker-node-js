var { Client } = require('pg');
require('dotenv').config();

var client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

client.connect();

const query = {
    text: 'INSERT INTO "public"."tests" ("code", "name", "price") VALUES ($1, $2, $3)',
    values: ['6000', 'TAX', '20000']
};

client.query(query)
    .then(res => {
        console.log(res);
        client.end(console.log('Closed client connection'));
    })
    .catch(err => {
        console.error(err.stack);
        client.end(console.log('Closed client connection'));
    });
