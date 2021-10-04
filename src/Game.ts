import GameWithLoop from "./engine/GameWithLoop";
import {Render} from "./engine/Render";

const FPS = 60;

export default class Game extends GameWithLoop {

    constructor(private render: Render) {
        super(FPS);

    }

    // @ts-ignore
    protected tick(frame: number): void {
    }

    protected draw(): void {
        this.render.clear();
    }
}