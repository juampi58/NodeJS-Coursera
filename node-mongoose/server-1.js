var mongoose = require('mongoose'),
    assert= require('assert');

var Dishes = require('./models/dishes-1');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connected correctly to server');

  //create new dish
  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'test'
  });
  //save dish
  newDish.save(function(err){
    if(err) throw err;

    console.log('Dish created!');

    //get all the Dishes
    Dishes.find({}, function (err,dishes){
      if(err) throw err;

      console.log(dishes);

      db.collection('dishes').drop(function(){
        db.close();
      });
    });
  });

});
