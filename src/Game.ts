import GameWithLoop from "./engine/GameWithLoop";
import {Render} from "./engine/Render";
import Ball from "./Ball";
import Vector from "./engine/Vector";

const FPS = 60;

export default class Game extends GameWithLoop {
    private ball: Ball = new Ball(
      new Vector(100, 300),
      new Vector(1, 0),
      new Vector(0.1, 0),
      10,
      "#FF0000"
    );

    constructor(private render: Render) {
        super(FPS);

    }

    // @ts-ignore
    protected tick(frame: number): void {
        this.ball.tick(frame);
    }

    protected draw(): void {
        this.render.clear();
        this.ball.draw(this.render);
    }
}