var express = require('express');
var todoController = require('./controllers/todocontroller');

var app = express();

// Set up Template Engine
app.set('view engine', 'ejs');

// Static File
app.use(express.static('./public'));


// fire controllers
todoController(app);

// Listen To Port
app.listen(3000);
console.log('You are listening to port 3000');
