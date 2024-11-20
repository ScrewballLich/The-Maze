//variables for the player, pointer, and bullets
let player;
let pointer;
let bullets = [];
let powerupsOnScreen = [];

let globalTimer;
let powerUpSpawnTimer;

let powerUpDelay = 300 //sets how long it takes before the next power up spawns
let powerUpDuration = 300 //sets how long the power up lasts

//variable which set the speed of the player and bullets
let permMoveSpeed = 5
let permBulletSpeed = 7

let bulletSpeed = permBulletSpeed;
let moveSpeed = permMoveSpeed;

//creates the canvas and sets up the player and pointer.
function setup() {
  createCanvas(400, 400);
  player = new playerCharacter(width/2,height/2);
  pointer = new Pointer();
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  //draws and updates the pointer (see player.js)
  pointer.direct();
  pointer.display();
  
  //draws and updates the player (see player.js)
  player.display();
  player.move();
  player.powerReset();
  
  //draws and updates all of the bullets in the bullets array (see projectiles.js)
  for (let i = 0; i < bullets.length; i++){
    bullets[i].display();
    bullets[i].move();
  }
  
  //spawns the powerup (see powerups.js)
  powerUpSpawnTimer = frameCount%powerUpDelay
  spawnPowerup();
  
  //displays the powerups and checks if the player touches any (see powerups.js)
  for (let i = 0; i < powerupsOnScreen.length; i++){
    powerupsOnScreen[i].display();
    powerupsOnScreen[i].activateCheck();
  }
  
  //sets up the global timer because frameCount doesn't carry over to other scripts.
  globalTimer = frameCount;
}
