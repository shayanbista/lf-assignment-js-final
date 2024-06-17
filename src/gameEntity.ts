import { Tile } from "./tile";

export class GameEntity {
  game: any;
  posX: number;
  posY: number;
  width: number;
  height: number;

  constructor(
    game: any,
    posX: number,
    posY: number,
    width: number,
    height: number
  ) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }

  getCorners() {
    const offset = 1;
    const xCoords = [this.posX + offset, this.posX + this.width - offset];
    const yCoords = [this.posY, this.posY + this.height - offset];

    const corners = [];
    for (let i = 0; i < yCoords.length; ++i) {
      for (let j = 0; j < xCoords.length; ++j) {
        corners.push([xCoords[j], yCoords[i]]);
      }
    }
    return corners;
  }

  getIntersectedTiles() {
    const intersectedTiles = [];
    const corners = this.getCorners();
    console.log("corners", corners);

    for (let i = 0; i < corners.length; ++i) {
      const tile = this.game.getTile(corners[i][0], corners[i][1]);
      intersectedTiles.push({
        x: corners[i][0],
        y: corners[i][1],
        tile: tile,
      });
    }
    return intersectedTiles;
  }

  isClipping(direction: string) {
    const tiles = this.getIntersectedTiles();
    const mapping: { [key: string]: (string | null)[] } = {
      up: [tiles[0].tile, tiles[1].tile],
      down: [tiles[2].tile, tiles[3].tile],
      left: [tiles[0].tile, tiles[2].tile],
      right: [tiles[1].tile, tiles[3].tile],
    };

    return mapping[direction]
      .map((tile) => tile && Tile.isSolid(tile))
      .reduce((acc, cur) => acc || cur, false);
  }
}
