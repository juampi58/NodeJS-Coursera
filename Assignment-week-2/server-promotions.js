var mongoose = require('mongoose'),
    assert= require('assert');

var Promotions = require('./models/promotions');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connected correctly to server');

  //create new dish
  Promotions.create({
    name: 'super',
    image: 'orotot',
    label:'',
    price:'345.3',
    description: 'test'
  }, function(err, promotion){
    if (err) throw err;

    console.log('Promotion created!');
    console.log(promotion);
    var id = promotion._id;
    setTimeout(function () {
      Promotions.findByIdAndUpdate(id,{
        $set: {
          description: 'Update test'
        }
      }, {
        new:true
      })
      .exec(function(err, promotion){
        if (err) throw err;
        console.log('Updated promotion!');
        console.log(promotion);

        db.collection('promotions').drop(function(){
          db.close();
      });
    },3000);
  });

  });
  });
