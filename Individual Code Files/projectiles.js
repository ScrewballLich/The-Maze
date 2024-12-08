//bullet object. Could maybe be reused for other projectiles if we feel like giving the enemies guns
function projectile(x_, y_, o_) {
  //sets the bullet's initial x and y positions, which should be wherever the pointer is at.
  this.x = x_;
  this.y = y_;

  //this is the order that the bullet was spawned in. This is useful for finding specific bullets.
  this.order = o_;

  //more trigonometry magic! This time, it figures out how fast the bullets should be moving along the X and Y axis
  let angleCoef = atan2(mouseY - height / 2, mouseX - width / 2);
  this.xVelocity = bulletSpeed * cos(angleCoef);
  this.yVelocity = bulletSpeed * sin(angleCoef);

  //displays the bullets
  this.display = function () {
    strokeWeight(3);
    point(this.x, this.y);
  };

  //moves the bullets
  this.move = function () {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
  };

  //checks for a bullet's collision with a wall and calls the delete function on that specific bullet. this is mostly recycled from the player collision.
  this.checkCollision = function (room) {
    const bounds = room.walls.getBounds(); // Get the bounds of the room's walls

  // Check collision with left wall
  if (this.x < bounds.left) {
    if (!room.walls.left) { // Check if there is a door
      this.x = bounds.left + this.width; // Push player to the right off the left wall
    }
  }

  // Check collision with right wall
  if (this.x > bounds.right) {
    if (!room.walls.right) { // Check if there is a door
      this.x = bounds.right - this.width; // Push player to the left off the right wall
    }
  }

  // Check collision with top wall
  if (this.y < bounds.top) {
    if (!room.walls.top) { // Check if there is a door
      this.y = bounds.top + this.width; // Push player down from the top wall
    }
  }

  // Check collision with bottom wall
  if (this.y > bounds.bottom) {
    if (!room.walls.bot) { // Check if there is a door
      this.y = bounds.bottom - this.width; // Push player up from the bottom wall
    }
  }
  };
}

//function which deletes the bullet by cycling through the list until it gets to the bullet specified by the order, then deletes it.
function removeBullet(order) {
  print(true)
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].order === order) {
      bullets.splice(i, 1);
      i = bullets.length;
    }
  }
}

//makes a new bullet whenever the mouse is pressed, then adds it to the array of bullets.
function mousePressed() {
  let bullet = new projectile(pointer.x, pointer.y, bulletOrder);
  bullets.push(bullet);
  bulletOrder++;
}
