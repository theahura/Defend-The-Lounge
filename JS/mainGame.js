//image vars
var img = document.getElementById("background");

//framerate
frame = 30

//Canvas stuff
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

//Lets save the cell width in a variable for easy control
var cw = 10;


//Array containing all of the hitboxes
var hitBoxes = []

//topx and topy are the topleft corner of the box
//bottomx and bottomy are the bottomleft corner of the box
function Hitbox(topX, topY, bottomX, bottomY)
{
  this.topX = topX
  this.topY = topY
  this.bottomX = bottomX
  this.bottomY = bottomY

  this.isTouching(x, y)
  {
    if(x > topX && x < bottomX && y > topY && y < bottomY)
      return true
    return false
  }
}

//goes through and checks all hitboxes for x and y, returns true if something is hit
function checkHitboxes(x, y)
{
  for(var i = 0; i < hitBoxes.length; i++)
  {
    if(hitBoxes[i].isTouching(x,y))
      return true
    return false
  }
}

function init()
{ 
  spawnGanesh(50, 50)
  spawnLarry(200, 200)

  if(typeof game_loop != "undefined") clearInterval(game_loop);
  game_loop = setInterval(paint, frame);
}

init();

//Lets paint the snake now
function paint()
{
	//Background
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

  ctx.drawImage(background,0,0);

	//move ganeshes
	updateGoals(larry.xLocation, larry.yLocation)
	moveGaneshes()
	paintGaneshes()

	//move larry
	moveLarry(larry)
	paintLarry(larry)
}

$(document).keydown(function(e){
  var key = e.which;
  // press escape to menu
  if(key == "27") {
    clearInterval(game_loop);
    // $(document.body).toggleClass('.ex'); // display menu on esc
  }
});
