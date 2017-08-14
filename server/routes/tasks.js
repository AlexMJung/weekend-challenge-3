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
            client.query('Select * FROM todo ORDER by complete ASC;', function (errorMakingQuery, result) {
                done();//putting the connection back in the pool
                if (errorMakingQuery) {
                    console.log('there was an error Making the query(syntax error most likly):', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }//end of succesful connection else
            })//end of client.query   
        }//end of 1st child else statement
    })//end of pool.connect
})//end of router.get

//server connection to post a new task
router.post('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO todo (task, complete) VALUES ($1, $2)',[req.body.task, req.body.complete ], 
            function (errorMakingQuery, result) {
                done();//putting the connection back in the pool
                if (errorMakingQuery) {
                    console.log('there was an error Making the query(syntax error most likly):', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }//end of succesful connection else
            })//end of client.query   
        }//end of 1st child else statement
    })//end of pool.connect
})//end of router.post

router.delete('/:id', function (req, res) {
    var inputId = req.params.id;
    console.log(inputId);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("DELETE from todo where id = $1;",
                [inputId],
                function (errorMakingQuery, result) {
                    done();//putting the connection back in the pool
                    if (errorMakingQuery) {
                        console.log('there was an error Making the query(syntax error most likly):', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }//end of succesful connection else
                })//end of client.query   
        }//end of 1st child else statement
    })//end of pool.connect
})//end of router.delete

router.put('/:id', function (req, res) {
    var inputId = req.params.id;
    console.log(req.body.done)
    console.log('put was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("UPDATE todo SET complete='" + req.body.done + "' WHERE id = '" + inputId + "';",
                function (errorMakingQuery, result) {
                    done();//putting the connection back in the pool
                    if (errorMakingQuery) {
                        console.log('there was an error Making the query(syntax error most likly):', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }//end of succesful connection else
                })//end of client.query   
        }//end of 1st child else statement
    })//end of pool.connect

})//end of router.put

module.exports = router