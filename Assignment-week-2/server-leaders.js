var mongoose = require('mongoose'),
    assert= require('assert');

var Leaders = require('./models/leaders');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connected correctly to server');

  //create new leader
  Leaders.create({
    name: 'Juan',
    image: 'hahaha',
    designation: 'jajajaja',
    abbr:'hahahaha',
    description: 'test'
  }, function(err, leader){
    if (err) throw err;

    console.log('Leader created!');
    console.log(leader);
    var id = leader._id;
    setTimeout(function () {
      Leaders.findByIdAndUpdate(id,{
        $set: {
          description: 'Update test'
        }
      }, {
        new:true
      })
      .exec(function(err, leader){
        if (err) throw err;
        console.log('Updated leader');
        console.log(leader);

        db.collection('leaders').drop(function(){
          db.close();
      });
    },3000);
  });

  });
  });
