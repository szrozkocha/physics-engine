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

  public testCollision(ball: Ball): boolean {
    return this.position.distance(ball.position) < this.r + ball.r;
  }

// @ts-ignore
  public processCollision(ball: Ball): void {
    let previousPosition = this.position.clone();
    previousPosition.translate(this.speed.inverse());

    let previousBallPosition = ball.position.clone();
    previousBallPosition.translate(ball.speed.inverse());

    let previousDistance = previousPosition.distance(previousBallPosition);

    let spaceLeft = previousDistance - this.r - ball.r;
    let speedRatio = this.speed.length() / (this.speed.length() + ball.speed.length());

    let toMove = this.speed.clone()
    toMove.scaleTo(spaceLeft * speedRatio);

    previousPosition.translate(toMove);

    this.position = previousPosition;

    this.speed = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }
}