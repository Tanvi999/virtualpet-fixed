//Create variables here
var dog, happyDog, dog1, database, foodS, foodStock; 

function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 1000);
  database = firebase.database();
  
  dog = createSprite(250, 400);
  dog.addImage(dog1);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happyDog);
  }

  if (keyWentUp(UP_ARROW)) {
    dog.addImage(dog1);
  }

  drawSprites();
  //add styles here

  textSize (50);
  text("Hint: Press the up arrow to feed your dog!", 250, 20);
  text("Food Left: " + foodS,250, 250);

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if (x<0) {
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
    'food':x
  })
}
