class Room {
  constructor(x, y, w, h) {
    this.x = x; // x position of the room
    this.y = y; // y position of the room
    this.w = w; // width of the room
    this.h = h; // height of the room
  }

  display() {
    // Draw the room
    stroke("white"); // Made the rooms starting wall color white. Allows to check if walls have been placed,
    fill("white");
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h); // Outer rectangle postion and dimension.
  }
}

class Wall {
  constructor(room) {
    this.room = room; // grabs the room object that is put into it above.
    this.wallWidth = 10;
  }

  display() {
    const { x, y, w, h } = this.room; // Use w and h instead of width and height
    rectMode(CORNER);
    stroke("black"); // Wall color
    strokeWeight(this.wallWidth); // Gives clear border for the wall

    // uses lines for the walls that takes any rectanigale and makes sure that the walls are printed corrcetly

    // Top wall
    line(x, y, x + w, y);
    // Right wall
    line(x + w, y, x + w, y + h);
    // Bottom wall
    line(x + w, y + h, x, y + h);
    // Left wall
    line(x, y + h, x, y);
  }

  // For the player class to define each wall that is made. Line 78
  getBounds() {
    const { x, y, w, h } = this.room;
    return {
      left: x,
      right: x + w,
      top: y,
      bottom: y + h,
      wallWidth: this.wallWidth,
    };
  }
}
