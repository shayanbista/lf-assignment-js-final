export class Sprite {
    private size: number;
    private sw: number;
    private sh: number;
    private sx: number;
    private sy: number;
    private static image: HTMLImageElement;
  
    constructor(i: number, j: number, sw?: number, sh?: number) {
      this.size = 64; 
      this.sw = sw || this.size;
      this.sh = sh || this.size;
      this.sx = i * this.size;
      this.sy = j * this.size;
  
      if (!Sprite.image) {
        Sprite.image = new Image();
        Sprite.image.src = 'assets/sprites/tileset.png'; 
      }
    }
  
    draw(ctx: CanvasRenderingContext2D, x: number, y: number, dw: number = this.size, dh: number = this.size) {
      ctx.drawImage(Sprite.image, this.sx, this.sy, this.sw, this.sh, x, y, dw, dh);
    }
  }
  