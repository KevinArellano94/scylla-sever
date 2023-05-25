const express = require('express');
const cassandra = require('cassandra-driver');

const cluster = new cassandra.Client({
    contactPoints: [
        NODE_1,
        NODE_2,
        NODE_3
    ],
    localDataCenter: LOCALDATACENTER,
    credentials: {
        username: USERNAME,
        password: PASSWORD
    },
    keyspace: KEYSPACE
});

const router = express.Router();

// const items = [
//     {
//         id: 1,
//         name: "Buy groceries",
//         completed: false
//     },
//     {
//         id: 2,
//         name: "Study programming",
//         completed: false
//     }
// ]

router.get('/', async (req, res) => {
    const result = await cluster.execute(`
        SELECT * FROM items
    `);
    res.json({
        items: result.rows
    });
});

module.exports = router;