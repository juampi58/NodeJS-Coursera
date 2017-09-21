var rect = {
  perimeter: function(x,y){
    return (2*(x+y));
  },
  area: function(x,y){
    return(x*y);
  }
};

function solveRect(l,b){
  console.log('solving rectangle with l='+l+'and b= '+b);

  if (l<0 || b<0) {
    console.log('rectangle dimesions should be grater then 0: l='+l+'and b='+b);
  }
  else {
    console.log('the area of the rectangle of dimensions length='+l+'and breath='+b+'is'+rect.area(l,b));
    console.log('the perimiter of the rectangle of dimensions length='+l+'and breath='+b+'is'+rect.perimeter(l,b));
  }
}

solveRect(2,4);
solveRect(3,5);
solveRect(-1,4);
