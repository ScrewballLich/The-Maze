//player object
function playerCharacter(x_,y_) {
  this.x = x_ //player's X position
  this.y = y_ //player's Y position
  
  this.powerTimer = -1 //initializes the timer for the powerups
  
  //displays the player
  this.display = function () {
    strokeWeight(1);
    fill(255)
    square(this.x, this.y, 20);
  };
  
  //moves the player (and pointer) around when certain keys are pressed. You can either use the arrow keys or W, A, S, and D.
  this.move = function(){
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
      this.x = (this.x + moveSpeed/sqrt(2));
      this.y = (this.y - moveSpeed/sqrt(2));
    } else if (keyIsDown(68) && keyIsDown(87)){
      this.x = (this.x + moveSpeed/sqrt(2));
      this.y = (this.y - moveSpeed/sqrt(2));
      
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)){
      this.x = (this.x + moveSpeed/sqrt(2));
      this.y = (this.y + moveSpeed/sqrt(2));
    } else if (keyIsDown(68) && keyIsDown(83)){
      this.x = (this.x + moveSpeed/sqrt(2));
      this.y = (this.y + moveSpeed/sqrt(2));
      
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)){
      this.x = (this.x - moveSpeed/sqrt(2));
      this.y = (this.y + moveSpeed/sqrt(2));
    } else if (keyIsDown(65) && keyIsDown(83)){
      this.x = (this.x - moveSpeed/sqrt(2));
      this.y = (this.y + moveSpeed/sqrt(2));
    
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
      this.x = (this.x - moveSpeed/sqrt(2));
      this.y = (this.y - moveSpeed/sqrt(2));
    } else if (keyIsDown(65) && keyIsDown(87)){
      this.x = (this.x - moveSpeed/sqrt(2));
      this.y = (this.y - moveSpeed/sqrt(2));
      
    } else if (keyIsDown(RIGHT_ARROW)){
      this.x = this.x + moveSpeed;
    } else if (keyIsDown(68)){
      this.x = this.x + moveSpeed;
      
    } else if (keyIsDown(DOWN_ARROW)){
      this.y = this.y + moveSpeed;
    } else if (keyIsDown(83)){
      this.y = this.y + moveSpeed;
      
    } else if (keyIsDown(LEFT_ARROW)){
      this.x = this.x - moveSpeed;
    } else if (keyIsDown(65)){
      this.x = this.x - moveSpeed;
      
    } else if (keyIsDown(UP_ARROW)){
      this.y = this.y - moveSpeed;
    } else if (keyIsDown(87)){
      this.y = this.y - moveSpeed;
    }
  }
  
  //resets the player (used for powerups)
  this.reset = function(){
    moveSpeed = permMoveSpeed;
    bulletSpeed = permBulletSpeed;
  }
  
  //activates a certain powerup based on the powerup type. also sets a timer for the powerup.
  this.activate = function(type){
    this.powerTimer = globalTimer % powerUpDuration
    if(type === "speed"){
      if(moveSpeed === permMoveSpeed){
        moveSpeed = moveSpeed * 2
      }
    }
  }
  
  //resets the player once the powerUpDuration timer has expired.
  this.powerReset = function(){
    if (this.powerTimer === globalTimer%300 + 1){
      this.reset();
    }
  }
}

//pointer object
function Pointer(){
  
  //sets the distance the pointer is from the player, as well as its initial x and y position
  this.distance = 30;
  this.x = player.x + this.distance;
  this.y = player.y;
  
  //trigonometry magic which figures out the location of the pointer (if you want to figure out what's going on here and write a proper explanation then be my guest)
  this.direct = function(){
    let angleCoef = atan2(mouseY - player.y, mouseX - player.x);
    this.x = player.x + this.distance * cos(angleCoef);
    this.y = player.y + this.distance * sin(angleCoef);
  }
  
  //displays the pointer
  this.display = function(){
    strokeWeight(4)
    point(this.x,this.y)
  }
}
