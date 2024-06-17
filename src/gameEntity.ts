import { Tile } from "./tile";

// export class GameEntity {
//   game: any;
//   posX: number;
//   posY: number;
//   width: number;
//   height: number;

//   constructor(
//     game: any,
//     posX: number,
//     posY: number,
//     width: number,
//     height: number
//   ) {
//     this.game = game;
//     this.posX = posX;
//     this.posY = posY;
//     this.width = width;
//     this.height = height;
//   }

//   getCorners() {
//     const offset = 18;
//     const xCoords = [this.posX + offset, this.posX + this.width - offset];
//     const yCoords = [this.posY, this.posY + this.height - offset + 4];

//     const corners = [];

//     for (let i = 0; i < yCoords.length; ++i) {
//       for (let j = 0; j < xCoords.length; ++j) {
//         corners.push([xCoords[j], yCoords[i]]);
//       }
//     }

//     return corners;
//   }

//   getIntersectedTiles() {
//     const intersectedTiles = [];
//     const corners = this.getCorners();

//     for (let i = 0; i < corners.length; ++i) {
//       const tile = this.game.getTile(corners[i][0], corners[i][1]);
//       console.log("caluclated tile ", tile);
//       intersectedTiles.push({
//         x: corners[i][0],
//         y: corners[i][1],
//         tile: tile,
//       });
//     }
//     return intersectedTiles;
//   }

//   isClipping(direction: string) {
//     const tiles = this.getIntersectedTiles();

//     const mapping: { [key: string]: (string | null)[] } = {
//       up: [tiles[0].tile, tiles[1].tile],
//       down: [tiles[2].tile, tiles[3].tile],
//       left: [tiles[0].tile, tiles[2].tile],
//       right: [tiles[1].tile, tiles[3].tile],
//     };
//     return mapping[direction]
//       .map((tile) => tile && Tile.isSolid(tile))
//       .reduce((acc, cur) => acc || cur, false);
//   }
// }

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

  // getCorners() {
  //   const offset = 18;
  //   const xCoords = [this.posX + offset, this.posX + this.width - offset];
  //   const yCoords = [this.posY, this.posY + this.height - offset + 2];

  //   const corners = [];

  //   for (let i = 0; i < yCoords.length; ++i) {
  //     for (let j = 0; j < xCoords.length; ++j) {
  //       corners.push([xCoords[j], yCoords[i]]);
  //     }
  //   }

  //   return corners;
  // }

  // getIntersectedTiles() {
  //   const intersectedTiles = [];
  //   const corners = this.getCorners();

  //   for (let i = 0; i < corners.length; ++i) {
  //     const tile = this.game.getTile(corners[i][0], corners[i][1]);
  //     intersectedTiles.push({
  //       x: corners[i][0],
  //       y: corners[i][1],
  //       tile: tile,
  //     });
  //   }
  //   return intersectedTiles;
  // }

  // isClipping(direction: string) {
  //   const tiles = this.getIntersectedTiles();
  //   console.log("tiles intersecting", tiles);

  //   const mapping: { [key: string]: (string | null)[] } = {
  //     up: [tiles[0]?.tile, tiles[1]?.tile],
  //     down: [tiles[2]?.tile, tiles[3]?.tile],
  //     left: [tiles[0]?.tile, tiles[2]?.tile],
  //     right: [tiles[1]?.tile, tiles[3]?.tile],
  //   };

  //   console.log("mapping", mapping);

  //   return mapping[direction]
  //     .map((tile) => tile && Tile.isSolid(tile))
  //     .reduce((acc, cur) => acc || cur, false);
  // }

  getCorners() {
    const offset = 18;
    const xCoords = [this.posX + offset, this.posX + this.width - offset];
    const yCoords = [this.posY, this.posY + this.height - offset + 2];

    const corners = [];
    for (let i = 0; i < yCoords.length; ++i) {
      for (let j = 0; j < xCoords.length; ++j) {
        corners.push([xCoords[j], yCoords[i]]);
      }
    }
    console.log("Corners:", corners); // Debugging
    return corners;
  }

  getIntersectedTiles() {
    const intersectedTiles = [];
    const corners = this.getCorners();

    for (let i = 0; i < corners.length; ++i) {
      const tile = this.game.getTile(corners[i][0], corners[i][1]);
      intersectedTiles.push({ x: corners[i][0], y: corners[i][1], tile: tile });
    }
    console.log("Intersected Tiles:", intersectedTiles); // Debugging
    return intersectedTiles;
  }

  isClipping(direction: string) {
    const tiles = this.getIntersectedTiles();
    console.log("Tiles Intersecting:", tiles); // Debugging

    // Correct the mapping logic
    const mapping: { [key: string]: (string | null)[] } = {
      up: tiles.slice(0, 2).map((tile) => tile.tile),
      down: tiles.slice(2, 4).map((tile) => tile.tile),
      left: [tiles[0]?.tile, tiles[2]?.tile],
      right: [tiles[1]?.tile, tiles[3]?.tile],
    };

    console.log("Mapping:", mapping); // Debugging

    return mapping[direction]
      .map((tile) => tile && tile !== null && Tile.isSolid(tile))
      .reduce((acc, cur) => acc || cur, false);
  }
}
