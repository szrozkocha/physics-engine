import {Render} from "./engine/Render";
import PhysicsState from "./engine/PhysicsState";

const BOUNCE_LOSS_FACTOR = 0.99;

export default class Ball {
  public physicsState: PhysicsState;
  public r: number;
  public color: string;


  constructor(physicsState: PhysicsState, r: number, color: string) {
    this.physicsState = physicsState;
    this.r = r;
    this.color = color;
  }

  public tick(frame: number): void {
    this.physicsState.tick(frame);
  }

  public draw(render: Render): void {
    render.drawCircle(this.physicsState.position.x, this.physicsState.position.y, this.r, this.color);
  }

  public testCollision(ball: Ball): boolean {
    return this.physicsState.position.distance(ball.physicsState.position) < this.r + ball.r;
  }

// @ts-ignore
  public processCollision(ball: Ball): PhysicsState {
    let distance = this.physicsState.position.distance(ball.physicsState.position);

    let spaceLeft = distance - this.r - ball.r;
    let speedRatio = this.physicsState.speed.length() / (this.physicsState.speed.length() + ball.physicsState.speed.length());

    let toMove = this.physicsState.speed.clone()
    toMove.scaleTo(spaceLeft * speedRatio);

    let newPosition = this.physicsState.position.clone();
    newPosition.translate(toMove);

    let speed = (this.physicsState.mass - ball.physicsState.mass) / (this.physicsState.mass + ball.physicsState.mass) * this.physicsState.speed.length()
      + 2 * ball.physicsState.mass / (this.physicsState.mass + ball.physicsState.mass) * ball.physicsState.speed.length();

    let newSpeed = this.physicsState.speed.inverse();
    newSpeed.scaleTo(speed * BOUNCE_LOSS_FACTOR);

    return new PhysicsState(newPosition, newSpeed, this.physicsState.acceleration, this.physicsState.mass);
  }
}