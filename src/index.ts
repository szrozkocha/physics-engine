import Game from "./Game";
import HtmlException from "./engine/exception/HtmlException";
import BaseException from "./engine/exception/BaseException";
import {Render} from "./engine/Render";

function getCanvas(canvasId: string): CanvasRenderingContext2D {
    const canvas: HTMLElement | null = document.getElementById(canvasId);

    if (canvas instanceof HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        if(ctx === null) {
            throw new BaseException("Cant create context 2d");
        }

        return ctx;
    }

    throw new HtmlException("Canvas don't exists!");
}

window.onload = function () {
    const render = new Render(getCanvas("canvas"))
    const game: Game = new Game(render);

    function run(timestamp: number): void {
        game.update(timestamp);
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
};