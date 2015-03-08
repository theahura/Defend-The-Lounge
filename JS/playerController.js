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

  this.health = 100
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
var up, down, left, right 

$(document).keydown(function(e){
  var key = e.which;
  if(key == "65") dx = -1; 
  if(key == "87") dy = -1;
  if(key == "68") dx = 1;
  if(key == "83") dy = 1;

  if(key == "37") 
  {
    e.preventDefault();

    if(!left)
    {
      left = true

      larry.direction = "W"
      larry.xBottom = larry.xLocation + 40
      larry.yBottom = larry.yLocation + 90
      larry.punchCount = 3; 
      checkDeadGanesh("W", larry) 
    }
  
  } 
  if(key == "38")
  {
    e.preventDefault();

    if(!up)
    {
      up = true
          
      larry.direction = "N"
      larry.xBottom = larry.xLocation + 90
      larry.yBottom = larry.yLocation + 40  
      larry.punchCount = 3;
      checkDeadGanesh("N", larry)  
    }
      
  }
  if(key == "39") 
  {
    e.preventDefault();

    if(!right)
    {
      right = true

      larry.direction = "E"
      larry.xBottom = larry.xLocation + 40    
      larry.yBottom = larry.yLocation + 90
      larry.punchCount = 3; 
      checkDeadGanesh("E", larry)    
    }
  }
  if(key == "40")
  {
    e.preventDefault();

    if(!down)
    {
      down=true

      larry.direction = "S"
      larry.xBottom = larry.xLocation + 90
      larry.yBottom = larry.yLocation + 40 
      larry.punchCount = 3;  
      checkDeadGanesh("S", larry) 
    }
  }
})

$(document).keyup(function(e){
  var key = e.which;
  if(key == "65") dx = 0; 
  if(key == "87") dy = 0;
  if(key == "68") dx = 0;
  if(key == "83") dy = 0;

  if(key == "40") down = false;
  if(key == "39") right = false;
  if (key == "38") up = false;
  if (key == "37") left = false;
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

  if(checkHitboxes(larryObj) || larryObj.yLocation <= 210)
  {
    larryObj.xLocation -= dx*movePerFrame;
    larryObj.yLocation -= dy*movePerFrame;
    larryObj.xBottom -= dx*movePerFrame
    larryObj.yBottom -= dy*movePerFrame
    return
  }

  scrollBy(dx*movePerFrame, dy*movePerFrame)

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
    xKillZone = larryObj.xBottom + 50
  }

  if(direction == "S")
  {
    yKillZone = larryObj.yBottom + 50
  }

  for(var i = 0; i < ganeshArray.length; i++)
  {
    ganeshX = ganeshArray[i].xLocation
    ganeshY = ganeshArray[i].yLocation
    ganeshBottomX = ganeshArray[i].xBottom
    ganeshBottomY = ganeshArray[i].yBottom

    if(direction == "W")
    {
        if( !((ganeshX > larryObj.xBottom) 
        ||  (ganeshBottomX < xKillZone )
        || (ganeshY > larryObj.yBottom)
        || (ganeshBottomY < larryObj.yLocation)))
      {
        killGanesh(ganeshArray[i])
      }
    }
    else if(direction == "N")
    {
        if( !((ganeshX > larryObj.xBottom) 
        ||  (ganeshBottomX < larryObj.xLocation )
        || (ganeshY > larryObj.yBottom)
        || (ganeshBottomY < yKillZone)))
      {
        killGanesh(ganeshArray[i])
      }
    }
    else if(direction == "E")
    {
        if( !((ganeshX > xKillZone) 
        ||  (ganeshBottomX < larryObj.xLocation )
        || (ganeshY > larryObj.yBottom)
        || (ganeshBottomY < larryObj.yLocation)))
      {
        killGanesh(ganeshArray[i])
      }
    }
    else if(direction == "S")
    {
        if( !((ganeshX > larryObj.xBottom) 
        ||  (ganeshBottomX < larryObj.xLocation )
        || (ganeshY > yKillZone)
        || (ganeshBottomY < larryObj.yLocation)))
      {
        killGanesh(ganeshArray[i])
      }
    }

  }

}