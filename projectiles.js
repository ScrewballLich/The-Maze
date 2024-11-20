//bullet object. Could maybe be reused for other projectiles if we feel like giving the enemies guns
function projectile(x_,y_){
  
  //sets the bullet's initial x and y positions, which should be wherever the pointer is at.
  this.x = x_
  this.y = y_
  
  //more trigonometry magic! This time, it figures out how fast the bullets should be moving along the X and Y axis
  let angleCoef = atan2(mouseY - player.y, mouseX - player.x);
  this.xVelocity = bulletSpeed * cos(angleCoef)
  this.yVelocity = bulletSpeed * sin(angleCoef)
  
  //displays the bullets
  this.display = function () {
    strokeWeight(3)
    point(this.x, this.y)
  }
  
  //moves the bullets
  this.move = function () {
    this.x = this.x + this.xVelocity
    this.y = this.y + this.yVelocity
  }
}

//makes a new bullet whenever the mouse is pressed, then adds it to the array of bullets.
function mousePressed(){
  let bullet = new projectile(pointer.x,pointer.y)
  bullets.push(bullet);
}
