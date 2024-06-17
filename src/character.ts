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

  update() {
    // console.log("update function is called");
    const { keys } = this.game.input;
    // console.log(keys);
    // console.log("right", keys.right);
    const speed = 2.5;

    if (keys.up.hold) {
      if (!this.jumping && this.canJump()) {
        // console.log(" jump");
        this.animationFrame = 5;
        this.jumping = true;
        this.velY = speed;
        this.jumpTarget = this.posY - 2.2 * Tile.size;
      }
    }

    if (!this.jumping && !this.canJump()) {
      this.posY += this.velY;
      this.velY += 0.05;

      if (this.velY >= speed) {
        this.velY = speed;
      }

      this.adjustFall();
    }

    if (this.jumping) {
      this.posY -= this.velY;
      this.velY -= 0.01;

      if (this.posY <= this.jumpTarget) {
        this.posY = this.jumpTarget;
        this.jumping = false;
        this.velY = 0;
      }

      this.adjustJump();
    }

    if (keys.right.hold) {
      // this.posX += speed;
      // this.direction = 1;
      // this.adjustWalk("right");
      console.log("right", this.posX);
    }

    if (keys.left.hold) {
      this.posX -= speed;
      this.direction = -1;
      // this.adjustWalk("left");
      console.log("left", this.posX);
    }

    // this.handleTiles();
  }

  canJump() {
    this.posY++;
    const ret = this.isClipping("down");
    this.posY--;
    return ret;
  }

  // adjustWalk(direction: string) {
  //   if (this.isClipping(direction)) {
  //     if (direction === "left") {
  //       this.posX += this.width - 1;
  //     }
  //     this.posX = Tile.size * Math.floor(this.posX / Tile.size);
  //     if (direction === "right") {
  //       this.posX += Tile.size - this.width;
  //     }
  //   } else {
  //     if (this.canJump()) {
  //       this.animationFrame++;
  //     }
  //   }
  // }

  adjustJump() {
    if (this.isClipping("up")) {
      console.log("is clipping");
      this.posY += Tile.size;
      this.posY = Tile.size * Math.floor(this.posY / Tile.size);
      this.jumping = false;
      this.velY = 0;
    }
  }

  adjustFall() {
    if (this.isClipping("down")) {
      this.posY = Tile.size * Math.floor(this.posY / Tile.size);
    }
  }

  // handleTiles() {
  //   const tiles = this.getIntersectedTiles();
  //   for (let tile of tiles) {
  //   }
  // }
}
