var food = null

function Food()
{
  this.xLocation = 245
  this.yLocation = 405
  this.xBottom = 405
  this.yBottom = 565

  this.health = 20

  this.img = document.getElementById("tenders")
}

function spawnFood()
{
	if(food)
		return
	else
	{
		if(Math.random() > .5)
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