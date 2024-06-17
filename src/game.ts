import { Sprite } from "./sprite";
import { Tile } from "./tile";
import { Character } from "./character";

let gameCanvas: HTMLCanvasElement;
let gameCtx: CanvasRenderingContext2D;
let map: (string | null)[][];
let dave: Character;
const TILE_SIZE = 50;

export function startGame(newMap: (string | null)[][]) {
  map = newMap;
  gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  gameCtx = gameCanvas.getContext("2d")!;
  gameCanvas.style.backgroundColor = "black";

  // Find Dave's starting position
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "DA") {
        dave = new Character(
          {
            getTile,
            input: {
              keys: {
                up: { hold: false },
                right: { hold: false },
                left: { hold: false },
              },
            },
          },
          x * TILE_SIZE,
          y * TILE_SIZE
        );
        console.log(`Dave's initial grid position: (${x}, ${y})`);
        break;
      }
    }
  }

  renderGame();

  window.addEventListener("keydown", handleInput);
  window.addEventListener("keyup", stopInput);
  window.requestAnimationFrame(gameLoop);
}

function renderGame() {
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] && map[y][x] !== "DA") {
        renderTile(map[y][x]!, x * TILE_SIZE, y * TILE_SIZE);
      }
    }
  }

  renderTile("DA", dave.posX, dave.posY);
}

function renderTile(tile: string, x: number, y: number) {
  let spriteX: number, spriteY: number;
  switch (tile) {
    case "B":
      [spriteX, spriteY] = [0, 0];
      break;
    case "R":
      [spriteX, spriteY] = [1, 0];
      break;
    case "P":
      [spriteX, spriteY] = [2, 0];
      break;
    case "K":
      [spriteX, spriteY] = [3, 0];
      break;
    case "L":
      [spriteX, spriteY] = [4, 0];
      break;
    case "T":
      [spriteX, spriteY] = [5, 0];
      break;
    case "D":
      [spriteX, spriteY] = [0, 1];
      break;
    case "RD":
      [spriteX, spriteY] = [1, 1];
      break;
    case "DA": {
      if (dave.direction === 1) {
        spriteX = (dave.animationFrame % 4) + 1;
        spriteY = 2;
      } else {
        spriteX = (dave.animationFrame % 4) + 5;
        spriteY = 2;
      }
      break;
    }
    case "G":
      [spriteX, spriteY] = [3, 1];
      break;
    case "RNG":
      [spriteX, spriteY] = [4, 1];
      break;
    case "Key":
      [spriteX, spriteY] = [5, 1];
      break;
    case "C":
      [spriteX, spriteY] = [6, 1];
      break;
    case "Y":
      [spriteX, spriteY] = [7, 1];
      break;
    case "J":
      [spriteX, spriteY] = [8, 1];
      break;
    case "E":
      [spriteX, spriteY] = [1, 8];
      break;
    default:
      [spriteX, spriteY] = [0, 0];
      break;
  }
  const sprite = new Sprite(spriteX, spriteY, 64, 64);
  sprite.draw(gameCtx, x, y, TILE_SIZE, TILE_SIZE);
}

function handleInput(e: KeyboardEvent) {
  if (e.key === "ArrowRight") {
    console.log("i am moving dave");
    dave.velX = 5;
    dave.direction = 1;
    dave.posX += dave.velX;
    dave.animationFrame = (dave.animationFrame + 1) % 4;
  } else if (e.key === "ArrowLeft") {
    dave.velX = -5;
    dave.direction = -1;
    dave.posX += dave.velX;
    dave.animationFrame = (dave.animationFrame + 1) % 4;
  } else if (e.key === "ArrowUp" && dave.canJump()) {
    dave.velY += 5;
    console.log(dave);
    dave.jumping = true;
  }
}

function stopInput(e: KeyboardEvent) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    dave.velX = 0;
  }
}

function gameLoop() {
  dave.update();
  renderGame();
  window.requestAnimationFrame(gameLoop);
}

function getTile(x: number, y: number) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  return map[row] && map[row][col];
}
