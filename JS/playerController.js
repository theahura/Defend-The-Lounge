var larry

var larryWidth = 90
var larryHeight = 50

var dx = 0
var dy = 0
var movePerFrame = 25

function Larry(x, y)
{
  this.xLocation = x
  this.yLocation = y

  this.xBottom = this.xLocation + 40
  this.yBottom = this.yLocation + 90

  this.isDead = false

  this.imgE = document.getElementById("larryE")
  this.imgN = document.getElementById("larryN")
  this.imgW = document.getElementById("larryW")
  this.imgS = document.getElementById("larryS")
  this.direction = "E"
}

//paints a specific ganesh
//@param: larryObj; Ganesh; the ganesh that is being painted
function paintLarry(larryObj)
{
  if (larryObj.isDead)
  {
    
  }
  else
  {
    if(larryObj.direction == "E")
      ctx.drawImage(larryObj.imgE, larryObj.xLocation, larryObj.yLocation)
    else if(larryObj.direction == "N")
      ctx.drawImage(larryObj.imgN, larryObj.xLocation, larryObj.yLocation)
    else if(larryObj.direction == "W")
      ctx.drawImage(larryObj.imgW, larryObj.xLocation, larryObj.yLocation)
    else 
      ctx.drawImage(larryObj.imgS, larryObj.xLocation, larryObj.yLocation)
  }
}

function spawnLarry(x, y)
{
  larry = new Larry(x, y)
}

//needs to be modified
$(document).keydown(function(e){
  var key = e.which;
  if(key == "37") dx = -1; 
  if(key == "38") dy = -1;
  if(key == "39") dx = 1;
  if(key == "40") dy = 1;
})

$(document).keyup(function(e){
  var key = e.which;
  if(key == "37") dx = 0; 
  if(key == "38") dy = 0;
  if(key == "39") dx = 0;
  if(key == "40") dy = 0;
})

function moveLarry(larryObj)
{
  if(larryObj.isDead)
    return

  //rotations
  if(dx > 0)
  {
    larryObj.direction = "E"
    this.xBottom = this.xLocation + 40    
    this.yBottom = this.xLocation + 90    
  }
  else if (dx < 0)
  {
    larryObj.direction = "W"
    this.xBottom = this.xLocation + 40
    this.yBottom = this.xLocation + 90    
  }
  else if (dy > 0)
  {
    larryObj.direction = "S"
    this.xBottom = this.xLocation + 90
    this.yBottom = this.xLocation + 40  
  }
  else if (dy < 0)
  {
    larryObj.direction = "N"
    this.xBottom = this.xLocation + 90
    this.yBottom = this.xLocation + 40  
  }

  //do movement here
  larryObj.xLocation += dx*movePerFrame;
  larryObj.yLocation += dy*movePerFrame;

  if(checkHitboxes(larryObj))
  {
    larryObj.xLocation -= dx*movePerFrame;
    larryObj.yLocation -= dy*movePerFrame;
  }

}