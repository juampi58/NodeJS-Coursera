var mongoose = require('mongoose'),
    assert= require('assert');

var Dishes = require('./models/dishes');

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
    image: 'jfjgjf',
    category: 'mnkyyi',
    lable:'',
    price:'34.21',
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
      .exec(function(err, dish){
        if (err) throw err;
        console.log('Updated dish!');
        console.log(dish);

        dish.comments.push({
          rating: 5,
          comment: 'getting sinking feeling',
          author: 'leo dicaprio'
        });

        dish.save(function (err, dish){
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
