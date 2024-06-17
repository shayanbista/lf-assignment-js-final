import { GameEntity } from "./gameEntity";
import { Tile } from "./tile";

export class Character extends GameEntity {
  velX: number;
  velY: number;
  direction: number;
  jumping: boolean;
  jumpTarget: number;
  animationFrame: number;

  constructor(game: any, posX: number, posY: number) {
    super(game, posX, posY, Tile.size - 4, Tile.size);
    this.velX = 0;
    this.velY = 0;
    this.direction = 1;
    this.jumping = false;
    this.jumpTarget = 0;
    this.animationFrame = 0;
  }

  // update() {
  //   // console.log("update function is called");
  //   const { keys } = this.game.input;
  //   // console.log(keys);
  //   // console.log("right", keys.right);
  //   const speed = 2.5;

  //   if (keys.up.hold) {
  //     // console.log("jump up is called");
  //     // if (!this.jumping && this.canJump()) {
  //     //   // console.log(" jump");
  //     //   this.animationFrame = 5;
  //     //   this.jumping = true;
  //     //   this.velY = speed;
  //     //   this.jumpTarget = this.posY - 2.2 * Tile.size;
  //     // }
  //   }

  //   if (!this.jumping && !this.canJump()) {
  //     this.posY += this.velY;
  //     this.velY += 0.05;

  //     if (this.velY >= speed) {
  //       this.velY = speed;
  //     }

  //     this.adjustFall();
  //   }

  //   if (this.jumping) {
  //     this.posY -= this.velY;
  //     this.velY -= 0.01;

  //     if (this.posY <= this.jumpTarget) {
  //       this.posY = this.jumpTarget;
  //       this.jumping = false;
  //       this.velY = 0;
  //     }

  //     this.adjustJump();
  //   }

  //   if (keys.right.hold) {
  //     console.log("right holding is called");
  //     this.posX += speed;
  //     // this.adjustWalk("right");
  //     // console.log("right movement", this.posX);
  //     this.direction = 1;
  //   }

  //   if (keys.left.hold) {
  //     console.log("left key is called");
  //     this.posX -= speed;
  //     this.direction = -1;
  //     this.adjustWalk("left");
  //   }

  //   // this.handleTiles();
  // }

  update() {
    const { keys } = this.game.input;
    const speed = 2.5;

    // Handle right movement
    if (keys.right.hold) {
      if (!this.isClipping("right")) {
        this.posX += speed;
        this.direction = 1;
      } else {
        console.log("Collision on the right");
      }
    }

    // Handle left movement
    if (keys.left.hold) {
      if (!this.isClipping("left")) {
        this.posX -= speed;
        this.direction = -1;
        this.adjustWalk("left");
      } else {
        console.log("Collision on the left");
      }
    }

    // Handle gravity and falling
    if (!this.jumping && !this.canJump()) {
      if (!this.isClipping("down")) {
        this.posY += this.velY;
        this.velY += 0.05;

        if (this.velY >= speed) {
          this.velY = speed;
        }
      } else {
        console.log("Collision below");
        this.velY = 0;
      }
      this.adjustFall();
    }

    if (this.jumping) {
      if (!this.isClipping("up")) {
        this.posY -= this.velY;
        this.velY -= 0.01;

        if (this.posY <= this.jumpTarget) {
          this.posY = this.jumpTarget;
          this.jumping = false;
          this.velY = 0;
        }
      } else {
        console.log("Collision above");
        this.velY = 0;
        this.jumping = false;
      }
      this.adjustJump();
    }

    console.log("Position:", this.posX, this.posY);
    console.log("Velocity:", this.velX, this.velY);
  }

  canJump() {
    this.posY++;
    const ret = this.isClipping("down");
    this.posY--;
    return ret;
  }

  adjustWalk(direction: string) {
    if (direction === "left") {
      console.log("left");
    }

    // } else {
    //   console.log("right collision occured", this.isClipping(direction));
    // }

    if (direction === "left") {
      if (this.isClipping(direction)) console.log("left collisoin has occured");
    }

    if (direction === "right" && this.isClipping(direction)) {
      console.log("right collision has occured", this.isClipping(direction));
    } else {
      if (this.canJump()) {
        this.animationFrame++;
      }
    }
  }

  adjustJump() {
    if (this.isClipping("up")) {
      console.log("it is colliding top");
      this.posY += Tile.size;
      this.posY = Tile.size * Math.floor(this.posY / Tile.size);
      this.jumping = false;
      this.velY = 0;
    }
  }

  adjustFall() {
    if (this.isClipping("down")) {
      // this.posY = Tile.size * Math.floor(this.posY / Tile.size);
      console.log("cliipping down");
    }
  }
}

// adjustWalk(direction: string) {
//   if (this.isClipping(direction)) {
//     if (direction === "left") {
//       console.log("left collision", this.isClipping(direction));
//       this.posX += Tile.size - this.width / 2; // Move out of collision
//     } else if (direction === "right") {
//       console.log("right collision", this.isClipping(direction));
//       this.posX -= Tile.size - this.width / 2; // Move out of collision
//     }
//   } else {
//     if (this.canJump()) {
//       this.animationFrame++;
//     }
//   }
// }

// handleTiles() {
//   const tiles = this.getIntersectedTiles();
//   for (let tile of tiles) {
//   }
// }
