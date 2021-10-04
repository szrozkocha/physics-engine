export class Render {
    constructor(private ctx: CanvasRenderingContext2D) {
    }

    public drawCircle(x: number, y: number, r: number, color: string) {
        const tempFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.fillStyle = tempFillStyle;
    }

    public drawRectangle(x: number, y: number, w: number, h: number, color: string) {
        const tempFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.fillRect(x, y, w, h);
        this.ctx.fillStyle = tempFillStyle;
    }

    public clear(): void {
        const tempFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = tempFillStyle;
    }
}