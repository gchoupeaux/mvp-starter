var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  username: String,
  description: String,
  crossed: Boolean,
  deleted: Boolean,
  dateCreated: String,//Date,
  dateCrossed: String,//Date,
  dateDeleted: String,//Date, 
});

var Todo = mongoose.model('Todo', itemSchema);

var read = function(callback) {
  // IT I WANT TO RETURN ONLY not deleted 'deleted':false
  Todo.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var write = function(todo, callback) {
  var row = new Todo(todo);
  row.save(function (err, row) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

var crossed = function(todo, callback) {
  var query = {'description':todo.description, 'username':todo.username};
  var newData = {$set:{'crossed':todo.crossed, 'dateCrossed': todo.dateCrossed}};
  Todo.findOneAndUpdate(query, newData, function(err, row){
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

var deleted = function(todo, callback) {

  // IT I WANT TO KEEP THE DELETED TODO IN DB
  // var query = {'description':todo.description, 'username':todo.username};
  // var newData = {$set:{'deleted':todo.deleted, 'dateDeleted': todo.dateDeleted}};
  // Todo.findOneAndUpdate(query, newData, function(err, row){
  //   if (err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, row);
  //   }
  // });

  var query = {'description':todo.description, 'username':todo.username};
  Todo.remove(query, function(err, row){
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });

};

module.exports.read = read;
module.exports.write = write;
module.exports.crossed = crossed;
module.exports.deleted = deleted;




