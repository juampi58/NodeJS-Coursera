var express= require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname= 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321')); //secret key

function auth (req,res,next){
  console.log(req.headers);
     //extract username and password from the req

  if (!req.signedCookies.user) {

  var authHeader = req.headers.authorization;
  if (!authHeader){
    var err = new Error('You are not authenticated');
    err.status = 401;
    next(err);
    return;
  }
  //split and decode the coded string
  var auth = new Buffer(authHeader.split(' ')[1],
     'base64').toString().split(':');
   var user = auth[0];
   var pass = auth[1];
   //check if user is allowed

   if (user == 'admin' && pass == 'admin') {
     res.cookie('user','admin',{signed:true});
     next();
   } else {
     var err = new Error('You are not authenticated');
     err.status = 401;
     next(err);
   }
 }
 else{
   if (req.signedCookies.user === 'admin') {
     console.log((req.signedCookies));
     next();
        }
        else {
          var err = new Error('You are not authenticated');
          err.status = 401;
          next(err);
        }
 }
}
app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next){
  res.writeHead(err.status||500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});


app.listen(port, hostname, function(){
  console.log(`server running at http://${hostname}:${port}/`);
});
