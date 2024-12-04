//bullet object. Could maybe be reused for other projectiles if we feel like giving the enemies guns
function projectile(x_, y_, o_) {
  //sets the bullet's initial x and y positions, which should be wherever the pointer is at.
  this.x = x_;
  this.y = y_;

  //this is the order that the bullet was spawned in. This is useful for finding specific bullets.
  this.order = o_;

  //more trigonometry magic! This time, it figures out how fast the bullets should be moving along the X and Y axis
  let angleCoef = atan2(mouseY - player.y, mouseX - player.x);
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
  this.checkCollision = function (wall) {
    const bounds = wall.getBounds();
    if (this.x < bounds.left) {
      removeBullet(this.order);
    }
    if (this.x > bounds.right) {
      removeBullet(this.order);
    }
    if (this.y < bounds.top) {
      removeBullet(this.order);
    }
    if (this.y > bounds.bottom) {
      removeBullet(this.order);
    }
  };
}

//function which deletes the bullet by cycling through the list until it gets to the bullet specified by the order, then deletes it.
function removeBullet(order) {
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
