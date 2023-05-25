const express = require('express');
const cassandra = require('cassandra-driver');

const NODE_1 = 'node-0.aws_us_east_1.f8524ca79ecfb383ac83.clusters.scylla.cloud';
const NODE_2 = 'node-1.aws_us_east_1.f8524ca79ecfb383ac83.clusters.scylla.cloud';
const NODE_3 = 'node-2.aws_us_east_1.f8524ca79ecfb383ac83.clusters.scylla.cloud';
const LOCALDATACENTER = 'AWS_US_EAST_1';
const USERNAME = 'scylla';
const PASSWORD = 'hIDbWvexa57mu3s';
const KEYSPACE = 'mykeyspace';

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