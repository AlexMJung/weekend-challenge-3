var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

//server connection to display tasks
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('Select * FROM todo;', function (errorMakingQuery, result) {
                done();//putting the connection back in the pool
                if (errorMakingQuery) {
                    console.log('there was an error Making the query(syntax error most likly:', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }//end of succesful connection else
            })//end of client.query   
        }//end of 1st child else statement
    })//end of pool.connect

})//end of router.get



module.exports = router