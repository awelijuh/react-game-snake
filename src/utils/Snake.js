export class Snake {

    constructor(height, width, x, y) {
        this.s = [{x: x - 1, y: y}, {x: x, y: y}]
        this.dx = 1
        this.dy = 0
        this.height = height
        this.width = width
    }

    isDirectionEquals(dx, dy) {
        return this.dx === dx && this.dy === dy
    }

    updateDirection(dx, dy) {
        if (this.dx === -dx && this.dy === -dy) {
            return false
        }
        this.dx = dx
        this.dy = dy
        return true
    }

    move(dx = 0, dy = 0, increase = false) {
        console.log('move')
        if (dx === 0 && dy === 0) {
            dx = this.dx
            dy = this.dy
        }

        this.s.push({
            x: (this.s.at(-1).x + dx + this.width) % this.width,
            y: (this.s.at(-1).y + dy + this.height) % this.height
        })

        if (!increase) {
            this.s.shift()
        }
        if (typeof increase === "function") {
            console.log('func', this.s.at(-1))
            if (!increase(this.s.at(-1))) {
                this.s.shift()
            }
        }

        console.log(this.s)
    }

}
