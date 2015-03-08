//Ganesh images for dead
//Ganesh Images for punching
//Ganesh finishing open sequence
//Larry punching
//Larry everything

//Array that stores all of the ganesh enemies;
//should be empty at end of round
var ganeshArray = []

var deadGaneshArray = []

//Ganesh object
//@param: x; int; the current x location
//@param: y; int; the current y location
function Ganesh(x, y)
{
	this.xLocation = x
	this.yLocation = y

	this.xBottom = this.xLocation
	this.yBottom = this.yLocation

	this.goalX = 1700
	this.goalY = 50

	this.isDead = false

	this.reachedStartOne = false
	this.reachedStartTwo = false

	this.imgE = document.getElementById("ganeshE")
	this.imgN = document.getElementById("ganeshN")
	this.imgW = document.getElementById("ganeshW")
	this.imgS = document.getElementById("ganeshS")

	this.imgDead = document.getElementById("ganeshDead")

	this.direction = "E"
}

//iterates through all of the ganeshes to paint them
function paintGaneshes()
{
	for (var i = 0; i < ganeshArray.length; i++)
	{
		paintGanesh(ganeshArray[i])
	}
}

//paints a specific ganesh
//@param: ganeshObj; Ganesh; the ganesh that is being painted
function paintGanesh(ganeshObj)
{
	if(ganeshObj.direction == "E")
		ctx.drawImage(ganeshObj.imgE, ganeshObj.xLocation, ganeshObj.yLocation)
	else if(ganeshObj.direction == "N")
		ctx.drawImage(ganeshObj.imgN, ganeshObj.xLocation, ganeshObj.yLocation)
	else if(ganeshObj.direction == "W")
		ctx.drawImage(ganeshObj.imgW, ganeshObj.xLocation, ganeshObj.yLocation)
	else 
		ctx.drawImage(ganeshObj.imgS, ganeshObj.xLocation, ganeshObj.yLocation)
}

function paintDeadGaneshes()
{
	for (var i = 0; i < deadGaneshArray.length; i++)
	{
		paintDeadGanesh(deadGaneshArray[i])
	}
}

function paintDeadGanesh(ganeshObj)
{
	ctx.drawImage(ganeshObj.imgDead, ganeshObj.xLocation, ganeshObj.yLocation)
}

//create a new ganesh, add it to the hash, and use the location x/y to create it
//@param: x; int; the starting x location of git
//@param: y; int; the starting y location of git
function spawnGanesh(x, y)
{
	var ganesh = new Ganesh(x, y)
	ganeshArray.push(ganesh)
}

function updateGoals(x, y)
{
	for (var i = 0; i < ganeshArray.length; i++)
	{
		updateGoal(ganeshArray[i], x, y)
	}
}

function updateGoal(ganeshObj, x, y)
{
	if(ganeshObj.reachedStartOne == false && ganeshObj.xLocation >= ganeshObj.goalX && ganeshObj.yLocation == ganeshObj.goalY)
	{
		ganeshObj.reachedStartOne = true
		ganeshObj.goalX = 1740
		ganeshObj.goalY = 250
	}
	else if(ganeshObj.reachedStartTwo == false && ganeshObj.xLocation >= ganeshObj.goalX && ganeshObj.yLocation >= ganeshObj.goalY)
	{
		ganeshObj.reachedStartTwo = true
	}

	if(!ganeshObj.reachedStartOne || !ganeshObj.reachedStartTwo)
		return


	ganeshObj.goalX = x
	ganeshObj.goalY = y
}

//iterates through all ganeshes to update their location
function moveGaneshes()
{
	for (var i = 0; i < ganeshArray.length; i++)
	{
		moveGanesh(ganeshArray[i])
	}
}

//create a new ganesh, add it to the hash, and use the location x/y to create it
//@param: ganeshObj; Ganesh; the object that is getting updated on the move cycle
function moveGanesh(ganeshObj)
{
	if(ganeshObj.isDead)
		return

	var xDistance = ganeshObj.goalX - ganeshObj.xLocation
	var yDistance = ganeshObj.goalY - ganeshObj.yLocation
	var totalDistance = Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2))

	var xMove = xDistance/totalDistance
	var yMove = yDistance/totalDistance

	if(Math.abs(xMove) > Math.abs(yMove))
	{
		if(xMove > 0)
			ganeshObj.direction = "E"
		else if (xMove < 0)
			ganeshObj.direction = "W"
	}
	else if(Math.abs(xMove) < Math.abs(yMove))
	{
		if(yMove > 0)
			ganeshObj.direction = "S"
		else if (yMove < 0)
			ganeshObj.direction = "N"	
	}
	
	//do movement here
	if(totalDistance != 0)
	{
		 //do movement here
		ganeshObj.xLocation += 15*(xMove)
		ganeshObj.xBottom += 15*(xMove)

		if(checkHitboxes(ganeshObj))
		{
		  ganeshObj.xLocation -= 15*(xMove)
		  ganeshObj.xBottom -= 15*(xMove)
		}

		ganeshObj.yLocation += 15*(yMove)
		ganeshObj.yBottom += 15*(yMove)

		if(checkHitboxes(ganeshObj))
		{
		  ganeshObj.yLocation -= 15*(yMove)
		  ganeshObj.yBottom -= 15*(yMove)
		}
	}
}

//sets a ganesh to dead 
//@param: ganeshObj; Ganesh; the object that is killed
function killGanesh(ganeshObj)
{
	ganeshObj.isDead = true
	ganeshArray.splice(ganeshArray.indexOf(ganeshObj), 1)
	console.log(ganeshArray.length)
	deadGaneshArray.push(ganeshObj)
	console.log(deadGaneshArray.length)

	ganeshCount++
}

//resets all the ganeshes at the end of the round
function resetGaneshes()
{
	for(var i = 0; i < ganeshArray.length; i++)
	{
		ganeshArray[i].xLocation;
		ganeshArray[i].yLocation;
		ganeshArray[i].isDead = false
	}
}


function checkGameOver()
{
	var ganeshCount = 0

	for(var i = 0; i < ganeshArray.length; i++)
	{
		if(!((ganeshArray[i].xLocation > larry.xBottom) 
        ||  (ganeshArray[i].xBottom < larry.xLocation )
        || (ganeshArray[i].yLocation > larry.yBottom)
        || (ganeshArray[i].yBottom < larry.yLocation)))
		{
			ganeshCount++
		}

		if (ganeshCount >= 3)
		{
			clearInterval(game_loop)
			alert("Game Over")
		}
	}
}