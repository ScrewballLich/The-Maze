//variables for the player, pointer, and bullets
let player;
let pointer;
let bullets = [];
let bulletOrder = 0;
let powerupsOnScreen = [];

let globalTimer;
let powerUpSpawnTimer;

let powerUpDelay = 300; //sets how long it takes before the next power up spawns
let powerUpDuration = 300; //sets how long the power up lasts

//variable which set the speed of the player and bullets
let permMoveSpeed = 5;
let permBulletSpeed = 7;

let bulletSpeed = permBulletSpeed;
let moveSpeed = permMoveSpeed;

//walls
let room01;
let wall01;

//creates the canvas and sets up the player and pointer.
function setup() {
  createCanvas(400, 400);
  player = new playerCharacter(width / 2, height / 2);
  pointer = new Pointer();
  room01 = new Room(50, 50, 300, 300);
  wall01 = new Wall(room01);
  rectMode(CENTER);
}

function draw() {
  background(220);

  //room stuff
  room01.display();
  wall01.display();

  //draws and updates the pointer (see player.js)
  pointer.direct();
  pointer.display();

  //draws and updates the player (see player.js)
  player.display();
  player.move();
  player.powerReset();
  player.checkCollision(wall01);

  //draws and updates all of the bullets in the bullets array (see projectiles.js)
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].display();
    bullets[i].move();
    bullets[i].checkCollision(wall01);
  }

  //spawns the powerup (see powerups.js)
  powerUpSpawnTimer = frameCount % powerUpDelay;
  spawnPowerup();

  //displays the powerups and checks if the player touches any (see powerups.js)
  for (let i = 0; i < powerupsOnScreen.length; i++) {
    powerupsOnScreen[i].display();
    powerupsOnScreen[i].activateCheck();
  }

  //sets up the global timer because frameCount doesn't carry over to other scripts.
  globalTimer = frameCount;
}
