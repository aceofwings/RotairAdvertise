$(document).ready(function(){

var body = $('body');
var airBladeLocator = $('.air');
rotairchars = $('.text').blast({ delimiter: "character" })
rotairchars.css({opacity:0});
var airblades =[];
var airbladeValues = [];
var liftOff = false;
var offpage = false;
//
// $("#air-blade")
//     .delay(500).velocity({ translateX: 100, translateY: 10 })
//

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
   triangle.velocity({bottom: 150}, {easing: [ 150, 10 ], duration: 2000 ,delay : 250});
   triangle.velocity({rotateZ: 0}, { queue: false, duration: 2000 });
 }
}

function assembleBlades(){
   var middleofScreen = $(window).width()/2;
   var startx = middleofScreen;
   var starty = 200
   var ir = 360 / triangleElements.length;
   var currentRotation = 0
   var triangleheight = 40;
   for(var i = 0 ; i < triangleElements.length; i ++){
     triangle = triangleElements[i];
     radians = (Math.PI / 180) * currentRotation;
     var x = triangleheight * Math.cos(radians);
     var y = triangleheight * Math.sin(radians);
     startx += x;
     starty += y;
     triangles[i].x = startx;
     triangles[i].y = starty;
     triangle.velocity({left: startx, bottom: starty});
     triangle.velocity({rotateZ: -currentRotation},{complete : function(element){
       if (triangleElements[triangleElements.length -1][0] == $(element)[0]){
         positionAirBlades();
         rotateBlades(600);
       }
     }});
     currentRotation += ir;
 }


}
function positionAirBlades(){
    var currentRotation = 180;
    airblade = $(airBladeLocator);
    for( var i = 0 ; i < triangleElements.length; i ++){
      var cp = airblade.clone();
      var position = triangles[i];
      cp.css({opacity: 0,'position' : 'absolute', left: position.x - 80, bottom: position.y - 40});
      $(cp).velocity({rotateZ: currentRotation},{queue: false, duration: 0})
      value = {rotatation : currentRotation , left: position.x - 80, bottom: position.y - 40 }
      currentRotation -= 22.5;
      body.append(cp);
      airbladeValues.push(value);
      airblades.push(cp);
    }

    //airblade.velocity({x: 1000, y: 50})
}
function beginAirbladeAnimation(speed){
  for (var cow = 0 ; cow < airblades.length; cow++){
    var blade = airblades[cow];
    var value = airbladeValues[cow];
    if(speed < 100){
      $(blade).velocity({ translateX: 0, translateY: [-90,0] , opacity: 1, easing:"linear"},{queue: false,duration : 200, delay: cow * 50});
    }else if(speed <150){
      $(blade).velocity({ translateX: 0, translateY: [-90,0] , opacity: 1, easing:"linear"},{queue: false,duration : 300,delay: cow * 50});
    }else if(speed <300 ){
      $(blade).velocity({ translateX: 0, translateY: [-90,0] , opacity: 1, easing:"linear"},{queue: false,duration : 300,delay: cow * 50});
    }else{
      $(blade).velocity({ translateX: 0, translateY: [-90,0] , opacity: 1, easing:"linear"},{queue: false, duration : 400,delay: cow * 50});

    }
  }
}
function rotateBlades(speed){
  if(offpage){
    return;
  }
  if ( speed < 40){
    liftOff = true;
    speed = 40;
  }
  var first = triangles[0];
  for(var i = 0 ; i < triangleElements.length  ; i ++){
    triangles[i] = triangles[(i + 1 ) % 16];
  }
  triangles[15] = first;
  for(var i = 0 ; i < triangleElements.length ; i ++){
    triangleNextAttributes = triangles[i];
    triangle = triangleElements[i];
    triangle.velocity({left: triangleNextAttributes.x, bottom: triangleNextAttributes.y,rotateZ: "-=" + 22.5}, {duration: speed
    , easing: "linear",complete: function(element){
      if (triangleElements[triangleElements.length -1][0] == $(element)[0]){
        if(speed < 50){
          rotateBlades(speed - 1)
          if (!liftOff){
            beginAirbladeAnimation(speed);
          }else{
            removeAirblades()
          }
        }else if(speed < 150){
          rotateBlades(speed - 4);
          beginAirbladeAnimation(speed);
        }else if (speed < 300) {
          rotateBlades(speed - 40);
          beginAirbladeAnimation(speed);
        }else{
          rotateBlades(speed - 100);
          beginAirbladeAnimation(speed);
        }

      }
    }});
  }
}
function unifyBlades(){
  div = $(document.createElement('div'));
  div.addClass( "unified-blades");
  for(var i = 0 ; i < triangleElements.length; i++){
    div.append(triangleElements[i]);
  }
  body.append(div)
}
function liftingOff(){
  for(var i = 0 ; i < triangleElements.length ; i ++){
   triangles[i].y += 4;
  }
  if(triangles[15].y > 1000){
    offpage = true;
    return
  }
  window.setTimeout(liftingOff, 10);
}
function removeAirblades(){
  for(var i = 0 ; i < triangleElements.length ; i ++){
    blade = airblades[i];
    $(blade).velocity({opacity : 0},{queue:false, duration: 200})
  }
}
function checkLiftOff() {
    if(liftOff == false) {
       window.setTimeout(checkLiftOff, 10); /* this checks the flag every 100 milliseconds*/
    } else {
      removeAirblades();
      liftingOff()
    }
}
function textShow(){
rotairchars.each(function(i){
  $(this).css({opacity: 0})
  $(this).velocity({opacity : 1}, {delay: i * 40});
});
}
function textHide(){
  rotairchars.each(function(i){
    $(this).velocity({opacity : 0}, {delay: i * 40});
  });
}

function main(){
  addTrianglesTooDom();
  startAnimation();
  assembleBlades();
  unifyBlades();
  checkLiftOff();
  setTimeout(textShow, 2200);
  setTimeout(textHide, 6000);
}

main();


})
