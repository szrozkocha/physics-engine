import Vector from "./Vector";

export default class PhysicsState {
  public position: Vector;
  public speed: Vector;
  public acceleration: Vector;
  public mass: number;

  constructor(position: Vector, speed: Vector, acceleration: Vector, mass: number) {
    this.position = position;
    this.speed = speed;
    this.acceleration = acceleration;
    this.mass = mass;
  }

  // @ts-ignore
  public tick(frame: number): void {
    this.position.translate(this.speed);

    this.speed.translate(this.acceleration);
  }
}