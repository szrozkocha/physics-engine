import GameWithLoop from "./engine/GameWithLoop";
import {Render} from "./engine/Render";
import Ball from "./Ball";

const FPS = 60;

export default class Game extends GameWithLoop {
    private ball: Ball = new Ball(100, 300, 10, "#FF0000");

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