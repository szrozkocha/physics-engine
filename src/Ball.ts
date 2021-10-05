import {Render} from "./engine/Render";
import PhysicsState from "./engine/PhysicsState";
import Vector from "./engine/Vector";

const BOUNCE_LOSS_FACTOR = 0.99;
const BOUNDING_BOX_WIDTH = 800;
const BOUNDING_BOX_HEIGHT = 600;

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

    if(this.physicsState.position.x - this.r < 0) {
      this.physicsState.speed.x = -this.physicsState.speed.x * 0.75;
      this.physicsState.position.x = this.r;
    } else if(this.physicsState.position.x + this.r > BOUNDING_BOX_WIDTH) {
      this.physicsState.speed.x = -this.physicsState.speed.x * 0.75;
      this.physicsState.position.x = BOUNDING_BOX_WIDTH - this.r;
    }

    if(this.physicsState.position.y - this.r < 0) {
      this.physicsState.speed.y = -this.physicsState.speed.y * 0.75;
      this.physicsState.position.y = this.r;
    } else if(this.physicsState.position.y + this.r > BOUNDING_BOX_HEIGHT) {
      this.physicsState.speed.y = -this.physicsState.speed.y * 0.75;
      this.physicsState.position.y = BOUNDING_BOX_HEIGHT - this.r;
    }
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

    let normal = new Vector(ball.physicsState.position.x - this.physicsState.position.x, ball.physicsState.position.y - this.physicsState.position.y);
    normal.normalize();
    let tangent = new Vector(-normal.y, normal.x);

    let normalSpeed = normal.dot(this.physicsState.speed);
    let tangentSpeed = tangent.dot(this.physicsState.speed);

    let normalSpeedBall = normal.dot(ball.physicsState.speed);

    let newNormalSpeed = (normalSpeed * (this.physicsState.mass - ball.physicsState.mass) + 2 * ball.physicsState.mass * normalSpeedBall) / (this.physicsState.mass + ball.physicsState.mass);
    let newTangentSpeed = tangentSpeed;

    let newNormal = normal.clone();
    newNormal.scaleTo(newNormalSpeed * BOUNCE_LOSS_FACTOR);

    let newTangent = tangent.clone();
    newTangent.scaleTo(newTangentSpeed * BOUNCE_LOSS_FACTOR);

    let newSpeed = new Vector(newNormal.x + newTangent.x, newNormal.y + newTangent.y);

    return new PhysicsState(newPosition, newSpeed, this.physicsState.acceleration, this.physicsState.mass);
  }
}