var food = null

var swordLeft, swordRight

function Food()
{
  this.xLocation = 245
  this.yLocation = 405
  this.xBottom = 325
  this.yBottom = 485

  this.health = 20

  this.img = document.getElementById("tenders")
}

function spawnFood()
{
	if(food)
		return
	else
	{
		if(Math.random() < .3)
			food = new Food()
	}
}

function paintFood()
{
	if(food)
		ctx.drawImage(food.img, food.xLocation, food.yLocation)
}

function removeFood()
{
	food = null
}
