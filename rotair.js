$(document).ready(function(){

var body = $('body');

var triangles = [
  {x: 40 ,y: 50  ,rotation : 20},
  {x: 101 ,y: 50  ,rotation : 0},
  {x: 200 ,y: 50  ,rotation : 175},
  {x: 312 ,y: 50  ,rotation : 20},
  {x: 450 ,y: 50  ,rotation : 20},
  {x: 612 ,y: 34  ,rotation : 20},
  {x: 714 ,y: 40  ,rotation : 30},
  {x: 912 ,y: 50  ,rotation : 191},
  {x: 852 ,y: 44  ,rotation : 20},
  {x: 972 ,y: 50  ,rotation : 20},
  {x: 1150 ,y: 50  ,rotation : 20},
  {x: 1221 ,y: 25  ,rotation : 131},
  {x: 1291 ,y: 20  ,rotation : 50},
  {x: 1480 ,y: 50  ,rotation : 158},
  {x: 1560 ,y: 50  ,rotation : 12},
  {x: 1050 ,y: 50  ,rotation : 197},
]
var triangleElements = [];
function addTrianglesTooDom(){
  for (var i = 0; i < triangles.length ; i ++){
    triangle = triangles[i];
    if (i % 2 == 1){
      placeTriangle(triangle.x,triangle.y,triangle.rotation,false);
    }else{
      placeTriangle(triangle.x,triangle.y,triangle.rotation,true);
    }
  }
}

function placeTriangle(x,y,rotation,color){
    div = $(document.createElement('div'));
    if (color){
      div.addClass('arrow-blue');
    }else{
      div.addClass('arrow-white');
    }
    div.css({'position' : 'absolute', left: x, bottom: y, transform: 'rotate(' + rotation + 'deg)'});
    triangleElements.push(div);
    body.append(div);
}

function startAnimation(){
  for(var i = 0 ; i < triangleElements.length; i ++){
   triangle = triangleElements[i];
   triangleprops = triangles[i];
   triangle.velocity({rotateZ: triangleprops.rotation},{duration: 0});
   triangle.velocity({bottom: 150}, {easing: [ 150, 10 ], duration: 2000 });
   triangle.velocity({rotateZ: 0}, { queue: false, duration: 2000 });
 }
}

function assembleBlades(){
   var middleofScreen = $(window).width()/2;
   var startx = middleofScreen;
   var starty = 200
   var ir = 360 / triangleElements.length;
   currentRotation = 0
   var triangleheight = 40;
   for(var i = 0 ; i < triangleElements.length; i ++){
     triangle = triangleElements[i];
     radians = (Math.PI / 180) * currentRotation;
     var x = triangleheight * Math.cos(radians);
     var y = triangleheight * Math.sin(radians);
     startx += x;
     starty += y;
     triangle.velocity({left: startx, bottom: starty });
     triangle.velocity({rotateZ: -currentRotation});
     currentRotation += ir;
 }
}

function rotateBlades(){
  blades = $('.unified-blades');
//  blades.velocity({rotateZ: '+=360'}, {loop: true, duration: 2000})
}
function unifyBlades(){
  div = $(document.createElement('div'));
  div.addClass( "unified-blades");
  for(var i = 0 ; i < triangleElements.length; i ++){
    div.append(triangleElements[i]);
  }
  body.append(div)
}
function main(){
  addTrianglesTooDom();
  startAnimation();
  assembleBlades();
  unifyBlades();
  rotateBlades();
}

main();


})
