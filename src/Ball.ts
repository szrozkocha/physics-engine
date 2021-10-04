import {Render} from "./engine/Render";
import Vector from "./engine/Vector";

export default class Ball {
  public position: Vector;
  public speed: Vector;
  public acceleration: Vector;
  public r: number;
  public color: string;


  constructor(position: Vector, speed: Vector, acceleration: Vector, r: number, color: string) {
    this.position = position;
    this.speed = speed;
    this.acceleration = acceleration;
    this.r = r;
    this.color = color;
  }

// @ts-ignore
  public tick(frame: number): void {
    this.position.translate(this.speed);

    this.speed.translate(this.acceleration);
  }

  public draw(render: Render): void {
    render.drawCircle(this.position.x, this.position.y, this.r, this.color);
  }
}