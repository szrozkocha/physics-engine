import GameWithLoop from "./engine/GameWithLoop";
import {Render} from "./engine/Render";
import Ball from "./Ball";
import Vector from "./engine/Vector";
import PhysicsState from "./engine/PhysicsState";

const FPS = 60;

export default class Game extends GameWithLoop {
    private leftBall: Ball = new Ball(
      new PhysicsState(
        new Vector(100, 300),
        new Vector(1, 0),
        new Vector(0.1, 0),
        1
      ),
      10,
      "#FF0000"
    );

    private rightBall: Ball = new Ball(
        new PhysicsState(
        new Vector(700, 300),
        new Vector(-1, 0),
        new Vector(-0.1, 0),
        1
      ),
      10,
      "#00FF00"
    );

    constructor(private render: Render) {
        super(FPS);

    }

    // @ts-ignore
    protected tick(frame: number): void {
        this.leftBall.tick(frame);
        this.rightBall.tick(frame);

        if(this.leftBall.testCollision(this.rightBall)) {
            this.leftBall.physicsState.position.translate(this.leftBall.physicsState.speed.inverse());
            this.rightBall.physicsState.position.translate(this.rightBall.physicsState.speed.inverse());

            let physicsStateLeft = this.leftBall.processCollision(this.rightBall);
            let physicsStateRight = this.rightBall.processCollision(this.leftBall);

            this.leftBall.physicsState = physicsStateLeft;
            this.rightBall.physicsState = physicsStateRight;
        }
    }

    protected draw(): void {
        this.render.clear();
        this.leftBall.draw(this.render);
        this.rightBall.draw(this.render);
    }
}