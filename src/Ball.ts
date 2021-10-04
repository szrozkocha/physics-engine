import {Render} from "./engine/Render";

export default class Ball {
  public x: number;
  public y: number;
  public r: number;
  public color: string;


  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

// @ts-ignore
  public tick(frame: number): void {
  }

  public draw(render: Render): void {
    render.drawCircle(this.x, this.y, this.r, this.color);
  }
}