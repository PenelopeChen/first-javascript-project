var S_KEYCODE = 83
var A_KEYCODE = 65
var D_KEYCODE = 68
var W_KEYCODE = 87

var UP_KEYCODE = 38
var DOWN_KEYCODE = 40
var LEFT_KEYCODE = 37
var RIGHT_KEYCODE = 39

var CANVAS_RATIO = 0.9

var SHIP_SPEED = 6;

var canvas = document.getElementById("myCanvasID");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth * CANVAS_RATIO;
canvas.height = window.innerHeight * CANVAS_RATIO;

var enemies = [];

function Enemy(color, width, height, x, y, vx, vy, a){
  this.color = color;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.a = a;
  this.update = function(){
      this.x += this.vx;
      this.y += this.vy;
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
  }
}

function Ship(color, height, width, x, y, speed){
  this.color = color;
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.vx = 0;
  this.vy = 0;
  this.x = x;
  this.y = y;
  this.update= function(){
    //ship?
    this.x += this.vx;
    this.y += this.vy;
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

var myShip = new Ship("cyan", 20, 20, 10, 10, 5);

function draw(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  var enemiesStillOnScreen = [];
  for(var i = 0; i<enemies.length; i++){
    enemies[i].update();
    if(enemies[i].y >= 0 && enemies[i].y <= canvas.height){
      enemiesStillOnScreen.push(enemies[i]);
    }
  }
  enemies = enemiesStillOnScreen;
  console.log(enemies.length);
  myShip.update();
}

function spawnEnemy(){
  enemies.push(new Enemy("blue", 30, 30, canvas.width*Math.random(), 0, 0, 3, 1));
}

function moveShip(event){

  //Move down (pressed S)
  if(event.keyCode == S_KEYCODE || event.keyCode == DOWN_KEYCODE){
    myShip.vy = myShip.speed;
  }
  //Move left (pressed A)
  if(event.keyCode == A_KEYCODE || event.keyCode == LEFT_KEYCODE){
    myShip.vx = -myShip.speed;
  }
  //Move up (pressed D)
  if(event.keyCode == D_KEYCODE || event.keyCode == UP_KEYCODE){
    myShip.vy = -myShip.speed;
  }
  //Move right (pressed W)
  if(event.keyCode == W_KEYCODE || event.keyCode == RIGHT_KEYCODE){
    myShip.vx = myShip.speed;
  }
}

  function stopShip(event){

  if(event.keyCode == S_KEYCODE || event.keyCode == DOWN_KEYCODE){
    myShip.vy = 0;
  }

  if(event.keyCode == A_KEYCODE || event.keyCode == LEFT_KEYCODE){
    myShip.vx = 0;
  }

  if(event.keyCode == D_KEYCODE || event.keyCode == UP_KEYCODE){
    myShip.vy = 0;
  }
  if(event.keyCode == W_KEYCODE || event.keyCode == RIGHT_KEYCODE){
    myShip.vx = 0;
  }
}
document.addEventListener("keydown", moveShip);
document.addEventListener("keyup", stopShip);

setInterval(draw,10);
setInterval(spawnEnemy, 100);
