//Create variables here
var dog,dogPhoto;
var happyDog,happyDogPhoto;
var database;
var foodS=0;
var foodStock;
var feed,addFood;
var feedDog,addFoods;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here
  dogPhoto=loadImage("dogImg.png");
  happyDogPhoto=loadImage("dogImg1.png");
}

function setup() {

  database = firebase.database();

	createCanvas(900, 500);

  dog = createSprite(420,350,20,20);
  dog.addImage(dogPhoto);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  

  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed :"+ lastFed + "AM",350,30);
  }
  
  //if(keyWentDown(UP_ARROW))
  //{
    //writeStock(foodS);
    //dog.addImage(happyDogPhoto);
  //}

  foodObj.display();

  drawSprites();
  //add styles here

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogPhoto);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}