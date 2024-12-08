function setupNewWallCode() {
  let level1 = [];
  let level2 = [];

  levels.push(level1);
  levels.push(level2);

  cols = floor(25);
  rows = floor(25);

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var cell = new Cell(r, c);
      grid.push(cell);
    }
  }

  room01 = new Room(2, 2, 100, 100, true, false, false, false, false);
  level1.push(room01);

  room02 = new Room(1, 2, 100, 100, false, true, false, true, false);
  level1.push(room02);

  room03 = new Room(1, 3, 100, 100, false, true, true, false, false);
  level1.push(room03);

  room04 = new Room(2, 3, 100, 100, true, true, false, false, false);
  level1.push(room04);

  room05 = new Room(3, 3, 100, 100, true, false, false, false, true);
  level1.push(room05);

  room11 = new Room(0, 1, 100, 100, false, true, false, false, false);
  level2.push(room11);

  room12 = new Room(1, 1, 100, 100, true, false, false, true, false);
  level2.push(room12);

  room13 = new Room(1, 2, 100, 100, false, true, true, false, false);
  level2.push(room13);

  room14 = new Room(2, 2, 100, 100, true, false, false, true, false);
  level2.push(room14);

  room15 = new Room(2, 3, 100, 100, false, false, true, false, true);
  level2.push(room15);
}

function processNewWallCode() {
  let currentLevel = levels[0];

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  for (var j = 0; j < currentLevel.length; j++) {
    currentLevel[j].display();
    // Check if the player is in the current room
    if (currentLevel[j].isOccupied(player)) {
      currentRoom = currentLevel[j]; // Set the current room
    }

    if (currentRoom) {
      player.checkCollision(currentRoom);
      
      // Check if the room has a finish and if the player is in it
      if (currentRoom.finish) {
        // Move to the next level if there is one
        if (levels.length > 1) {
          levels.shift(); // Remove the current level
          // Reset the player's position to the starting position of the new room
          player.x = levels[0][0].x + levels[0][0].w / 2; // Center the player in the new room
          player.y = levels[0][0].y + levels[0][0].h / 2;
        }
      }
    }
  }
}

class Room {
  constructor(row, col, w, h, left, right, top, bot, fin = false) {
    this.x = row * s; // x position of the room
    this.y = col * s; // y position of the room
    this.w = w; // width of the room
    this.h = h; // height of the room
    this.walls = new Wall(this, left, right, top, bot); // Create walls for the room
    this.finish = fin; // Finish flag
  }

  display() {
    // Draw the room
    if (this.finish) {
      stroke("green");
      fill("green");
    } else {
      stroke("white");
      fill("white");
    }

    rect(this.x, this.y, this.w, this.h);
    this.walls.display(); // Display the walls
  }

  isOccupied(player) {
    return (
      player.x > this.x &&
      player.x < this.x + this.w &&
      player.y > this.y &&
      player.y < this.y + this.h
    );
  }
}

class Wall {
  constructor(room, left, right, top, bot) {
    this.room = room;
    this.left = left;
    this.right = right;
    this.top = top;
    this.bot = bot;
  }

  display() {
    const { x, y, w, h } = this.room; // Use w and h instead of width and height
    stroke("black"); // Wall color
    strokeWeight(10); // Gives clear border for the wall

    // uses lines for the walls that takes any rectanigale and makes sure that the walls are printed corrcetly

    // Left wall
    if (!this.left) {
      // calls for a doorway to be made on the left wall of the room
      line(x, y + h, x, y); //solid wall if door is not called
    }

    // Right wall
    if (!this.right) {
      // calls for a doorway to be made on the right wall of the room
      line(x + w, y, x + w, y + h); //solid wall if door is not called
    }

    // Top wall
    if (!this.top) {
      // calls for a doorway to be made on the top wall of the room
      line(x, y, x + w, y); //solid wall if door is not called
    }

    // Bottom wall
    if (!this.bot) {
      // calls for a doorway to be made on the bottom wall of the room
      line(x + w, y + h, x, y + h); //solid wall if door is not called
    }
  }

  // For the player class to define walls of the room. Line 78
  getBounds() {
    const { x, y, w, h } = this.room;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
    };
  }
}

function Cell(r, c) {
  this.r = r;
  this.c = c;

  this.show = function () {
    var x = r * s;
    var y = c * s;
    stroke(255);
    noFill();
    rect(x, y, s, s);
  };
}
