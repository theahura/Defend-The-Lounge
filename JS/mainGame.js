var game_loop

//image vars
var img = document.getElementById("background");

//framerate
var frame = 30
var frameCount = 0

//Canvas stuff
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

//Lets save the cell width in a variable for easy control
var cw = 10;


//Array containing all of the hitboxes
var hitBoxes = []

var round = 1
var spawnCount = 1
var toggle = false

//topx and topy are the topleft corner of the box
//bottomx and bottomy are the bottomleft corner of the box
function Hitbox(topX, topY, bottomX, bottomY)
{
  this.topX = topX
  this.topY = topY
  this.bottomX = bottomX
  this.bottomY = bottomY

  //assumes obj has: xLocation, yLocation, xBottom, yBottom
  this.isTouching= function(obj)
  {
    if( (obj.xLocation >= this.topX && obj.xLocation <= this.bottomX && obj.yLocation >= this.topY && obj.yLocation <= this.bottomY) 
      || (obj.xLocation >= this.topX && obj.xLocation <= this.bottomX && obj.yBottom >= this.topY && obj.yBottom <= this.bottomY)
      || (obj.xBottom >= this.topX && obj.xBottom <= this.bottomX && obj.yLocation >= this.topY && obj.yLocation <= this.bottomY)
      || (obj.xBottom >= this.topX && obj.xBottom <= this.bottomX && obj.yBottom >= this.topY && obj.yBottom <= this.bottomY) )
    {
      // console.log(obj.xLocation + " " + obj.yLocation + " " + obj.xBottom + " " + obj.yBottom)
      return true
    }
    return false
  }
}

function getLarryPosition()
{
  return {x: larry.xLocation, y: larry.yLocation}
}

//goes through and checks all hitboxes for x and y, returns true if something is hit
function checkHitboxes(obj)
{
  for(var i = 0; i < hitBoxes.length; i++)
  {
    if(hitBoxes[i].isTouching(obj))
    {
      // console.log(i)
      return true
    }
  }
  return false
}

function init()
{ 
  window.scrollTo(1000, 1000)

  hitBox1 = new Hitbox(10, 210, 1625, 320)
  hitBox2 = new Hitbox(10, 210, 180, 640)
  hitBox3 = new Hitbox(10, 210, 80, 1740)
  hitBox4 = new Hitbox(80, 820, 180, 1340)
  hitBox5 = new Hitbox(80, 1740, 130, 1885)
  hitBox6 = new Hitbox(130, 1885, 1979, 1950)
  hitBox7 = new Hitbox(1430, 1810, 1970, 1950)
  hitBox8 = new Hitbox(1930, 210, 1970, 1950)
  hitBox9 = new Hitbox(1790, 670, 1930, 1580)
  hitBox10 = new Hitbox(1650, 840, 1930, 1580)
  hitBox11 = new Hitbox(1770, 1580, 1780, 1935)
  hitBox12 = new Hitbox(10, 210, 240, 400)
 

  hitBoxes.push(hitBox1)
  hitBoxes.push(hitBox2)
  hitBoxes.push(hitBox3)
  hitBoxes.push(hitBox4)
  hitBoxes.push(hitBox5)
  hitBoxes.push(hitBox6)
  hitBoxes.push(hitBox7)
  hitBoxes.push(hitBox8)
  hitBoxes.push(hitBox9)
  hitBoxes.push(hitBox10)
  hitBoxes.push(hitBox11)
  hitBoxes.push(hitBox12)


  spawnGanesh(50, 50)
  spawnLarry(1000, 1000)

  if(typeof game_loop != "undefined") clearInterval(game_loop);
  game_loop = setInterval(paint, frame);
}

init();

//Lets paint the snake now
function paint()
{
  if (frameCount == frame*1000)
  {
    frameCount = 0
  }

  frameCount++
  //Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  ctx.drawImage(background,0,0)

  if(ganeshArray.length <= 0)
  {
    roundEnd()
  }

  if(frameCount % 30 == 0 && spawnCount < round)
  {
    spawnCount++
    spawnGanesh(-50, 50)
  }

  //move ganeshes
  updateGoals(larry.xLocation, larry.yLocation)
  moveGaneshes()
  paintDeadGaneshes()
  paintGaneshes()

  //move larry
  moveLarry(larry)
  paintLarry(larry)

  //scroll if needed
  scrollPage(larry.xLocation, larry.yLocation)
}

$(document).keydown(function(e){
  var key = e.which;
  // press escape to menu
  if(key == "27") {
    toggle = !toggle;
    $('.esc-menu').toggle(); // display menu on esc
    if (toggle == true) {
      clearInterval(game_loop)
    } else if (toggle == false)  {
      game_loop = setInterval(paint, frame);
    }
  }
});

function roundEnd()
{
  round++
  frameCount = 0
  spawnCount = 0

  q = "WINNER"; // search query
  
  request = new XMLHttpRequest;
  request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      data = JSON.parse(request.responseText).data.image_url;
      console.log(data);
      document.getElementById("giphyme").innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
      $("#giphyme").find("img").show()
    } else {
      console.log('reached giphy, but API returned an error');
     }
  };
 
  request.onerror = function() {
    console.log('connection error');
  };
 
  request.send();
}
