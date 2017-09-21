var rect = require('./rectangle-2');

function solveRect(l,b){
  console.log('solving rectangle with l='+l+'and b= '+b);

 rect(l,b,function(err,rectangle){
   if (err) {
     console.log(err);
   }
   else {
     console.log('the area of the rectangle of dimensions length='+l+'and breath='+b+'is'+rectangle.area());
     console.log('the perimiter of the rectangle of dimensions length='+l+'and breath='+b+'is'+rectangle.perimeter());
   }
 });
}

solveRect(2,4);
solveRect(3,5);
solveRect(-1,4);
