var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var tasks = require('./routes/tasks.js');

var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

//all requests go to route tasks
app.use('/tasks', tasks);

//server listening
app.listen(port, function(){
    console.log('server listening on port:' , port);
})