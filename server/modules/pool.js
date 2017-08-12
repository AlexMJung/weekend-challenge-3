var pg = require('pg');

var config = {
    database: 'weekend-challenge-3',
    host: 'localhost',
    ports: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

module.exports=pg.Pool(config);