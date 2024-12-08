//player object
function playerCharacter(x_, y_) {
  this.x = x_; //player's X position
  this.y = y_; //player's Y position
  this.width = 20;

  this.powerTimer = -1; //initializes the timer for the powerups

  //displays the player
  this.display = function () {
    rectMode(CENTER);
    strokeWeight(1);
    fill(255);
    square(this.x, this.y, this.width);
  };

  //moves the player (and pointer) around when certain keys are pressed. You can either use the arrow keys or W, A, S, and D.
  this.move = function () {
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
      this.x = this.x + moveSpeed / sqrt(2);
      this.y = this.y - moveSpeed / sqrt(2);
    } else if (keyIsDown(68) && keyIsDown(87)) {
      this.x = this.x + moveSpeed / sqrt(2);
      this.y = this.y - moveSpeed / sqrt(2);
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
      this.x = this.x + moveSpeed / sqrt(2);
      this.y = this.y + moveSpeed / sqrt(2);
    } else if (keyIsDown(68) && keyIsDown(83)) {
      this.x = this.x + moveSpeed / sqrt(2);
      this.y = this.y + moveSpeed / sqrt(2);
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
      this.x = this.x - moveSpeed / sqrt(2);
      this.y = this.y + moveSpeed / sqrt(2);
    } else if (keyIsDown(65) && keyIsDown(83)) {
      this.x = this.x - moveSpeed / sqrt(2);
      this.y = this.y + moveSpeed / sqrt(2);
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
      this.x = this.x - moveSpeed / sqrt(2);
      this.y = this.y - moveSpeed / sqrt(2);
    } else if (keyIsDown(65) && keyIsDown(87)) {
      this.x = this.x - moveSpeed / sqrt(2);
      this.y = this.y - moveSpeed / sqrt(2);
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x = this.x + moveSpeed;
    } else if (keyIsDown(68)) {
      this.x = this.x + moveSpeed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y = this.y + moveSpeed;
    } else if (keyIsDown(83)) {
      this.y = this.y + moveSpeed;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x = this.x - moveSpeed;
    } else if (keyIsDown(65)) {
      this.x = this.x - moveSpeed;
    } else if (keyIsDown(UP_ARROW)) {
      this.y = this.y - moveSpeed;
    } else if (keyIsDown(87)) {
      this.y = this.y - moveSpeed;
    }
  };

  //resets the player (used for powerups)
  this.reset = function () {
    moveSpeed = permMoveSpeed;
    bulletSpeed = permBulletSpeed;
  };

  //activates a certain powerup based on the powerup type. also sets a timer for the powerup.
  this.activate = function (type) {
    this.powerTimer = globalTimer % powerUpDuration;
    if (type === "speed") {
      if (moveSpeed === permMoveSpeed) {
        moveSpeed = moveSpeed * 2;
      }
    }
  };

  //resets the player once the powerUpDuration timer has expired.
  this.powerReset = function () {
    if (this.powerTimer === (globalTimer % 300) + 1) {
      this.reset();
    }
  };

  this.checkCollision = function(room) {
  const bounds = room.walls.getBounds(); // Get the bounds of the room's walls

  // Check collision with left wall
  if (this.x - this.width < bounds.left) {
    if (!room.walls.left) { // Check if there is a door
      this.x = bounds.left + this.width; // Push player to the right off the left wall
    }
  }

  // Check collision with right wall
  if (this.x + this.width > bounds.right) {
    if (!room.walls.right) { // Check if there is a door
      this.x = bounds.right - this.width; // Push player to the left off the right wall
    }
  }

  // Check collision with top wall
  if (this.y - this.width < bounds.top) {
    if (!room.walls.top) { // Check if there is a door
      this.y = bounds.top + this.width; // Push player down from the top wall
    }
  }

  // Check collision with bottom wall
  if (this.y + this.width > bounds.bottom) {
    if (!room.walls.bot) { // Check if there is a door
      this.y = bounds.bottom - this.width; // Push player up from the bottom wall
    }
  }
}
}

//pointer object
function Pointer() {
  //sets the distance the pointer is from the player, as well as its initial x and y position
  this.distance = 30;
  this.x = player.x + this.distance;
  this.y = player.y;

  //trigonometry magic which figures out the location of the pointer (if you want to figure out what's going on here and write a proper explanation then be my guest)
  this.direct = function () {
    let angleCoef = atan2(mouseY - height / 2, mouseX - width / 2)
    this.x = player.x + this.distance * cos(angleCoef);
    this.y = player.y + this.distance * sin(angleCoef);
  };

  //displays the pointer
  this.display = function () {
    strokeWeight(4);
    point(this.x, this.y);
  };
}
