var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the Database
mongoose.connect('mongodb://test:test00@ds155352.mlab.com:55352/todolist',{useNewUrlParser: true });

// Create a Schema - This is like a blue print.
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo =mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'Buy Flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('Item Saved!');
// });

//var data = [{item: 'I got a New Job'},{item: 'Let\'s meet at Coffee Shop'},{item: 'What are you doing Today'}];

var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    // Get Data from MongoDB and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add it to mongoDB
      var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json({todos: data});
      });
  });

  app.delete('/todo/:item', function(req, res){
    // Delete the Requested Item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteMany(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
