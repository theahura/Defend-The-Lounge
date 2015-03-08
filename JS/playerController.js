var larry

var larryWidth = 90
var larryHeight = 50

var dx = 0
var dy = 0
var movePerFrame = 25

function Larry(x, y)
{
  this.punchCount = 0

  this.xLocation = x
  this.yLocation = y

  this.xBottom = this.xLocation + 40
  this.yBottom = this.yLocation + 90

  this.isDead = false

  this.imgE = document.getElementById("larryE")
  this.imgN = document.getElementById("larryN")
  this.imgW = document.getElementById("larryW")
  this.imgS = document.getElementById("larryS")

  this.imgPE = document.getElementById("larryPE")
  this.imgPN = document.getElementById("larryPN")
  this.imgPW = document.getElementById("larryPW")
  this.imgPS = document.getElementById("larryPS")

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
    {
      if(larryObj.punchCount > 0)
      {
        ctx.drawImage(larryObj.imgPE, larryObj.xLocation, larryObj.yLocation)
        larryObj.punchCount--
      }
      else
        ctx.drawImage(larryObj.imgE, larryObj.xLocation, larryObj.yLocation)
    }
    else if(larryObj.direction == "N")
    {
      if(larryObj.punchCount > 0)
      {
        ctx.drawImage(larryObj.imgPN, larryObj.xLocation, larryObj.yLocation)
        larryObj.punchCount--
      }
      else
        ctx.drawImage(larryObj.imgN, larryObj.xLocation, larryObj.yLocation)
    }
     else if(larryObj.direction == "S")
    {
      if(larryObj.punchCount > 0)
      {
        ctx.drawImage(larryObj.imgPS, larryObj.xLocation, larryObj.yLocation)
        larryObj.punchCount--
      }
      else
        ctx.drawImage(larryObj.imgS, larryObj.xLocation, larryObj.yLocation)
    }
    else
    {
      if(larryObj.punchCount > 0)
      {
        ctx.drawImage(larryObj.imgPW, larryObj.xLocation, larryObj.yLocation)
        larryObj.punchCount--
      }
      else
        ctx.drawImage(larryObj.imgW, larryObj.xLocation, larryObj.yLocation)
    }
  }
}

function spawnLarry(x, y)
{
  larry = new Larry(x, y)
}

//needs to be modified
$(document).keydown(function(e){
  var key = e.which;
  if(key == "65") dx = -1; 
  if(key == "87") dy = -1;
  if(key == "68") dx = 1;
  if(key == "83") dy = 1;

  if(key == "37") 
  {
    larry.direction = "W"
    this.xBottom = this.xLocation + 40
    this.yBottom = this.xLocation + 90
    larry.punchCount = 3; 
    checkDeadGanesh("W", larry)   
  } 
  if(key == "38")
  {
    larry.direction = "N"
    this.xBottom = this.xLocation + 90
    this.yBottom = this.xLocation + 40  
    larry.punchCount = 3;
    checkDeadGanesh("N", larry)    
  }
  if(key == "39") 
  {
    larry.direction = "E"
    this.xBottom = this.xLocation + 40    
    this.yBottom = this.xLocation + 90
    larry.punchCount = 3; 
    checkDeadGanesh("E", larry)     
  }
  if(key == "40")
  {
    larry.direction = "S"
    this.xBottom = this.xLocation + 90
    this.yBottom = this.xLocation + 40 
    larry.punchCount = 3;  
    checkDeadGanesh("S", larry)   
  }
})

$(document).keyup(function(e){
  var key = e.which;
  if(key == "65") dx = 0; 
  if(key == "87") dy = 0;
  if(key == "68") dx = 0;
  if(key == "83") dy = 0;
})


function moveLarry(larryObj)
{
  if(larryObj.isDead)
    return

  //do movement here
  larryObj.xLocation += dx*movePerFrame;
  larryObj.yLocation += dy*movePerFrame;
  larryObj.xBottom += dx*movePerFrame
  larryObj.yBottom += dy*movePerFrame

  if(checkHitboxes(larryObj))
  {
    larryObj.xLocation -= dx*movePerFrame;
    larryObj.yLocation -= dy*movePerFrame;
    larryObj.xBottom -= dx*movePerFrame
    larryObj.yBottom -= dy*movePerFrame
  }

}


function checkDeadGanesh(direction, larryObj)
{
  var xKillZone = larryObj.xLocation
  var yKillZone = larryObj.yLocation

  if(direction == "W")
  {
    xKillZone -= 50
  }

  if(direction == "N")
  {
    yKillZone -= 50
  }

  if(direction == "E")
  {
    xKillZone += 50
  }

  if(direction == "S")
  {
    yKillZone += 50
  }

  for(var i = 0; i < ganeshArray.length; i++)
  {
    ganeshX = ganeshArray[i].xLocation
    ganeshY = ganeshArray[i].yLocation
    ganeshBottomX = ganeshArray[i].xBottom
    ganeshBottomXY = ganeshArray[i].yBottom

    console.log(xKillZone + " " + larryObj.xLocation + " " + larryObj.yLocation + " " + larryObj.yBottom + " " + ganeshX + " " + ganeshY)

    if(direction == "W")
    {
        if( (ganeshX >= xKillZone && ganeshX <= larryObj.xLocation && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom) 
        || (ganeshX >= xKillZone && ganeshX <= larryObj.xLocation && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom)
        || (ganeshX >= xKillZone && ganeshX <= larryObj.xLocation && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom)
        || (ganeshX >= xKillZone && ganeshX <= larryObj.xLocation && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom) )
      {
        killGanesh(ganeshArray[i])
      }
    }

    if(direction == "N")
    {
        if( (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= yKillZone && ganeshY <= larryObj.yLocation) 
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= yKillZone && ganeshY <= larryObj.yLocation)
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= yKillZone && ganeshY <= larryObj.yLocation)
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= yKillZone && ganeshY <= larryObj.yLocation) )
      {
        killGanesh(ganeshArray[i])
      }
    }

    if(direction == "E")
    {
        if( (ganeshX >= larryObj.xLocation && ganeshX <= xKillZone && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom) 
        || (ganeshX >= larryObj.xLocation && ganeshX <= xKillZone && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom)
        || (ganeshX >= larryObj.xLocation && ganeshX <= xKillZone && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom)
        || (ganeshX >= larryObj.xLocation && ganeshX <= xKillZone && ganeshY >= larryObj.yLocation && ganeshY <= larryObj.yBottom) )
      {
        killGanesh(ganeshArray[i])
      }
    }

    if(direction == "S")
    {
        if( (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= larryObj.yLocation && ganeshY <= yKillZone) 
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= larryObj.yLocation && ganeshY <= yKillZone)
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= larryObj.yLocation && ganeshY <= yKillZone)
        || (ganeshX >= larryObj.xLocation && ganeshX <= larryObj.xBottom && ganeshY >= larryObj.yLocation && ganeshY <= yKillZone) )
      {
        killGanesh(ganeshArray[i])
      }
    }

  }

}