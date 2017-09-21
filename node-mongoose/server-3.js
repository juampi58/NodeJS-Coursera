var mongoose = require('mongoose'),
    assert= require('assert');

var Dishes = require('./models/dishes-3');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connected correctly to server');

  //create new dish
  Dishes.create({
    name: 'Uthapizza',
    description: 'test',
    comments: [
      {
        rating: 3,
        comment: 'this is insane',
        author: 'Matt Daemon'
      }
    ]
  }, function(err, dish){
    if (err) throw err;

    console.log('Dish created');
    console.log(dish);
    var id = dish._id;
    setTimeout(function () {
      Dishes.findByIdAndUpdate(id,{
        $set: {
          description: 'Update test'
        }
      }, {
        new:true
      })
      .exec(function(err, disha){
        if (err) throw err;
        console.log('Updated dish!');
        console.log(dish);

        disha.comments.push({
          rating: 5,
          comment: 'getting sinking feeling',
          author: 'leo dicaprio'
        });

        disha.save(function (err, dish){
          console.log('Updated comments!');
          console.log(dish);
        });

        db.collection('dishes').drop(function(){
          db.close();
      });
    },3000);
  });

  });
  });
