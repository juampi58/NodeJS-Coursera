var express= require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname= 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(session({
  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
})); //secret key

function auth (req,res,next){
  console.log(req.headers);
     //extract username and password from the req

  if (!req.session.user) {

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
     req.session.user = 'admin';
     next();
   } else {
     var err = new Error('You are not authenticated');
     err.status = 401;
     next(err);
   }
 }
 else{
   if (req.session.user === 'admin') {
     console.log(('req.session: ', req.session));
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
