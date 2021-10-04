export default class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public translate(vector: Vector): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  public normalize(): void {
    const length = this.length();

    this.x /= length;
    this.y /= length;
  }

  public scaleTo(length: number): void {
      this.normalize();

      this.x *= length;
      this.y *= length;
  }

  public distance(vector: Vector): number {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public inverse(): Vector {
    return new Vector(-this.x, -this.y);
  }
}