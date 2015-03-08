//Ganesh images for dead
//Ganesh Images for punching
//Ganesh finishing open sequence
//Larry punching
//Larry everything

//Array that stores all of the ganesh enemies;
//should be empty at end of round
var ganeshArray = []

var ganeshWidth = 40
var ganeshHeight = 70

//Ganesh object
//@param: x; int; the current x location
//@param: y; int; the current y location
function Ganesh(x, y)
{
	this.xLocation = x
	this.yLocation = y

	this.goalX = 1700
	this.goalY = 50

	this.isDead = false

	this.reachedStart = false

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
	if (ganeshObj.isDead)
	{
		ctx.fillStyle="#FF0000"
		ctx.fillRect(ganeshObj.xLocation, ganeshObj.yLocation, ganeshWidth, ganeshHeight)
		ctx.fillStyle = "white"
	}
	else
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
	if(!this.reachedStart)
		return

	for (var i = 0; i < ganeshArray.length; i++)
	{
		updateGoal(ganeshArray[i], x, y)
		changeSpeed(ganeshObj)
	}
}

function updateGoal(ganeshObj, x, y)
{
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

	//do movement here
	if(totalDistance != 0)
	{
		ganeshObj.xLocation += 25*(xDistance/totalDistance)
		ganeshObj.yLocation += 25*(yDistance/totalDistance)
	}
}

//sets a ganesh to dead 
//@param: ganeshObj; Ganesh; the object that is killed
function killGanesh(ganeshObj)
{
	ganeshObj.isDead = true
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