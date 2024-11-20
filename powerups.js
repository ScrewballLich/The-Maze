//spawns a new powerup in a random spot on the canvas.
function spawnPowerup(){
  if(powerUpSpawnTimer === 0){
    powerupsOnScreen.pop();
    let newPower = new powerUp(random(width),random(height),"speed");
    powerupsOnScreen.push(newPower);
  }
}

//the power up object.
function powerUp(x_,y_,t_){
  this.x = x_ //x position
  this.y = y_ //y position
  this.type = t_ //type of powerup
  
  this.radius = 10 //radius of the circle
  this.activated = false //whether or not the powerup has been activated
  
  //displays the powerup (if the player hasn't already activated it)
  this.display = function(){
    if (this.activated === false){
      fill(0, 0, 255)
      circle(this.x, this.y, this.radius)
    }
  }
  
  //activates the powerup if the player gets within a certain distance (see player.js), and makes sure it can't be activated more than once.
  this.activateCheck = function(){
    if (dist(player.x, player.y, this.x, this.y) < this.radius*2){
      if(this.activated === false){
          player.activate(this.type);
        this.activated = true;
      }
    }
  }
}

//removes the powerup from the screen.
function removeThisPowerup(){
  powerupsOnScreen.pop();
}
